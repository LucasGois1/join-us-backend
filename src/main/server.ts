import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    console.log(`MongoDB connection sucessfully on ${env.mongoUrl}`)
  })
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      console.log(`Server is running on http://localhost: ${env.port}`)
    })
  })
  .catch((error) => {
    console.error(`Houve um erro durante a conexão com o banco de dados\nlog: ${error}`)
  })
