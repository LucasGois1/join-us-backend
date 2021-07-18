import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
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

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
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
})
