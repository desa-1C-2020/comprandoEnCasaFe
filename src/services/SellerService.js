//import axios from 'axios';
//import { apiBasicUrl } from "../utilities/Environment";

 export function saveProduct(product, userId, callback){
  // TODO - El back devuelve 500
  // axios.post(`${apiBasicUrl()}/seller/product?userId=${userId}`, product)
  // .then((response) => {callback(null, response)})
  // .catch((error) =>  {callback(error, null)})
  callback(null, '');
 }

 //TODO - Necesito que funcione el agregar primero.
 export function deleteProduct(userId, productId, callback){
  callback(null, '')
 }

 //TODO - Necesito que funcione el agregar primero.
 export function modifyProduct(userId, productId, callback){
   callback(null, '');
 }

 //TODO - Necesito este endpoint!
 export function getAllProducts(shopId, callback){
   //MOCKS
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