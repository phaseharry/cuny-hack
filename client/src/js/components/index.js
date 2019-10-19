import React from 'react';
import Home from './Home.js'
import Product from './Product.js'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/product/:name' component={Product} />
      </Switch>
    </div>
  )
}

export default App
