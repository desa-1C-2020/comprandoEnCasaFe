import axios from 'axios'

const host = 'https://comprando-en-casa.herokuapp.com'

export function searchForShops(lat, lng, max, callback) {
  axios.get(`${host}/commerces/findInRange?maxDistance=${max}&latitud=${lat}&longitud=${lng}`)
  .then((response) => {
    callback(null, response)   
  })
  .catch((error) => callback(error, null))
}

export function searchProduct(text, id, maxRange, callback){
  axios.get(`${host}/products/find?userId=${id}&productToFind=${text}&maxDistance=${maxRange}`)
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
        }
        products.push(product);
      })
    })
    callback(null, products);
  })
  .catch((error) => callback(error, null));
}
