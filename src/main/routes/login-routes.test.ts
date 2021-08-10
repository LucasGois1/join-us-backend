import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})
beforeEach(async () => {
  const accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})

describe('Login routes suite', () => {
  describe('SignUp route',() => {
    test('Should return an account on signup', async () => {
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
      expect(res.body.password).not.toBe('123456')
    })
  })

  describe('Login route', () => {
    test('', () => {

    })
  })
})
