import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 75.0060,
      lng: 40.7128
    },
    zoom: 11
  }
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <div
            lat={74}
            lng={40.004}
            text="marker"
          >
          </div>
        </GoogleMapReact>
      </div >)
  }
}

export default Map