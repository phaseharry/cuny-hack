const mongoose = require('mongoose')

// models
const User = require('./models/User')

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

    await mongoose.connection.close()
    console.log('Seed successful')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

dropDbAndSeed()