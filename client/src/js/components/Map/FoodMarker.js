import React, { Component } from 'react'

const FoodMarkerStyles = {

}

class FoodMarker extends Component {
  render() {
    return (
      <div
        style={{
          height: '40px',
          width: '40px',
          zIndex: 2,
          backgroundColor: 'red'
        }}
      >
      </div>
    )
  }
}

export default FoodMarker