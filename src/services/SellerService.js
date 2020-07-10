import axios from 'axios';
import { apiBasicUrl } from '../utilities/Environment';
import { API_BASE_URL } from '../constants';
import { secureRequest } from '../util/APIUtils';

export function saveProduct(product) {
    return secureRequest({
        url: API_BASE_URL + '/seller/product',
        method: 'POST',
        body: JSON.stringify(product)
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

//TODO - implementar esto
export function getSales(userId, callback) {
    // MOCKS
    const sales = [
        {
            name: 'Camila',
            options: { deliver: 'take away', payment: 'debit' },
            products: [{ productName: 'Manteca', productAmmount: 3 },
                { productName: 'Arroz', productAmmount: 2 }]
        },
        {
            name: 'Luciano',
            options: { deliver: 'delivery', payment: 'money' },
            products: [{ productName: 'Leche', productAmmount: 1 },
                { productName: 'Manteca', productAmmount: 3 },
                { productName: 'Arvejas', productAmmount: 5 }]
        }
    ];
    callback(null, sales);
}