import { secureRequest } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

export function registerBuyer(address) {
    return secureRequest({
        url: `${API_BASE_URL}/user/buyer/update`,
        method: 'POST',
        body: JSON.stringify(address)
    });
}

export function registerSeller(commerce) {
    return secureRequest({
        url: `${API_BASE_URL}/user/seller/update`,
        method: 'POST',
        body: JSON.stringify(commerce)
    });
}