const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    requred: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
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