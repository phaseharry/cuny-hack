const express = require('express')

require('./db/connection')() // connecting db

const app = express()

// body parsing middleware for json
app.use(express.json({ extended: false }))

app.get('/', (req, res, next) => {
  res.json({ msg: 'Hello World' })
})

module.exports = app