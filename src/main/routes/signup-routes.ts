import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factorys/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpController()))
}
