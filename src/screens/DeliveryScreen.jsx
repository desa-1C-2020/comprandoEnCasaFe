import React from 'react'
import '../styles/HomeScreen.css'
import HomeNavBar from '../components/HomeNavBar'
import MapComponent from '../components/MapComponent'
class HomeScreen extends React.Component {

  render(){
    return (
      <div className="fondo">
        <HomeNavBar></HomeNavBar>
        <h1>Ruta de la compra</h1> 
        <MapComponent/>  
      </div>
    )
  }

}

export default HomeScreen