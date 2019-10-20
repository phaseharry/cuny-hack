import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import FoodMarker from './FoodMarker'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 40.746566,
      lng: -73.988212
    },
    zoom: 15
  }
  render() {
    const { listOfFood } = this.props

    return (
      <div style={{ height: '80vh', width: '90%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {listOfFood.map(foodInstance => {
            return (
              <FoodMarker
                key={foodInstance._id}
                lat={foodInstance.latitude}
                lng={foodInstance.longitude}
                text={'A'}
              />
            )
          })}
        </GoogleMapReact>
      </div >)
  }
}

export default Map