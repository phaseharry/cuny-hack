const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  versionKey: false // remove __v key (version key) in the documents
})

module.exports = mongoose.model('user', UserSchema)