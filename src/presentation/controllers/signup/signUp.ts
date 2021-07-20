import { InvalidParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helper/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount, Validation } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validator: Validation

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validator: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return success(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
