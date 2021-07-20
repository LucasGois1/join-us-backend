import { RequiredFieldValidation } from '../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helper/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helper/validators/validation-composite')

describe('SignUp Validation suite', () => {
  test('should call ValidationComposite with all validators', () => {
    makeSignUpValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation')
    ])
  })
})
