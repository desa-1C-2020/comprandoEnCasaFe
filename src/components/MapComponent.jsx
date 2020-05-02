import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'

class MapComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      home: {lat: -34.705081, lng: -58.279033},
      shop: {lat: -34.712337, lng: -58.283670}
    }
  }

  render(){

    const MyMapComponent = 
      withScriptjs(withGoogleMap((props) =>
        <GoogleMap defaultZoom={15} defaultCenter={this.state.home}>
          {props.isMarkerShown && 
          <div>
            <Marker position={this.state.home} />
            <Marker position={this.state.shop} />
            <DirectionsRenderer directions={this.state.directions}/>
        </div>}
        </GoogleMap>
    ))

    // keyString: key=AIzaSyBIdMK9gkh8Na2UxQ_xeOi4fx_PNz9Fd5g&

    return (
      <div>
        <div>
        <MyMapComponent isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '500px', width: '800px' }} />}
          containerElement={<div style={{ height: '500px', width: '800px' }} />}
          mapElement={<div style={{ height: '500px', width: '800px' }} />}
        />
        </div>
      </div>
    )
  }

}

export default MapComponent