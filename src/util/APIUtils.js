import { ACCESS_TOKEN, API_BASE_URL, BUYER, SELLER } from '../constants';
import axios from 'axios';
import { apiBasicUrl } from '../utilities/Environment';

const request = (options, headers) => {
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function secureRequest(options) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('No access token set.');
    }

    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    return request(options, headers);
};

export function getCurrentUser() {
    return secureRequest({
        url: API_BASE_URL + '/user/me',
        method: 'GET'
    }).then((userLogged) => {
        const accountType = userLogged.rol.commerce === undefined ? BUYER : SELLER;
        return Object.assign(userLogged, { accountType });
    });
}

export function productSearch(product, distance) {
    return secureRequest({
        url: `${API_BASE_URL}/products/find?productToFind=${product}&maxDistance=${distance}`,
        method: 'GET'
    });
}

export function findCommercesInRange(range) {
    return secureRequest({
        url: `${API_BASE_URL}/commerces/findInRange?maxDistance=${range}`,
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + '/auth/login',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function getAllProducts() {
    return secureRequest({
        url: API_BASE_URL + '/user/me',
        method: 'GET'
    }).then((user) => {
        const accountType = user.commerce === undefined ? BUYER : SELLER;
        return {
            accountType,
            user
        };
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + '/auth/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}