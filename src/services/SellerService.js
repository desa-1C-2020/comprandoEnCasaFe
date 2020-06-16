import {apiBasicUrl} from "../utilities/Environment";

//TODO - implementar esto
 export function saveProduct(product, userId, callback){
   // axios.post(`${host}/seller/product?userId=${userId}`)
   // .then((response) => {
   //   callback(null, response)   
   // })
   // .catch((error) => callback(error, null))
   callback(null, '')
 }

 export function getAllProducts(shopId, callback){
   //TODO - implementar esto
   // axios.get(`${host}/????`)
   // .then((response) => {
   //   callback(null, response)   
   // })
   // .catch((error) => callback(error, null))
   //TODO - borrar mocks
   const res = [
     {
      productId: '1',
      price: '70.00',
      stock: '20',
      name: 'Aceite 2L',
      brand: 'Marolio',
      image: 'https://www.supermercadoacuario.com.ar/app/files/company_35/products/66557_7797470005514.jpg'
     },
     {
      productId: '2',
      price: '32.00',
      stock: '10',
      name: 'Puré de tomate',
      brand: 'De la huerta',
      image: 'https://mercanet.com.ar/server/Portal_0019782/img/products/pure-de-tomate-de-la-huerta-530-grs_9308754.jpg'
     },
   ]
   callback(null, res)
 }