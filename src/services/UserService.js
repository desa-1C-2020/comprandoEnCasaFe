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
      .then((res) => { 
        console.log("respuesta vendedor")
        console.log(res);
        callback(null, res) 
      })
      .catch((err) => {
        console.log(shopInfo)
        console.log("error")
        console.log(err)
        callback(err, null)})
    }
  })
}

export function login(credentials, callback){
  // TODO - las credenciales deben ser email y pass
  // TODO - eliminar este mock cuando sea posible
  // axios.post(`${host}/account/login`, credentials)
  // .then((response) => {
  //   callback(null, response)   
  // })
  // .catch((error) => callback(error, null))
  // let res ={
  //   type: 'buyer',
  //   info: {
  //     name: 'Camila',
  //     surname: 'Sosa',
  //     email: 'camila@gmail.com',
  //     street: 'Belgrano 789',
  //     lat: '876768744',
  //     lgn: '8969869696'
  //   }
  // }
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