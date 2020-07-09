import axios from 'axios';
import { apiBasicUrl } from "../utilities/Environment";

 export function saveProduct(product, userId, callback){
  axios.post(`${apiBasicUrl()}/seller/product?userId=${userId}`, product)
  .then((response) => {callback(null, response)})
  .catch((error) =>  {callback(error, null)})
 }

 export function deleteProduct(userId, productId, callback){
  const options = {
    data: {},
    headers: {'Content-Type': 'application/json'}
  };
  axios.delete(`${apiBasicUrl()}/seller/product?userId=${userId}&productId=${productId}`, options)
  .then((response) => callback(null, response))
  .catch((error) =>  callback(error, null))
 }

 // TODO - completar
 export function modifyProduct(userId, product, callback){
    axios.patch(`${apiBasicUrl()}/seller/product?userId=${userId}`, product)
    .then((response) => callback(null, response))
    .catch((error) =>  callback(error, null))
  //callback(null, '')
 }

 export function getAllProducts(userId, callback){
  const options = {
    data: {},
    headers: {'Content-Type': 'application/json'}
  };
  axios.get(`${apiBasicUrl()}/seller/products?userId=${userId}`, options)
  .then((response) => callback(null, response.data))
  .catch((error) => callback(error, null))
 }

 //TODO - implementar esto
 export function getSales(userId, callback){
   // MOCKS
   const sales = [
     {
      name: 'Camila',
      options: {deliver: 'take away',payment: 'debit'},
      products: [{productName: 'Manteca',productAmmount: 3},
                  {productName: 'Arroz',productAmmount: 2}]
     },
     {
      name: 'Luciano',
      options: {deliver: 'delivery',payment: 'money'},
      products: [{productName: 'Leche',productAmmount: 1},
                {productName: 'Manteca',productAmmount: 3},
                {productName: 'Arvejas',productAmmount: 5}]
     }
   ];
  callback(null, sales)
 }