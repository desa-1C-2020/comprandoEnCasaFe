import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../components/ShopSearch'
import ProfileInfo from '../components/ProfileInfo'
import { withRouter } from "react-router-dom"
import ProductComponent from '../components/ProductComponent'
import { searchProduct } from '../services/ProductService'
import { getAllProducts } from '../services/SellerService'
import { Alert, Spinner } from '@blueprintjs/core'
import ProductLoader from '../components/ProductLoader'
import SellerProductsComponent from '../components/SellerProductsComponent'
import { FormattedMessage } from 'react-intl'

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
      alert: false, 
      isLoading: false,
    }
    this.handleEvent = this.handleEvent.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goHome = this.goHome.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.goProductList = this.goProductList.bind(this);
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

  doSearch(text, distance){
    const id = parseInt(this.props.location.state.accountInfo.user.id)
    this.setState({isLoading: true, searchResult: false})
    searchProduct(text, id, distance, (err, res) =>{
      if(err){
        this.setState({alert: true, isLoading: false})
      } else {
        this.setState({
          shopSearch: false,
          searchResult: true,
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
                    handleSearch={this.doSearch}/>
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
                                                            shopId={user.uid}/>}
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