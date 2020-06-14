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
  // TODO - las credenciales deben ser email y pass
  // TODO - eliminar este mock cuando sea posible
  // axios.post(`${host}/account/login`, credentials)
  // .then((response) => {
  //   callback(null, response)   
  // })
  // .catch((error) => callback(error, null))
  let res ={
    type: 'buyer',
    info: {
      name: 'Camila',
      surname: 'Sosa',
      email: 'camila@gmail.com',
      street: 'Belgrano 789',
      lat: '876768744',
      lgn: '8969869696'
    }
  }
  callback(null, res);
}