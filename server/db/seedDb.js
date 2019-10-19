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
  }
]

const NEW_YORK_COORDINATES = {
  longitude: 40.7128,
  latitude: 74.0060
}

const dropDbAndSeed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/devdb')
    await mongoose.connection.dropDatabase()
    await mongoose.connect('mongodb://localhost:27017/devdb')

    const [harry, oscar, michael, matthew] = [
      new User({
        firstName: 'Harry',
        lastName: 'C',
        email: 'harryc@gmail.com',
        password: '1234'
      }),
      new User({
        firstName: 'Oscar',
        lastName: 'C',
        email: 'oscarc@gmail.com',
        password: '1234'
      }),
      new User({
        firstName: 'Michael',
        lastName: 'T',
        email: 'michaelt@gmail.com',
        password: '1234'
      }),
      new User({
        firstName: 'Matthew',
        lastName: 'J',
        email: 'matthewj@gmail.com',
        password: '1234'
      })
    ]
    await Promise.all([harry.save(), oscar.save(), michael.save(), matthew.save()])

    for (let i = 0; i < 200; i++) {
      const randFood = listOfFoods[Math.floor(Math.random() * (listOfFoods.length - 0))]
      const latitudeRand = +((Math.random() * 10) - 5).toPrecision(9)
      const longitudeRand = +((Math.random() * 10) - 5).toPrecision(9)
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