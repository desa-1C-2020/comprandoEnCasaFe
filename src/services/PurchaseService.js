import { API_BASE_URL } from '../constants';
import { secureRequest } from '../util/APIUtils';

// TODO - en el back hay que cambiarlo a POST!
export function takeawayOptions(takeAwayTo) {
    return secureRequest({
        url: API_BASE_URL + '/purchase/takeAway',
        method: 'POST',
        body: JSON.stringify(takeAwayTo)
    });
}

export function deliveryOptions() {
    return secureRequest({
        url: API_BASE_URL + '/purchase/delivery',
        method: 'GET'
    });
}

// TODO - Hay que probarlo!
export function sendPurchase(purchase) {
    return secureRequest({
        url: API_BASE_URL + '/purchase',
        method: 'POST',
        body: JSON.stringify(purchase)
    });
}
