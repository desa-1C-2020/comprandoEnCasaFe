import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../components/ShopSearch'
import ProfileInfo from '../components/ProfileInfo'
import { withRouter } from "react-router-dom"
import ProductComponent from '../components/ProductComponent'
import { searchProduct } from '../services/ProductService'

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shopSearch: true,
      profile: false,
      searchResult: false
    }
    this.handleEvent = this.handleEvent.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goHome = this.goHome.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  handleEvent(name, value){
    this.setState({[name]: value})
  }

  logOut(){
    //TODO - servicio para cerrar sesion
    this.props.history.push('/');
  }

  goHome(){
    //TODO - reestablece al estado inicial
    this.setState({
      shopSearch: true,
      profile: false,
      searchResult: false
    })
  }

  doSearch(text){
    //TODO - llamado al back
    searchProduct(text, (err, res) =>{
      if(err){
        //TODO - alert algo salio mal
      } else {
        this.setState({
          shopSearch: false,
          searchResult: true
        })
      }
    })
  }

  render(){
    const account = this.props.location.state !== undefined &&
                    this.props.location.state.account === 'seller' ?
                    'seller' : 'buyer'
    const info = this.props.location.state !== undefined ? 
                 this.props.location.state.accountInfo : {}
    return (        
      <div>
        <HomeNavBar accountType={account} 
                    goHome={this.goHome}
                    handleProfile={() => this.handleEvent('profile', true)}
                    handleLogOut={this.logOut}
                    handleSearch={this.doSearch}/>
        {account === 'buyer' && this.state.shopSearch && <ShopSearch/>}
        {this.state.profile && <ProfileInfo isOpen={this.state.profile} 
                                            accountType={account} 
                                            info={info}
                                            handleProfile={() => this.handleEvent('profile', false)}/>}
        {this.state.searchResult && <ProductComponent products={this.state.products}/>}
      </div>      
    )
  }

}

export default withRouter(HomeScreen)