import request from 'supertest'
import app from '../config/app'

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
    // expect(res.body.id).toBeTruthy()
    // expect(res.body.name).toBe('Lucas Gois')
    // expect(res.body.email).toBe('lucas@gmail.com')
    // expect(res.body.password).toBe('123456')
  })
})
