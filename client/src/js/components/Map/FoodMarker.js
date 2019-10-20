import React, { Component } from 'react'

const FoodMarkerStyles = {
  position: 'absolute',
  width: 40,
  height: 40,
  left: -40 / 2,
  right: -40 / 2,
  border: '5px solid #f44336',
  borderRadius: 40,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
}

class FoodMarker extends Component {
  render() {
    const { key } = this.props
    return (
      <div
        key={key}
        style={FoodMarkerStyles}
      >
      </div>
    )
  }
}

export default FoodMarker