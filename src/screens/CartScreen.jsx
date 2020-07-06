import React from 'react'
import {NonIdealState, Button} from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import { ShopCartBox } from '../forms/ShopCartBox'
import { BuyConfirmationScreen } from './BuyConfirmationScreen' 
import '../styles/CartScreen.css'

export class CartScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shoppings: [],
      isEmpty: false,
      shopComponents: [],
      total: 0,
      confirm: false,
      list: true
    }
    this.createArray = this.createArray.bind(this);
    this.getShopIds = this.getShopIds.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.generateShoppings = this.generateShoppings.bind(this);
    this.createShops = this.createShops.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteFromLS = this.deleteFromLS.bind(this);  
    this.doSuccess = this.doSuccess.bind(this);
  }

  componentDidMount(){
    const products = this.createArray();
    const shopIds = this.getShopIds(products);
    const total = this.calculateTotal(products);
    const empty = products.length < 1;
    const myShoppings = this.generateShoppings(shopIds, products);
    const components = this.createShops(myShoppings);
    this.setState({shoppings: myShoppings, 
                    isEmpty: empty, 
                    shopComponents: components,
                    total: total});
  }

  createArray(){
    const shoppingList = localStorage.getItem('usercart');
    if(shoppingList === null) return [];
    const shoppings = Array.from(JSON.parse(localStorage.getItem('usercart')).cart);
    return shoppings;
  }

  getShopIds(products){
    const ids = [];
    products.forEach(element => {
      let id = element.product.commerceId;
      if(!ids.includes(id)) ids.push(id);
    })
    return ids;
  }

  calculateTotal(products){
    let total = 0;
    products.forEach((p) => {
      total = total + (p.product.price * p.ammount)
    })
    return total;
  }

  generateShoppings(shopIds, products){
    const myShoppings = [];
    shopIds.forEach((id) => {
      myShoppings.push({
        shopId: id,
        buyList: []
      })
    })
    products.forEach((p) => {
      myShoppings.forEach((shop) => {
        if(shop.shopId === p.product.commerceId) shop.buyList.push(p);
      })
    })
    return myShoppings;
  }

  createShops(myShoppings){
    const shops = []
    let key = 5000;
    myShoppings.forEach((shop) => {
      let e = <ShopCartBox key={key} info={shop} delete={this.delete}/>
      shops.push(e);
      key = key + 1;
    })
    return shops;
  }

  delete(productId){
    const minusPrice = this.deleteFromLS(productId);
    const newTotal = this.state.total - minusPrice;
    this.setState({total: newTotal, isEmpty: newTotal === 0 })
  }

  deleteFromLS(productId){
    const shoppings = Array.from(JSON.parse(localStorage.getItem('usercart')).cart);
    const newShoppings = [];
    let minusPrice = 0;
    shoppings.forEach((shop) => {
      if(shop.product.productId !== productId){
        newShoppings.push(shop);
      } else {
        minusPrice = shop.product.price * shop.ammount;
      }
    })
    localStorage.setItem('usercart', JSON.stringify({cart: newShoppings}));
    return minusPrice;
  }

  doSuccess(){
    localStorage.clear();
    this.setState({isEmpty: true, list: true, confirm: false});
  }

	render() {
    const nisTitle = <FormattedMessage id='cart.emptyTitle'/>
    return (
      <div>
        <div className='results-title'><FormattedMessage id='navbar.myshopping'/></div>
        {this.state.list && 
        <span>
        {this.state.isEmpty ? 
        <div className='no-results-nis'>
          <NonIdealState icon='disable' title={nisTitle}/>
        </div>
        :
        <div>
          {this.state.shopComponents}
          <div className='buy-resume'>
            <p className='cart-total'><FormattedMessage id='cart.total'/> ${this.state.total}</p>
            <Button icon='dollar' large={true} intent='success'
                    onClick={() => this.setState({confirm: true, list: false})}>
              <FormattedMessage id='cart.buy'/>
            </Button>
          </div>
        </div>
        }</span>
      }
        {this.state.confirm && <BuyConfirmationScreen isOpen={this.state.confirm} 
                               close={()=> this.setState({confirm: false, list: true})}
                               total={this.state.total}
                               success={this.doSuccess}/>
        }
      </div>
		);
	}
}

export default CartScreen