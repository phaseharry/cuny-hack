const mongoose = require('mongoose')
const faker = require('faker')

// models
const User = require('./models/User')
const Food = require('./models/Food')

const listOfFoods = [
  'Lobster', 
  'Salmon', 
  'Herring', 
  'Broccoli', 
  'Corn', 
  'Chicken', 
  'Duck', 
  'Strawberries', 
  'Blueberries', 
  'Bananas', 
  'Blackberries', 
  'Crabs', 
  'Coconut', 
  'Bok Choy', 
  'Lettuce', 
  'Pineapples', 
  'Onions', 
  'Cauliflower', 
  'Cabbage', 
  'Turnip', 
  'Chives', 
  'Ginger', 
  'Carrots', 
  'Oranges', 
  'Lemons', 
  'Limes'
]

const NEW_YORK_COORDINATES = {
  longitude: '40.7128',
  latitude: '74.0060'
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

    for(let i = 0; i < 200; i++){
      const newFoodInstance = new Food({
        name: listOfFoods[Math.floor(Math.random() * (listOfFoods.length - 0))],
        price: (Math.random() * (35.5 - 1 + 1) + 1).toPrecision(3),
        latitude: NEW_YORK_COORDINATES.latitude,  // using constant coordinates because don't know scale of each decimal change
        longitude: NEW_YORK_COORDINATES.longitude,
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