import axios from 'axios'

const host = 'https://comprando-en-casa.herokuapp.com'

export function registerBuyer(userInfo, callback) {
  axios.post(`${host}/account/buyer`, userInfo)
  .then((response) => {
    callback(null, response)   
  })
  .catch((error) => callback(error, null))
}

export function registerSeller(userInfo, callback) {
  axios.post(`${host}/account/seller`, userInfo)
  .then((response) => {
    callback(null, response)   
  })
  .catch((error) => callback(error, null))
}

export function login(credentials, callback){
  // axios.post(`${host}/account/login`, credentials)
  // .then((response) => {
  //   callback(null, response)   
  // })
  // .catch((error) => callback(error, null))
  callback(null, null);
}