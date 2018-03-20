require('dotenv').config()

const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/', require('./routes/tweets'))

app.listen(port, () => {
  console.log('server is up:', port)
})