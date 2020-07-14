import { API_BASE_URL } from '../constants';
import { secureRequest } from '../util/APIUtils';

export function saveProduct(product) {
    return secureRequest({
        url: API_BASE_URL + '/seller/product',
        method: 'POST',
        body: JSON.stringify(product)
    });
}

export function saveProductsBatch(products) {
    return secureRequest({
        url: API_BASE_URL + '/seller/productsBatch',
        method: 'POST',
        body: JSON.stringify(products)
    });
}

export function deleteProduct(productId) {
    return secureRequest({
        url: `${API_BASE_URL}/seller/product?productId=${productId}`,
        method: 'DELETE'
    });
}

export function modifyProduct(product) {
    return secureRequest({
        url: `${API_BASE_URL}/seller/product`,
        method: 'PATCH',
        body: JSON.stringify(product)
    });
}

export function getAllProducts() {
    return secureRequest({
        url: API_BASE_URL + '/seller/products',
        method: 'GET'
    });
}

export function updateSale(saleUpdateTO) {
    return secureRequest({
       url: API_BASE_URL + '/seller/update/sale',
       method: 'POST',
       body: JSON.stringify(saleUpdateTO)
    });
}

export function getSales() {
    return secureRequest({
        url: `${API_BASE_URL}/seller/sales`,
        method: 'POST'
    });
}