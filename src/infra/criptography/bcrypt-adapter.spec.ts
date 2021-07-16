import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('Encrypter suite', () => {
  test('Should call bcrypt with correct value',async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenCalledWith('password', 12)
  })
})
