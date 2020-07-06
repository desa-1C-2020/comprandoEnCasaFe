import React from 'react'
import DeliveryPayOptions from '../components/DeliveryPayOptions'
import { Button } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import '../styles/BuyConfirmationScreen.css'

export class BuyConfirmationScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: [],
      components: []
    }
    this.handleClose = this.handleClose.bind(this);
    this.createArray = this.createArray.bind(this);
    this.getShopIds = this.getShopIds.bind(this);
    this.generateShoppings = this.generateShoppings.bind(this);
    this.createOptionsBoxes = this.createOptionsBoxes.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.doPurchase = this.doPurchase.bind(this);
  }
  
  handleClose(){
    this.props.close();
  }
  
  componentDidMount(){
    const products = this.createArray();
    const shopIds = this.getShopIds(products);
    const myShoppings = this.generateShoppings(shopIds, products);
    const components = this.createOptionsBoxes(myShoppings);
    this.setState({components: components})
  }

  createArray(){
    const shoppings = Array.from(JSON.parse(localStorage.getItem('usercart')).cart);
    return shoppings;
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

  getShopIds(products){
    const ids = [];
    products.forEach(element => {
      let id = element.product.commerceId;
      if(!ids.includes(id)) ids.push(id);
    })
    return ids;
  }

  createOptionsBoxes(myShoppings){
    const shops = []
    let key = 7000;
    myShoppings.forEach((shop) => {
      let e = <DeliveryPayOptions key={key} info={shop} updateInfo={this.updateInfo}/>
      shops.push(e);
      key = key + 1;
    })
    return shops;
  }

  updateInfo(info){
    // TODO - impl
    console.log(info)
  }

  doPurchase(){
    // TODO - impl
  }

  render(){
    return(
      <div style={{marginBottom: '50px'}}>
        <p className='bcs-title'><FormattedMessage id='cart.confirmTitle'/></p>
        {this.state.components}
        <div className='bcs-title'>
          <Button intent='success' style={{marginRight: '20px'}}
                  onClick={this.doPurchase}>
            <FormattedMessage id='cart.confirmBuy'/>
          </Button>
          <Button intent='danger'
                  onClick={()=>this.props.close()}>
            <FormattedMessage id='t.goback'/>
          </Button>
        </div>
      </div>
    )
  }

}

export default BuyConfirmationScreen;