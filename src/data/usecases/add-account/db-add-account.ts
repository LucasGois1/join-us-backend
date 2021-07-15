import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hash = await this.encrypter.encrypt(account.password)

    return new Promise(resolve => resolve({
      id: 'registered_id',
      name: 'registered_name',
      email: 'registered_email',
      password: 'registered_hashed_password'
    }))
  }
}
