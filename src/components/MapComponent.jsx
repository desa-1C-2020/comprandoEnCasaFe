/* global google */
import React from 'react';
import '../styles/MapComponent.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import { Button } from '@blueprintjs/core';
import { MAPS_API_BASE_URL, GOOLE_API_KEY } from '../constants';

class MapComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            home: { lat: -34.7058979, lng: -58.2775644 },
            shop: { lat: -34.7116032, lng: -58.2701079 },
            directions: {},
            directionsInfo: {},
            showDestinations: true
        };
        this.showDirections = this.showDirections.bind(this);
    }

    showDirections() {
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: this.state.home,
                destination: this.state.shop,
                travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        showDestinations: false,
                        directionsInfo: result.routes[0].legs[0]
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }

    render() {

        const MyMapComponent =
            withScriptjs(withGoogleMap((props) =>
                <GoogleMap defaultZoom={15} defaultCenter={this.state.home}>
                    {props.isMarkerShown &&
                    <div>
                        {this.state.showDestinations && <Marker position={this.state.home}/>}
                        {this.state.showDestinations && <Marker position={this.state.shop}/>}
                        {<DirectionsRenderer directions={this.state.directions}/>}
                    </div>}
                </GoogleMap>
            ));

        const googleMapUrl = MAPS_API_BASE_URL + 'js?v=3.exp&libraries=geometry,drawing,places' + '&key=' + GOOLE_API_KEY;
        return (
            <div>
                <div>
                    <Button onClick={this.showDirections}>Mostrar Ruta</Button>
                    {!this.state.showDestinations &&
                    <div>
                        <p>Información:</p>
                        <p>Distancia: {this.state.directionsInfo.distance.text}</p>
                        <p>Tiempo (a pie): {this.state.directionsInfo.duration.text}</p>
                    </div>}
                    <MyMapComponent isMarkerShown
                                    googleMapURL={googleMapUrl}
                                    loadingElement={<div className="map-size"/>}
                                    containerElement={<div className="map-size"/>}
                                    mapElement={<div className="map-size"/>}
                    />
                </div>
            </div>
        );
    }

}

export default MapComponent;