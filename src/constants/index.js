export const ACCESS_TOKEN = 'accessToken';
export const SELLER = 'seller';
export const BUYER = 'buyer';
const GEOCODE_JSON = 'geocode/json?';

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const OAUTH2_REDIRECT_URI = process.env.REACT_APP_OAUTH2_REDIRECT_URI;
export const GOOLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const MAPS_API_BASE_URL = 'https://maps.googleapis.com/maps/api/';
export const GEODECODE_URL = MAPS_API_BASE_URL + GEOCODE_JSON;