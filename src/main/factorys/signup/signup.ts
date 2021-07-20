import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-mongo-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/controllers/signup/signup-protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const encrypter = new BcryptAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const addAccount = new DbAddAccount(encrypter, accountMongoRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
