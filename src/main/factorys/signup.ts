import { SignUpController } from '../../presentation/controllers/signup/signUp'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const mongoAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
