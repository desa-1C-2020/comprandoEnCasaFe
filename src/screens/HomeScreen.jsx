import React from 'react'
import HomeNavBar from '../components/HomeNavBar'

class HomeScreen extends React.Component {

  render(){
    return (
      <div>
        <HomeNavBar></HomeNavBar>
        <p style={{marginTop: '200px', marginLeft: '35%'}}>
          <h1>¡¡Soy la página Home!!</h1>
        </p>
      </div>
    )
  }

}

export default HomeScreen