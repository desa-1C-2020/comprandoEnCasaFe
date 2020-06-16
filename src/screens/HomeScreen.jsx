import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../components/ShopSearch'
import ProfileInfo from '../components/ProfileInfo'
import { withRouter } from "react-router-dom"
import ProductComponent from '../components/ProductComponent'
import { searchProduct } from '../services/ProductService'
import { getAllProducts } from '../services/SellerService'
import { Alert } from '@blueprintjs/core'
import ProductLoader from '../components/ProductLoader'
import SellerProductsComponent from '../components/SellerProductsComponent'

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shopSearch: true,
      productLoader: true,
      profile: false,
      searchResult: false,
      productList: false,
      products: [],
      alert: false
    }
    this.handleEvent = this.handleEvent.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goHome = this.goHome.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.goProductList = this.goProductList.bind(this);
  }

  handleEvent(name, value){
    this.setState({[name]: value})
  }

  logOut(){
    //TODO - servicio para cerrar sesion
    this.props.history.push('/');
  }

  goHome(){
    this.setState({
      shopSearch: true,
      productLoader: true,
      profile: false,
      searchResult: false,
      productList: false
    })
  }

  goProductList(){
    const id = 'sarasa' //TODO - this.props.location.state.accountInfo.commerceOnThrow.id
    getAllProducts(id, (err, res) => {
      if(err) this.setState({alert: true})
      else {
        this.setState({
          productLoader: false,
          products: res,
          productList: true
        })
      }
    })
  }

  doSearch(text){
    const id = this.props.location.state.accountInfo.user.uid
    searchProduct(text, id, 4000.3, (err, res) =>{
      if(err){
        this.setState({alert: true})
      } else {
        this.setState({
          shopSearch: false,
          searchResult: true,
          products: res.products
        })
      }
    })
  }

  render(){
    const account = this.props.location.state !== undefined &&
                    this.props.location.state.account === 'seller' ?
                    'seller' : 'buyer'
    const user = this.props.location.state !== undefined ? 
                 this.props.location.state.accountInfo.user : {}
    let shop = this.props.location.state !== undefined ?
                 this.props.location.state.accountInfo.commerceOnThrow : {}
    shop = {id: 'Soy un ID'} // TODO - borrar este mock 
    return (        
      <div>
        <HomeNavBar accountType={account} 
                    goHome={this.goHome}
                    showSellerProducts={this.goProductList}
                    handleProfile={() => this.handleEvent('profile', true)}
                    handleLogOut={this.logOut}
                    handleSearch={this.doSearch}/>
        {account === 'buyer' && this.state.shopSearch && <ShopSearch/>}
        {this.state.profile && <ProfileInfo isOpen={this.state.profile} 
                                            accountType={account} 
                                            info={user}
                                            handleProfile={() => this.handleEvent('profile', false)}/>}
        {this.state.searchResult && <ProductComponent products={this.state.products}/>}
        {account === 'seller' && this.state.productLoader && <ProductLoader userID={shop.id}/>}
        {account === 'seller' && this.state.productList && <SellerProductsComponent products={this.state.products}/>}
        <Alert isOpen={this.state.alert}
               confirmButtonText='ACEPTAR'
               icon='error'
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              ¡Algo salió mal!
        </Alert>
      </div>      
    )
  }

}

export default withRouter(HomeScreen)