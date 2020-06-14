import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../components/ShopSearch'

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shopSearch: false
    }
  }

  //TODO - funcion para mostrar ocultar cosas

  render(){
    const account = this.props.location.state !== undefined &&
                    this.props.location.state.account === 'seller' ?
                    'seller' : 'buyer'
    return (        
      <div>
        <HomeNavBar accountType={account}/>
        {account === 'seller' ?  //TODO - refactor, sacar el operador.
        <div>
          <p>Home vendedor!</p>
        </div>
        :
        <div>
          <ShopSearch />
        </div>
        }
      </div>      
    )
  }

}

export default HomeScreen