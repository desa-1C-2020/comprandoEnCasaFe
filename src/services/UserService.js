import { secureRequest } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

export function registerBuyer(buyerInfo) {
    const { address } = buyerInfo;
    return secureRequest({
        url: `${API_BASE_URL}/user/buyer/update`,
        method: 'POST',
        body: JSON.stringify(address)
    });
}

export function registerSeller(sellerInfo) {
    const commerce = {
        name: sellerInfo.commerceName,
        businessSector: sellerInfo.commerceBusinessSector,
        address: sellerInfo.commerceAddress,
        paymentMethods: sellerInfo.paymentMethods,
        daysAndHoursOpen: sellerInfo.daysAndHoursOpen,
        arrivalRange: sellerInfo.arrivalRange
    };
    return secureRequest({
        url: `${API_BASE_URL}/user/seller/update`,
        method: 'POST',
        body: JSON.stringify(commerce)
    });
}