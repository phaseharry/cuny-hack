const Router = require('express').Router()
const { body, validationResult } = require('express-validator')

const Food = require('../db/models/Food')

/*
  @route          GET api/foods/
  @description    just a fetch all regardless of distance just to help you guys develop the frontend
  @access         public
*/
Router.get('/', (req, res, next) => {
  Food.find()
  .then(foods => res.json(foods))
  .catch(err => next(err))
})

/*
  @route          GET api/foods/search/:food/:latitutde/:longtitude/:range  // Turn into a query
  @description    fetches a specific foods within a specified distance from you
  @access         public
*/
Router.get('/api/foods/search/:food/:latitutde/:longtitude/:range ', (req, res, next) => {})

/*
  @route          GET api/foods/search/:latitude/:longitude
  @description    fetches all food within a specified distance from you
  @access         public
*/
Router.get('/search/:latitude/:longitude/:range', (req, res, next) => {
  const { latitude, longitude, range } = req.params
  res.json({
    latitude,
    longitude,
    range
  })
}) 

/*
  @route          POST api/foods/
  @description    user creates a new food instance in our database
  @access         public
*/
Router.post('/', [
  body('name').exists().isString(),
  body('price').exists().isString(),
  body('longitude').exists().isString().isLength({ min: 2 }),
  body('latitude').exists().isString().isLength({ min: 2 })
], async (req, res, next) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() })
  }

  const {
    name,
    price,
    longitude,
    latitude,
  } = req.body

  try { 
    const foodInstance = await Food.findOne({
      name,
      longitude,
      latitude
    })
    // if the foodInstance matches all 3 params of name, long, and lat then we update the price with the newer price else we'll create a new distance
    if(foodInstance){
      foodInstance.price = price
      await foodInstance.save()
      return res.status(200).json(foodInstance)
    }

    const newFoodInstance = new Food({ 
      name,
      price,
      longitude,
      latitude
    })

    await newFoodInstance.save()
    res.status(201).json(newFoodInstance)

  } catch(err){
    next(err)
  }
})

module.exports = Router