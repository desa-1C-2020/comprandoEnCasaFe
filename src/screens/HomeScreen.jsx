import React from 'react'
import '../styles/HomeScreen.css'
import HomeNavBar from '../components/HomeNavBar'

class HomeScreen extends React.Component {

  render(){
    return (
      <div className="fondo">
        <HomeNavBar></HomeNavBar>
        <p>Página home</p>    
      </div>
    )
  }

}

export default HomeScreen