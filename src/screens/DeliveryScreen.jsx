import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import MapComponent from '../components/MapComponent'
class HomeScreen extends React.Component {

  render(){
    return (
      <div style={{backgroundColor: 'white'}}>
        <HomeNavBar></HomeNavBar>
        <h1>Ruta de la compra</h1> 
        <MapComponent/>  
      </div>
    )
  }

}

export default HomeScreen