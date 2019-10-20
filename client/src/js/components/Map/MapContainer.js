import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import FoodMarker from './FoodMarker'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 40.743958,
      lng: -73.990785
    },
    zoom: 15
  }
  render() {
    console.log(this.props)
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
                text={foodInstance.name}
              />
            )
          })}
          {/* <div
            lat={74}
            lng={40.004}
            text="marker"
          >
          </div> */}
        </GoogleMapReact>
      </div >)
  }
}

export default Map