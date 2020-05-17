import axios from 'axios'

const host = 'https://comprando-en-casa.herokuapp.com'

export function searchForShops(lat, lng, max, callback) {
  axios.get(`${host}/commerces/findInRange?maxDistance=${max}&latitud=${lat}&longitud=${lng}`)
  .then((response) => {
    callback(null, response)   
  })
  .catch((error) => callback(error, null))
}
