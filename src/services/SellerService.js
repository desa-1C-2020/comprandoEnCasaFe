import axios from 'axios';
import { apiBasicUrl } from '../utilities/Environment';
import { API_BASE_URL } from '../constants';
import { secureRequest } from '../util/APIUtils';

export function saveProduct(product) {
    return secureRequest({
        url: API_BASE_URL + '/seller/product',
        method: 'POST',
        body: JSON.stringify(product)
    }).then((response) => {
        console.log(`cargue uno: ${JSON.stringify(response)}`);
        return response;
    });
}

export function deleteProduct(productId) {
    return secureRequest({
        url: `${API_BASE_URL}/seller/product?productId=${productId}`,
        method: 'DELETE'
    }).then((response) => {
        console.log(`Borre : ${JSON.stringify(response)}`);
        return response;
    });
}

// TODO - completar
export function modifyProduct(userId, product, callback) {
    axios.patch(`${apiBasicUrl()}/seller/product?userId=${userId}`, product)
        .then((response) => callback(null, response))
        .catch((error) => callback(error, null));
    //callback(null, '')
}

export function getAllProducts() {
    return secureRequest({
        url: API_BASE_URL + '/seller/products',
        method: 'GET'
    }).then((response) => {
        console.log(`productos: ${JSON.stringify(response)}`);
        return response;
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