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
  const buyerInfo = userInfo.user;
  const shopInfo = userInfo.commerce;
  registerBuyer(buyerInfo, (err, res) => {
    if (err) callback(err, null)
    else {
      const uid = res.data.user.uid
      shopInfo.userId = uid;
      axios.post(`${host}/account/seller`, shopInfo)
      .then((res) =>  callback(null, res))
      .catch((err) => callback(err, null))
    }
  })
}

export function login(credentials, callback){
  // console.log(credentials)
  //  axios.post(`${host}/account/login`, credentials)
  //  .then((response) => {
  //    console.log(response.data)
  //    let resInfo = {
  //     type: '',
  //     info: {

  //     }
  //    }
  //    callback(null, resInfo)   
  //  })
  //  .catch((error) => {
  //    console.log(error)
  //    callback(error, null)
  //   })
  //TODO - borrar mock y hacer el llamado
  let res = {
    type: 'seller',
    info: {
      name: 'Despensa Susana',
      sector: 'almacen',
      email: 'almacenSusana@gmail.com',
      address: {
        street: 'calle 77',
        lat: '09668769',
        lgn: '98897699'
      },
    } 
  }
  callback(null, res);
}