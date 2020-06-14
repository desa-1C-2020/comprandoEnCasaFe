import axios from 'axios'

const host = 'https://comprando-en-casa.herokuapp.com'

export function searchForShops(lat, lng, max, callback) {
  axios.get(`${host}/commerces/findInRange?maxDistance=${max}&latitud=${lat}&longitud=${lng}`)
  .then((response) => {
    callback(null, response)   
  })
  .catch((error) => callback(error, null))
}

export function searchProduct(text, callback){
  //TODO - path para obtener productos???
/*  axios.get(`${host}/?????`)
  .then((response) => {
    callback(null, response)   
  })
  .catch((error) => callback(error, null)) */
  //TODO - eliminar estos mocks
  let res = {
  products: [
    {
      price: '70.00',
      product: {
        name: 'Aceite 2L',
        brand: 'Marolio',
        image: 'https://www.supermercadoacuario.com.ar/app/files/company_35/products/66557_7797470005514.jpg'
      }
    },
    {
      price: '32.00',
      product: {
        name: 'Puré de tomate',
        brand: 'De la huerta',
        image: 'https://mercanet.com.ar/server/Portal_0019782/img/products/pure-de-tomate-de-la-huerta-530-grs_9308754.jpg'
      }
    },
    {
      price: '10.99',
      product: {
        name: 'Harina 0000',
        brand: 'Pureza',
        image: 'https://mayoristaencountry.com/25204-large_default/harina-pureza-4-0-x-1-kg-1-kg.jpg'
      }
    }
  ]
  }
  callback(null, res);
}
