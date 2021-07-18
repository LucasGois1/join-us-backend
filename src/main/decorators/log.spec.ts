import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new ControllerStub()
}

describe('Log Decorator suite', () => {
  test('should call controller handle', async () => {
    const signUpControllerStub = makeController()
    const sut = new LogControllerDecorator(signUpControllerStub)

    const signUpControllerSpy = jest.spyOn(signUpControllerStub, 'handle')

    const httpRequest = {
      body: {
        content: 'any_content'
      }
    }

    await sut.handle(httpRequest)

    expect(signUpControllerSpy).toHaveBeenCalledWith({
      body: {
        content: 'any_content'
      }
    })
  })
})
