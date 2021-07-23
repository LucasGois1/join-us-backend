import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer

  constructor (loadAccountByEmail: LoadAccountByEmailRepository, hashComparer: HashComparer) {
    this.loadAccountByEmail = loadAccountByEmail
    this.hashComparer = hashComparer
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return new Promise(resolve => resolve(null))
  }
}
