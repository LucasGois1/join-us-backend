import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { name, email, password, confirmPassword } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    if (!password) {
      return {
        statusCode: 400,
        body: new MissingParamError('password')
      }
    }
    if (!confirmPassword) {
      return {
        statusCode: 400,
        body: new MissingParamError('confirmPassword')
      }
    }
  }
}
