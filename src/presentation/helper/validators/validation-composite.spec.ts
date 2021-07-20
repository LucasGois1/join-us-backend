import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validation: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: string): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validation = makeValidation()
  const sut = new ValidationComposite([validation])
  return {
    sut,
    validation
  }
}

describe('ValidationComposite suite', () => {
  test('Should return an error if validation fails', () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
