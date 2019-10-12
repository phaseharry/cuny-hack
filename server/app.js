const express = require('express')
const app = express()
require('./db/connection')(app) // connecting db

// body parsing middleware for json
app.use(express.json({ extended: false }))

app.get('/', (req, res, next) => {
  res.json({ msg: 'Hello World' })
})

module.exports = app