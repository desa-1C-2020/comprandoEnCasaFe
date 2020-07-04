import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../forms/ShopSearch'
import ProfileInfo from '../components/ProfileInfo'
import { withRouter } from "react-router-dom"
import ProductComponent from './ProductComponent'
import { searchProduct } from '../services/ProductService'
import { getAllProducts } from '../services/SellerService'
import { Alert, Spinner } from '@blueprintjs/core'
import ProductLoader from '../forms/ProductLoader'
import SellerProductsComponent from './SellerProductsComponent'
import { FormattedMessage } from 'react-intl'
import { CartScreen } from './CartScreen'

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
      shoppingCart: false,
      alert: false, 
      isLoading: false,
    }
    this.handleEvent = this.handleEvent.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goHome = this.goHome.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.goProductList = this.goProductList.bind(this);
    this.goShoppingCart = this.goShoppingCart.bind(this);
  }
  
  componentWillMount(){
    if(this.props.location.state === undefined){
      this.props.history.push('/')
    }
  }

  handleEvent(name, value){
    this.setState({[name]: value})
  }

  logOut(){
    this.props.history.push('/');
  }

  goHome(){
    this.setState({
      shopSearch: true,
      productLoader: true,
      profile: false,
      searchResult: false,
      productList: false,
      shoppingCart: false,
    })
  }

  goShoppingCart(){
    this.setState({
      shopSearch: false,
      productLoader: false,
      profile: false,
      searchResult: false,
      productList: false,
      shoppingCart: true,
    })
  }

  goProductList(){
    const id = this.props.location.state.accountInfo.user.id;
    this.setState({isLoading: true})
    getAllProducts(id, (err, res) => {
      if(err) this.setState({alert: true, isLoading: false})
      else {
         this.setState({
          shopSearch: false,
          productLoader: false,
          profile: false,
          searchResult: false,
          productList: true,
          shoppingCart: false,
          products: res,
          isLoading: false
        })
      }
    })
  }

  doSearch(text, distance){
    const id = parseInt(this.props.location.state.accountInfo.user.id)
    this.setState({isLoading: true, searchResult: false})
    searchProduct(text, id, distance, (err, res) =>{
      if(err){
        this.setState({alert: true, isLoading: false})
      } else {
        this.setState({
          shopSearch: false,
          productLoader: false,
          profile: false,
          searchResult: true,
          productList: false,
          shoppingCart: false,
          products: res,
          isLoading: false,
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
                 this.props.location.state.accountInfo.commerce : {}
    return (        
      <div>
        <HomeNavBar accountType={account} 
                    goHome={this.goHome}
                    showSellerProducts={this.goProductList}
                    handleProfile={() => this.handleEvent('profile', true)}
                    handleLogOut={this.logOut}
                    handleSearch={this.doSearch}
                    goShoppingCart={this.goShoppingCart}/>
        {account === 'buyer' && this.state.shopSearch && <ShopSearch address={user.address}/>}
        {this.state.profile && <ProfileInfo isOpen={this.state.profile} 
                                            accountType={account} 
                                            info={user}
                                            shopInfo={shop}
                                            handleProfile={() => this.handleEvent('profile', false)}/>}
        {this.state.searchResult && <ProductComponent products={this.state.products}/>}
        {account === 'seller' && this.state.productLoader && <ProductLoader userID={user.id}/>}
        {account === 'seller' && this.state.productList && <SellerProductsComponent 
                                                            products={this.state.products} 
                                                            shopId={user.id}/>}
        {account === 'buyer' && this.state.shoppingCart && <CartScreen/>}                                                    
        <Alert isOpen={this.state.alert}
               confirmButtonText='ACEPTAR'
               icon='error'
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              <FormattedMessage id='t.error'/>
        </Alert>
        {this.state.isLoading &&
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>   
          <Spinner size='100' intent='primary'/>
        </div>
        }
      </div>      
    )
  }

}

export default withRouter(HomeScreen)