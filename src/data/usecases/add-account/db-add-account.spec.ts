
// const makeSut = (): any => {
//   const sut = new DbAddAccount()
//   const encrypterStub = new Encrypter()
//   return {
//     sut,
//     encrypterStub
//   }
// }

import { DbAddAccount } from './db-add-account'

describe('DbAddAccount UseCase suite', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
