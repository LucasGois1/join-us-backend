import { Router } from 'express'
import { makeSignUpController } from '../factorys/signup'

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    const signUp = makeSignUpController()
    const account = signUp.handle(req)
    res.json(account)
  })
}
