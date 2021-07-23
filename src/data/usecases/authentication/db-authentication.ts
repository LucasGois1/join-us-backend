import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator

  constructor (loadAccountByEmail: LoadAccountByEmailRepository, hashComparer: HashComparer, tokenGeneretor: TokenGenerator) {
    this.loadAccountByEmail = loadAccountByEmail
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGeneretor
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) return await this.tokenGenerator.generate(account.id)
    }
    return new Promise(resolve => resolve(null))
  }
}
