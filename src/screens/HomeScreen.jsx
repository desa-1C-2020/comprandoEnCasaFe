import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../forms/ShopSearch'
import ProfileInfo from '../components/ProfileInfo'
import { withRouter } from "react-router-dom"
import ProductComponent from './ProductComponent'
import { searchProduct } from '../services/ProductService'
import { getAllProducts } from '../services/SellerService'
import { Alert as ALERTITA, Spinner } from '@blueprintjs/core'
import ProductLoader from '../forms/ProductLoader'
import SellerProductsComponent from './SellerProductsComponent'
import { FormattedMessage } from 'react-intl'
import { CartScreen } from './CartScreen'
import AppHeader from '../common/AppHeader';
import { ACCESS_TOKEN, SELLER, BUYER } from '../constants';
import Alert from 'react-s-alert';

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
      console.log("dentro home proo authen:: " + JSON.stringify(this.props.authenticated));
      console.log("dentro home prop user:: " + JSON.stringify(this.props.currentUser));
      console.log("dentro home prop type  :: " + JSON.stringify(this.props.accountType));
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
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goHome = this.goHome.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.goProductList = this.goProductList.bind(this);
    this.goShoppingCart = this.goShoppingCart.bind(this);
    console.log("dentro del home.. user" + JSON.stringify(this.props.currentUser));
    console.log("dentro del home.. type" + JSON.stringify(this.props.accountType));
  }

  componentWillMount(){
    if(this.props.location.state === undefined){
      this.props.history.push('/')
    }
  }

  handleEvent(name, value){
    this.setState({[name]: value})
  }

  logOut() {
    localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
    Alert.success("Deslogueado correctamente!");
    this.props.history.push('/login')
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
    this.setState({isLoading: true});
    getAllProducts()
        .then(products => this.setState({
            shopSearch: false,
            productLoader: false,
            profile: false,
            searchResult: false,
            productList: true,
            shoppingCart: false,
            products,
            isLoading: false
        }))
        .catch(()=> this.setState({alert: true, isLoading: false}));
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
    const isSeller = this.props.accountType === SELLER;
    const isBuyer = this.props.accountType === BUYER;
    const accountType = this.props.accountType;
    const user = this.props.currentUser;

    return (
      <div>

          <div className="app-top-box">
              <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
          </div>

        <HomeNavBar authenticated={this.state.authenticated}
                    accountType={accountType}
                    goHome={this.goHome}
                    showSellerProducts={this.goProductList}
                    handleLogOut={this.logOut}
                    handleSearch={this.doSearch}
                    goShoppingCart={this.goShoppingCart}/>
        {/*{isBuyer && this.state.shopSearch && <ShopSearch address={user.address}/>}*/}
        {this.state.searchResult && <ProductComponent products={this.state.products}/>}
        {isSeller && this.state.productLoader && <ProductLoader userID={user.id}/>}
        {isSeller && this.state.productList && <SellerProductsComponent
                                                            products={this.state.products}
                                                            shopId={user.id}/>}
        {isBuyer && this.state.shoppingCart && <CartScreen/>}
        <ALERTITA isOpen={this.state.alert}
               confirmButtonText='ACEPTAR'
               icon='error'
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              <FormattedMessage id='t.error'/>
        </ALERTITA>
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