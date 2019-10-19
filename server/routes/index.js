const Router = require('express').Router()

const foodRouter = require('./foodRouter')

Router.use('/foods', foodRouter)

module.exports = Router