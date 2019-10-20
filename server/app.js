const express = require('express')
const path = require('path')
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

console.log(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
}

module.exports = app