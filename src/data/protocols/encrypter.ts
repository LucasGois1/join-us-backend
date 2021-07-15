export class EncrypterAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return new Promise(resolve => resolve('hashed_password'))
  }
}

export interface Encrypter {
  encrypt: (value: string) => Promise<string>
}
