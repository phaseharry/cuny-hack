const mongoose = require('mongoose')
const faker = require('faker')

// models
const User = require('./models/User')
const Food = require('./models/Food')

const listOfFoods = [
  {
    name: 'lobster',
    type: 'seafood'
  },
  {
    name: 'salmon',
    type: 'seafood'
  },
  {
    name: 'herring',
    type: 'seafood'
  },
  {
    name: 'broccoli',
    type: 'vegetable'
  },
  {
    name: 'corn',
    type: 'vegetable'
  },
  {
    name: 'chicken',
    type: 'meat'
  },
  {
    name: 'duck',
    type: 'meat'
  },
  {
    name: 'strawberries',
    type: 'fruit'
  },
  {
    name: 'blueberries',
    type: 'fruit'
  },
  {
    name: 'bananas',
    type: 'fruit'
  },
  {
    name: 'blackberries',
    type: 'fruit'
  },
  {
    name: 'crabs',
    type: 'seafood'
  },
  {
    name: 'coconut',
    type: 'fruit'
  },
  {
    name: 'bok choy',
    type: 'vegetable'
  },
  {
    name: 'lettuce',
    type: 'vegetable'
  },
  {
    name: 'pineapples',
    type: 'fruit'
  },
  {
    name: 'onions',
    type: 'vegetable'
  },
  {
    name: 'cauliflower',
    type: 'vegetable'
  },
  {
    name: 'cabbage',
    type: 'vegetable'
  },
  {
    name: 'turnip',
    type: 'vegetable'
  },
  {
    name: 'chives',
    type: 'vegetable'
  },
  {
    name: 'ginger',
    type: 'vegetable'
  },
  {
    name: 'carrots',
    type: 'vegetable'
  },
  {
    name: 'oranges',
    type: 'fruit'
  },
  {
    name: 'lemons',
    type: 'fruit'
  },
  {
    name: 'limes',
    type: 'fruit'
  },
  {
    name: 'chicken over rice',
    type: 'street food'
  },
  {
    name: 'lamb over rice',
    type: 'street food'
  },
  {
    name: 'combo over rice',
    type: 'street food'
  },
  {
    name: 'hotdog',
    type: 'street food'
  }
]

const NEW_YORK_COORDINATES = {
  longitude: -73.988212,
  latitude: 40.746566
}

let mongoURI;
if(process.env.NODE_ENV === 'production'){
  mongoURI = process.env.MONGO_URI
} else {
  mongoURI = 'mongodb://localhost:27017/devdb'
}

const dropDbAndSeed = async () => {
  try {
    await mongoose.connect(mongoURI)
    await mongoose.connection.db.dropCollection('food')
    await mongoose.connect(mongoURI)

    for (let i = 0; i < 1000; i++) {
      const randFood = listOfFoods[Math.floor(Math.random() * (listOfFoods.length - 0))]
      const latitudeRand = +((Math.random() * 0.03125) - 0.015625).toPrecision(9)
      const longitudeRand = +((Math.random() * 0.03125) - 0.015625).toPrecision(9)
      const newFoodInstance = new Food({
        name: randFood.name,
        category: randFood.type,
        price: (Math.random() * (35.5 - 1 + 1) + 1).toPrecision(3),
        latitude: NEW_YORK_COORDINATES.latitude + latitudeRand,
        longitude: NEW_YORK_COORDINATES.longitude + longitudeRand,
        imageUrl: faker.image.food()
      })
      await newFoodInstance.save()
    }

    await mongoose.connection.close()
    console.log('Seed successful')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

dropDbAndSeed()