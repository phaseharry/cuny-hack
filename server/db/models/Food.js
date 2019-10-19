const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    requred: true
  },
  price: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('food', FoodSchema)