const mongoose = require('mongoose')

/**
 * Connect to the mongo database
 * @param {import('express').Express} expressApp 
 */
let mongoURI;
if(process.env.NODE_ENV === 'production'){
  mongoURI = process.env.MONGO_URI
} else {
  mongoURI = 'mongodb://localhost:27017/devdb'
}

const connectToDb = expressApp => {
  mongoose.connect(mongoURI, {
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