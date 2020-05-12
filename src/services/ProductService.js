import axios from 'axios'

const host = 'https://comprando-en-casa.herokuapp.com'

export function searchForShops(lat, lng, max, callback) {
  axios.get(`${host}/commerces/findInRange?maxDistance=${max}&latitud=${lat}&longitud=${lng}`)
  .then((response) => callback(null, response))
  .catch((error) => callback(error, null))
}

export function getShops() {
  return(
    [
      {name: "Almacén Lola", address: "San Martin 34"},
      {name: "Supermercado Roque", address: "Belgrano 1345"},
      {name: "Pizzeria Los Hermanos", address: "Sarmiento 998"}
    ]
  )
}