import axios from 'axios'
import {apiBasicUrl} from "../utilities/Environment";

export function searchForShops(lat, lng, max, callback) {
  axios.get(`${apiBasicUrl()}/commerces/findInRange?maxDistance=${max}&latitud=${lat}&longitud=${lng}`)
  .then((response) => {
    callback(null, response)
  })
  .catch((error) => callback(error, null))
}

export function searchProduct(text, id, maxRange, callback){
  axios.get(`${apiBasicUrl()}/products/find?userId=${id}&productToFind=${text}&maxDistance=${maxRange}`)
  .then((response) => {
    const shops = response.data;
    const products = [];
    shops.forEach((shop) =>{
      shop.saleableItems.forEach((item) =>{
        let product = {
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
      })
    });
    callback(null, products);
  })
  .catch((error) => callback(error, null));
}

// TODO - implementar
export function sendPurchase(purchases, callback){
  //purchases es una lista con obj que incluye el id de comercio, y los productos a comprar.
  callback('njkjnkj', null)
}
