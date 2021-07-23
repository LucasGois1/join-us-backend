import { Encrypter } from '../../data/protocols/criptography/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    const hashed = bcrypt.hash(value, 12)
    return new Promise(resolve => resolve(hashed))
  }
}
