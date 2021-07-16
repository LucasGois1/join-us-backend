import { MongoClient } from 'mongodb'
import { Collection } from 'mongoose'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  idMapper (collection: any): any {
    const collectionParsed = JSON.parse(JSON.stringify(collection))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const collectionReassign = Object.assign({}, collectionParsed, { id: collectionParsed._id })
    const { _id, ...objectWithId } = collectionReassign
    return objectWithId
  }
}
