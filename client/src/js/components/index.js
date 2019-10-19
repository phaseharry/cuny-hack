import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initState } from '../actions/index.js'
import Home from './Home.js'
import Product from './Product.js'
import { Switch, Route } from 'react-router-dom'




  const App = () => {
  const listings = useSelector(state => state.listings)
  const dispatch = useDispatch()
  // 40.740582, -73.984739
  useEffect(() => {
    if (listings.length > 0) return
    fetch('/api/foods/search?longitude=40.740582&latitude=73.984739&range=2').then(res => {
      if (res.status !== 200) {
        throw new Error(`Non-200 status code ${res.status}`)
      }
      return res.json()
    }).then(data => {
      dispatch(initState({ listings: data }))
    }).catch(console.error)
  }, [dispatch, listings])

  return (
    <div className="App">
      <Switch>
        <Route exact to='/' component={Home} />
        <Route to='/product/:name' component={Product} />
      </Switch>
    </div>
  );
}

export default App;
