import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(account)
    const document = await accountCollection.findOne({ _id: result.insertedId })
    const accountParsed = JSON.parse(JSON.stringify(document))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const reassignAccount = Object.assign({}, accountParsed, { id: accountParsed._id })
    const { _id, ...registeredAccount } = reassignAccount

    return registeredAccount
  }
}
