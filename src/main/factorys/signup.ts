import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const mongoAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository)
  const signUpController = new SignUpController(emailValidator, addAccount)
  return new LogControllerDecorator(signUpController)
}
