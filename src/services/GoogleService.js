import { GOOLE_API_KEY } from '../constants';
import Geocode from 'react-geocode';

export function coordsFrom(addressParts) {
    configureGeocode();

    const { street, number, city } = addressParts;
    const address = `${street} ${number}, ${city} `;
    console.log('dire que mando: ' + JSON.stringify(addressParts) + '.....' + address);
    return Geocode.fromAddress(address)
        .then(response => {
            const location = response.results[0].geometry.location;
            const formattedAddress = response.results[0].formatted_address;

            return {location, formattedAddress};
        });
}

const configureGeocode = () => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(GOOLE_API_KEY);

    // set response language. Defaults to english.
    Geocode.setLanguage('es');

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion('ar');

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
};

const GeocodeFromLatLng = (latLng) => {
    configureGeocode();
    // Get address from latitude & longitude.
    const { lat, lng } = latLng;
    const lati = '-34.7040003';
    const long = '-58.2754042';
    Geocode.fromLatLng(lati, long).then(
        response => {
            const address = response.results[0].formatted_address;
            console.log(address);
        },
        error => {
            console.error(error);
        }
    );
};

