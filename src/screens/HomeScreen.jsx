import React from 'react'
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