import axios from 'axios';
import { apiBasicUrl } from '../utilities/Environment';
import { productSearch, secureRequest } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

export function searchForShops(lat, lng, max, callback) {
    findCommercesInRange();
    axios.get(`${apiBasicUrl()}/commerces/findInRange?maxDistance=${max}&latitud=${lat}&longitud=${lng}`)
        .then((response) => {
            callback(null, response);
        })
        .catch((error) => callback(error, null));
}

export function findCommercesInRange(range) {
    return secureRequest({
        url: `${API_BASE_URL}/commerces/findInRange?maxDistance=${range}`,
        method: 'GET'
    });
}

export function searchProduct(text, maxRange) {
    productSearch(text, maxRange)
        .then((response) => {
            const shops = response.data;
            const products = [];
            shops.forEach((shop) => {
                shop.saleableItems.forEach((item) => {
                    const product = {
                        commerceId: shop.commerceId,
                        commerceName: shop.commerceName,
                        distance: shop.distance,
                        brand: item.brand,
                        imageUrl: item.imageUrl,
                        name: item.name,
                        price: item.price,
                        productId: item.productId,
                        stock: item.stock
                    };
                    products.push(product);
                });
            });
            return products;
        });
}
