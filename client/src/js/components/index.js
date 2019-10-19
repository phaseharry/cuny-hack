import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initState } from '../actions/index.js'
import styled from 'styled-components'
import Home from './Home.js'
import logo from '../../InstaPrice Logos/logo.png';


const CenterLogo = styled.div`
  text-align: center;
  `

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
      <CenterLogo>
      <img src={logo} width="150" height="150" />
      </CenterLogo>
      <Home />
    </div>
  );
}

export default App;
