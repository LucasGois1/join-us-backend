import { LoginController } from './login'
import { AddAccountModel } from './../../../domain/usecases/add-account'
import { InvalidParamError, MissingParamError } from '../../errors'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import { badRequest, serverError, unauthorized } from '../../helper/http-helper'
import { HttpRequest, Authentication, EmailValidator } from './login-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthenticationStub = (): Authentication => {
  // tslint:disable-next-line: max-classes-per-file
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

describe('LoginController suite', () => {
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

  test('should returns 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpResquest = {
      body: {
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should returns 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpResquest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should call email validator with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
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
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should returns 500 if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResquest = {
      body: {
        email: 'invalid_email',
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpResquest)
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('should return 401 if invalid credentials is provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(unauthorized())
  })
})
