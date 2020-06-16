import axios from 'axios';
import {apiBasicUrl} from "../utilities/Environment";

export function registerBuyer(userInfo, callback) {
  axios.post(`${apiBasicUrl()}/account/buyer`, userInfo)
  .then((response) => {
    callback(null, response)
  })
  .catch((error) => callback(error, null))
}

export function registerSeller(userInfo, callback) {
  const buyerInfo = userInfo.user;
  const shopInfo = userInfo.commerce;
  registerBuyer(buyerInfo, (err, res) => {
    if (err) callback(err, null)
    else {
      const uid = res.data.user.uid;
      shopInfo.userId = uid;
      axios.post(`${apiBasicUrl()}/account/seller`, shopInfo)
      .then((res) =>  callback(null, res))
      .catch((err) => callback(err, null))
    }
  })
}

export function login(credentials, callback){
  axios.post(`${apiBasicUrl()}/account/login`, credentials)
  .then((response) => {
    let accountType = response.data.commerceOrThrow === undefined ? 'buyer' : 'seller'
    let resInfo = {
      type: accountType,
      info: response.data
    };
    callback(null, resInfo)
   })
   .catch((error) => callback(error, null))
}