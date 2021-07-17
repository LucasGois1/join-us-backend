import request from 'supertest'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})
beforeEach(async () => {
  const accountCollection = MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})
const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('SignUp routes suite', () => {
  test('Should return an account on success', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        name: 'Lucas Gois',
        email: 'lucas@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body.id).toBeTruthy()
    expect(res.body.name).toBe('Lucas Gois')
    expect(res.body.email).toBe('lucas@gmail.com')
    expect(res.body.password).toBe('123456')
  })
})
