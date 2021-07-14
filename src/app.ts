import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.json({ status: 200 })
})

app.listen(5000, () => console.log('Server is running'))
