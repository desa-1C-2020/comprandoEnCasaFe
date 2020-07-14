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

// TODO - implementar
export function sendPurchase(purchases, callback) {
  callback('', null);
}

// export function saveProduct(product) {
//     return secureRequest({
//         url: API_BASE_URL + '/seller/product',
//         method: 'POST',
//         body: JSON.stringify(product)
//     });
// }
