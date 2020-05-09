import React from 'react'
import '../styles/HomeScreen.css'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../components/ShopSearch'

class HomeScreen extends React.Component {

  render(){
    return (
      <div>
        <HomeNavBar />
        <ShopSearch />
      </div>
    )
  }

}

export default HomeScreen