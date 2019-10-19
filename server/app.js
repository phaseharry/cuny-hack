const express = require('express')
const app = express()
require('./db/connection')(app) // connecting db

// body parsing middleware for json
app.use(express.json({ extended: false }))

// api middleware
app.use('/api', require('./routes'))


// final error catcher just incase an error didn't get handled
app.use((err, req, res, next) => {
  const status = err.status || 500
  const msg = err.message || 'Server Error'
  res.status(status).json({ msg })
})

module.exports = app