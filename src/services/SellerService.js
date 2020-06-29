import axios from 'axios';
import { apiBasicUrl } from "../utilities/Environment";

 export function saveProduct(product, userId, callback){
  axios.post(`${apiBasicUrl()}/seller/product?userId=${userId}`, product)
  .then((response) => {callback(null, response)})
  .catch((error) =>  {callback(error, null)})
 }

 //TODO - Necesito que funcione el agregar primero.
 export function deleteProduct(userId, productId, callback){
  callback(null, '')
 }

 //TODO - Necesito que funcione el agregar primero.
 export function modifyProduct(userId, productId, callback){
   callback(null, '');
 }

 export function getAllProducts(userId, callback){
  const options = {
    data: {},
    headers: {'Content-Type': 'application/json'}
  };
  axios.get(`${apiBasicUrl()}/seller/products?userId=${userId}`, options)
  .then((response) => {
    callback(null, response.data)
  })
  .catch((error) =>  {
    callback(error, null)})
 }