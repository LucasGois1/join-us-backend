import { AddAccountModel } from './../../../domain/usecases/add-account'
import { EmailValidator } from './../../protocols/email-validator'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { LoginController } from './login'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

afterEach(async () => {
  const accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})

beforeEach(async () => {
  const body: AddAccountModel = {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hashed_password'
  }
  const accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.insertOne(body)
})

describe('LoginController suite', () => {
  test('should returns 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpResquest = {
      body: {
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  test('should returns 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpResquest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('should call handle if no password is provided', async () => {
    const { sut } = makeSut()

    const httpResquest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('should call email validator with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpResquest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpResquest)
    expect(emailValidatorSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('should returns 400 if an invalid email was provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResquest = {
      body: {
        email: 'invalid_email',
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  // test('should returns 500 if email validator throws', async () => {
  //   const { sut, emailValidatorStub } = makeSut()
  //   const fakeError = new Error()
  //   fakeError.stack = 'any_value'
  //   jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
  //     throw fakeError
  //   })

  //   const httpResquest = {
  //     body: {
  //       email: 'invalid_email',
  //       password: 'any_password'
  //     }
  //   }
  //   const response = await sut.handle(httpResquest)
  //   expect(response.statusCode).toBe(500)
  //   expect(response.body).toEqual(new ServerError(fakeError.stack))
  // })
  // test('should returns sucess if credentials are valid', async () => {
  //   const { sut } = makeSut()

  //   const httpResquest = {
  //     body: {
  //       email: 'any_email@mail.com',
  //       password: 'any_password'
  //     }
  //   }
  //   const response = await sut.handle(httpResquest)
  //   expect(response.statusCode).toBe(200)
  //   expect(response.body).toEqual({
  //     token: 'any_token',
  //     name: 'any_name',
  //     email: 'any_email@mail.com'
  //   })
  // })
})
