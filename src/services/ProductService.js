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

// TODO - implementar
export function sendPurchase(purchases, callback){
  //purchases es una lista con obj que incluye el id de comercio, y los productos a comprar.
  callback('', null)
}

// TODO - implementar
export function getHistory(userId, callback){
  // Devuelve una lista de 'compras'

  const mock = [
    {
      shops: [
        {
          name: 'Camilote',
          products: [
          {
            productName: 'Arroz Gallo',
            productAmmount: 2,
            productPrice: 55
          },
          {
            productName: 'Fideos Marolio',
            productAmmount: 1,
            productPrice: 89
          }
          ] 
        },
        {
          name: 'Lo de Camila',
          products: [
            {
              productName: 'Manteca',
              productAmmount: 3,
              productPrice: 104
            }
          ]
        }
      ]
    },
    {
      shops: [
        {
          name: 'Camilote',
          products: [
          {
            productName: 'Arroz Gallo',
            productAmmount: 2,
            productPrice: 55
          },
          {
            productName: 'Fideos Marolio',
            productAmmount: 1,
            productPrice: 89
          }
        ]
        }
      ]
    }
  ]
  callback(null, mock);
}