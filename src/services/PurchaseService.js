import { API_BASE_URL } from '../constants';
import { secureRequest } from '../util/APIUtils';

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

export function sendPurchase(purchase) {
    return secureRequest({
        url: API_BASE_URL + '/purchase',
        method: 'POST',
        body: JSON.stringify(purchase)
    });
}
