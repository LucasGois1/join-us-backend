import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt, { hash } from 'bcrypt'
import { ServerError } from '../../presentation/errors'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Encrypter suite', () => {
  test('Should call bcrypt with correct value',async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenCalledWith('password', 12)
  })
  test('Should return a hash on success',async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('password')
    expect(hash).toBe('hash')
  })
})
