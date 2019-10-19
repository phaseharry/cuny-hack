const mongoose = require('mongoose')

/**
 * Connect to the mongo database
 * @param {import('express').Express} expressApp 
 */
const connectToDb = expressApp => {
  mongoose.set('debug', true)
  mongoose.connect('mongodb://localhost:27017/devdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => {
      expressApp.emit('ready')
      console.log(`Local MongoDB connected`)
    })
    .catch((err) => {
      console.error(err.message)
      process.exit(1)
    })
}

module.exports = connectToDb