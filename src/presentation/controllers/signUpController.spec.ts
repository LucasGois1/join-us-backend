// import { AccountModel } from '../../domain/models/AccountModel'
// import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'
import { SignUpController } from './signUpController'

// interface SutTypes {
//   sut: SignUpController
//   emailValidatorStub: EmailValidator
//   addAccountStub: AddAccount
// }

// const makeAddAccount = (): AddAccount => {
//   class AddAccountStub implements AddAccount {
//     add(account: AccountModel): Promise<AccountModel>{
//       const fakeAccount = {
//         id: 'valid_id',
//         name: 'valid_name',
//         email: 'valid_email',
//         password: 'valid_password'
//       }
//       return new Promise(resolve => resolve(fakeAccount))
//     }
//   }
//   return new AddAccountStub()
// }

// const makeSut = (): SutTypes => {
//   const addAccountStub = makeAddAccount()
//   const emailValidatorStub = makeEmailValidator()
//   const sut = new SignUpController(emailValidatorStub, addAccountStub)
//   return {
//     sut,
//     emailValidatorStub,
//     addAccountStub
//   }

describe('Sign up controller suite', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
