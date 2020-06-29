import axios from 'axios';
import {apiBasicUrl} from "../utilities/Environment";

export function registerBuyer(userInfo, callback) {
  axios.post(`${apiBasicUrl()}/account/buyer`, userInfo)
  .then((response) => callback(null, response))
  .catch((error) => callback(error, null))
}

export function registerSeller(sellerInfo, callback) {
  axios.post(`${apiBasicUrl()}/account/seller`, sellerInfo)
  .then((res) =>  callback(null, res))
  .catch((err) => callback(err, null))  
}

export function login(credentials, callback){
  axios.post(`${apiBasicUrl()}/account/login`, credentials)
  .then((response) => {
    let accountType = response.data.commerce === undefined ? 'buyer' : 'seller'
    let resInfo = {
      type: accountType,
      info: response.data
    };
    callback(null, resInfo)
   })
   .catch((error) => callback(error, null))
}