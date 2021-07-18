import { HttpRequest, HttpResponse } from './../../protocols/http'
import { MissingParamError } from '../../errors'

// const makeSut = (): LoginController => {
//   return new LoginController()
// }

describe('LoginController suite', () => {
  test('should returns 400 if no email is provided', async () => {
    class LoginControllerStub {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve({
          statusCode: 400,
          body: new MissingParamError('email')
        }))
      }
    }
    const sut = new LoginControllerStub()

    const httpResquest = {
      body: {
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })
})
