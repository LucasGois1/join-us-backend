import { EmailValidator } from './../../protocols/email-validator'
import { MissingParamError } from './../../errors/missing-param-error'
import { badRequest, serverError, success } from './../../helper/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { InvalidParamError } from '../../errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return new Promise(resolve => resolve(success({})))
    } catch (error) {
      return serverError(error)
    }
  }
}
