export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://database:27017/join-us-database',
  mongoUrlATLAS: process.env.MONGO_URL || 'mongodb+srv://lucasgoisdev:LqlG1egm19Fc0xhW@joinus.l7okp.mongodb.net/JoinUS?retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'jks79812bjkb8¨55615vb¨%!'
}
