import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initState } from '../actions/index.js'
import Home from './Home.js'

const App = () => {
  const listings = useSelector(state => state.listings)
  const dispatch = useDispatch()

  useEffect(() => {
    if (listings.length > 0) return
    fetch('/api/foods').then(res => {
      if (res.status !== 200) {
        throw new Error(`Non-200 status code ${res.status}`)
      }
      return res.json()
    }).then(data => {
      console.log('g')
      dispatch(initState({ listings: data }))
    }).catch(console.error)
  }, [dispatch, listings])

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Home />
    </div>
  );
}

export default App;
