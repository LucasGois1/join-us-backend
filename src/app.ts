const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({ test: 200 })
})

app.listen(5000, () => {
    console.log('server is running.')
})


