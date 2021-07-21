import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  constructor (loadAccountByEmail: LoadAccountByEmailRepository) {
    this.loadAccountByEmail = loadAccountByEmail
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmail.load(authentication.email)
    return new Promise(resolve => resolve(null))
  }
}
