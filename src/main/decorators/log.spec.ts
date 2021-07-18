import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helper/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          content: 'any_content'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  // tslint:disable-next-line: max-classes-per-file
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Decorator suite', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        content: 'any_content'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        content: 'any_content'
      }
    })
  })

  test('should return the same thing of decorated controller receive', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        content: 'any_content'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response).toEqual({
      statusCode: 200,
      body: {
        content: 'any_content'
      }
    })
  })

  test('should call LogErrorRepository withcorrect error if controller returns return a server Error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(new Promise(resolve => resolve(error)))
    jest.spyOn(logErrorRepositoryStub, 'log')
    const httpRequest = {
      body: {
        content: 'any_content'
      }
    }

    await sut.handle(httpRequest)

    expect(logErrorRepositoryStub).toHaveBeenCalledWith('any_stack')
  })
})
