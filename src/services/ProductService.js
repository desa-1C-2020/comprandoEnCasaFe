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
  //TODO - probar esto!
  axios.get(`${host}/products/find?userId=${id}&productToFind=${text}&maxDistance=${maxRange}`)
  .then((response) => {
    callback(null, response.data)   
  })
  .catch((error) => {
    console.log(error)
    callback(error, null)}) 
  //TODO - eliminar estos mocks cuando sea necesario
  // let res = {
  // products: [
  //   {
  //     price: '70.00',
  //     product: {
  //       name: 'Aceite 2L',
  //       brand: 'Marolio',
  //       image: 'https://www.supermercadoacuario.com.ar/app/files/company_35/products/66557_7797470005514.jpg'
  //     }
  //   },
  //   {
  //     price: '32.00',
  //     product: {
  //       name: 'Puré de tomate',
  //       brand: 'De la huerta',
  //       image: 'https://mercanet.com.ar/server/Portal_0019782/img/products/pure-de-tomate-de-la-huerta-530-grs_9308754.jpg'
  //     }
  //   },
  //   {
  //     price: '10.99',
  //     product: {
  //       name: 'Harina 0000',
  //       brand: 'Pureza',
  //       image: 'https://mayoristaencountry.com/25204-large_default/harina-pureza-4-0-x-1-kg-1-kg.jpg'
  //     }
  //   },
  //   {
  //     price: '250.00',
  //     product: {
  //       name: 'Yerba 1K',
  //       brand: 'Playadito',
  //       image: 'https://lapulperia.com.ar/presta17/366-home_default/yerba-playadito-x-500-gr.jpg'
  //     }
  //   }
  // ]
  // }
  // callback(null, res);
}
