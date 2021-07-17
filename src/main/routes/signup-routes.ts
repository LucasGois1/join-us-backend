import { Router } from 'express'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signUp'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    // const emailValidator = new EmailValidatorAdapter()
    // const encrypter = new BcryptAdapter()
    // const mongoAccountRepository = new AccountMongoRepository()
    // const addAccount = new DbAddAccount(encrypter, mongoAccountRepository)
    // const signUp = new SignUpController(emailValidator, addAccount)

    // const account = signUp.handle(req)
    res.json(200)
  })
}
