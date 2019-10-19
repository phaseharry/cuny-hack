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
  @route          GET api/foods/search?longitude=40.23232&latitude=74.521322&food=strawberries&range=4.2
  @description    fetches a specific foods within a specified distance from you
  @access         public
*/
Router.get('/search?', async (req, res, next) => {
  let { longitude, latitude, food, range } = req.query

  if (!food) { // if  there is no food query then we go to the next search
    return next()
  }
  // converting to type numb
  range *= 1
  longitude *= 1
  latitude *= 1

  try {
    const foodData = await Food.find({
      name: food,
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
  @route          GET api/foods/search?longitude=40.23232&latitude=74.521322
  @description    fetches all food within a specified distance from you
  @access         public
*/
Router.get('/search?', async (req, res, next) => {
  let { latitude, longitude, range } = req.query

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