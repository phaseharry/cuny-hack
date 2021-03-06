const Router = require('express').Router()
const { body, query, validationResult } = require('express-validator')

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
  @route          GET api/foods/search?longitude=40.23232&latitude=74.521322
  @description    fetches all food within a specified distance from you
  @access         public
*/
Router.get('/search?', [
  query('latitude', 'Latitude is required').exists().isString().isLength({ min: 4 }),
  query('longitude', 'Longitude is required').exists().isString().isLength({ min: 4 }),
  query('range', 'Range is required').exists().isString().isLength({ min: 1 })
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  let { latitude, longitude, range, food } = req.query

  if (food) {
    return next() // if food query exists, pass the request to the next middleware
  }

  // converting to type numb
  range *= 1
  longitude *= 1
  latitude *= 1

  try {
    const foodData = await Food.find({
      longitude: {
        $gte: longitude - range,
        $lt: longitude + range
      },
      latitude: {
        $gte: latitude - range,
        $lt: latitude + range
      }
    })

    if (foodData.length) {
      res.status(200).json(foodData)
    } else {
      res.status(200).json({
        msg: 'No food found within that range'
      })
    }

  } catch (err) {
    next(err)
  }
})

/*
  @route          GET api/foods/search?longitude=40.23232&latitude=74.521322&food=strawberries&range=4.2
  @description    fetches a specific food within a specified distance from you
  @access         public
*/
Router.get('/search?', [
  query('food', 'Food must require a name').exists().isString(),
  query('latitude', 'Latitude is required').exists().isString().isLength({ min: 4 }),
  query('longitude', 'Longitude is required').exists().isString().isLength({ min: 4 }),
  query('range', 'Range is required').exists().isString().isLength({ min: 1 })
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  let { longitude, latitude, food, range } = req.query

  // converting to type numb
  range *= 1
  longitude *= 1
  latitude *= 1

  try {
    const foodData = await Food.find({
      name: food.toLowerCase(),
      longitude: {
        $gte: longitude - range,
        $lt: longitude + range
      },
      latitude: {
        $gte: latitude - range,
        $lt: latitude + range
      }
    })

    if (foodData.length) {
      res.status(200).json(foodData)
    } else {
      res.status(200).json({
        msg: 'No food found within that range'
      })
    }

  } catch (err) {
    next(err)
  }
})

/*
  @route          POST api/foods/
  @description    user creates a new food instance in our database
  @access         public
*/
Router.post('/', [
  body('name', 'Food must require a name').exists().isString(),
  body('price', 'Price is required').exists().isString(),
  body('longitude', 'Longitude is required').exists().isString().isLength({ min: 4 }),
  body('latitude', 'Latitude is required').exists().isString().isLength({ min: 4 })
], async (req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
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
      name: name.toLowerCase(),
      longitude,
      latitude
    })
    // if the foodInstance matches all 3 params of name, long, and lat then we update the price with the newer price else we'll create a new instance
    if (foodInstance) {
      foodInstance.price = price
      await foodInstance.save()
      return res.status(200).json(foodInstance)
    }

    const newFoodInstance = new Food({
      name: name.toLowerCase(),
      price,
      longitude,
      latitude
    })

    await newFoodInstance.save()
    res.status(201).json(newFoodInstance)

  } catch (err) {
    next(err)
  }
})

module.exports = Router