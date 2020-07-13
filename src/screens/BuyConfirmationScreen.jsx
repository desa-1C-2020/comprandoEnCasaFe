import React from 'react'
import DeliveryPayOptions from '../components/DeliveryPayOptions'
import { Button, Alert, RadioGroup, Radio } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import '../styles/BuyConfirmationScreen.css'
import { sendPurchase } from '../services/ProductService'
import DeliveryDetails from '../forms/DeliveryDetails'
import takeawayDetails, { TakeAwayDetails } from '../forms/TakeAwayDetails'

export class BuyConfirmationScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: {},
      components: [],
      alert: false,
      alertIntent: '',
      alertId: '',
      payment: 'CASH',
      deliver: 'TAKE_AWAY',
      takeawayDetails: {},
      deliveryDetails: {}
    }
    this.handleClose = this.handleClose.bind(this);
    this.createArray = this.createArray.bind(this);
    this.getShopIds = this.getShopIds.bind(this);
    this.generateShoppings = this.generateShoppings.bind(this);
    this.createBoxes = this.createOptionsBoxes.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.doPurchase = this.doPurchase.bind(this);
    this.handleDelivery = this.handleDelivery.bind(this); 
    this.handlePayment = this.handlePayment.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.generateDeliveryOption = this.generateDeliveryOption.bind(this);
    this.generateShoppingListTO = this.generateShoppingListTO.bind(this);
    this.generateItemByCommerce = this.generateItemByCommerce.bind(this);
    this.generateItemList = this.generateItemList.bind(this);
  }

  handleDelivery(e){
    this.setState({deliver: e.target.value})
  }

  handlePayment(e){
    this.setState({payment: e.target.value})
  }
  
  handleClose(){
    this.props.close();
  }
  
  componentDidMount(){
    //TODO - traer opciones para delivery y takeaway del back. Guardarlas en algún lado.
    const products = this.createArray();
    const shopIds = this.getShopIds(products);
    const myShoppings = this.generateShoppings(shopIds, products);
    const components = this.createOptionsBoxes(myShoppings);
    const options = new Map();
    this.setState({components: components, options: options});
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
    const ops = this.state.options;
    ops.set(info.shopId, info);
    this.setState({options: ops});
  }

  doPurchase(){
    let deliverFee = this.state.deliver === 'TAKE_AWAY' ? 0 : 30;
    const body = {
      shoppingListTO: this.generateShoppingListTO(),
      selectedPaymentMethod: this.state.payment,
      deliveryOption: this.generateDeliveryOption(),
      total: (this.calculateTotal() + deliverFee)
    }
    sendPurchase(body, this.state.deliver, (err, res)=> {
      if(err){
        //this.setState({alert: true, alertId: 'cart.error', alertIntent: 'danger'})
      } else{
        console.log(body);
        //this.setState({alert: true, alertId: 'cart.success', alertIntent: 'success'})
      }
    })  
  }

  calculateTotal(){
   const products = Array.from(JSON.parse(localStorage.getItem('usercart')).cart);
   let total = 0;
   products.forEach((p) =>{total = total + (p.product.price * p.ammount);})
   return total;
  }

  //TODO - devolver algo elegido por el comprador
  generateDeliveryOption(){
    let options = {}
    if(this.state.deliver === 'TAKE_AWAY'){
      options = {
        commercesId: [], //lista de longs con los id de los shop
        suggestedDay: '' //String con formato "yyyyMMdd:HHmmss"
      }
    } else {
      options = {
        commercesId: [], //lista de longs con los id de los shop
        //??
      }
    }
    return options;
  }

  generateShoppingListTO(){
    const products = this.createArray();
    const shopIds = this.getShopIds(products);
    const shoppings = this.generateShoppings(shopIds, products);
    const bodyProducts = this.generateItemByCommerce(shoppings);
    const shoppingListTO = {
      itemByCommerceTo: bodyProducts,
      creationDataTime: (new Date()), //TODO - con qué formato??
      total: this.calculateTotal()
    }
    return shoppingListTO;
  }

  generateItemByCommerce(shops){
    const items = [];
    shops.forEach((shop) => {
      let item = {
        commerceId: shop.shopId,
        items: this.generateItemList(shop.buyList)
      }
      items.push(item);
    })
    return items;
  }

  generateItemList(buyList){
    const itemList = [];
    buyList.forEach((item) =>{
      let i = {
        productId: item.product.productId,
        quantity: item.ammount,
        price: item.product.price
      }
      itemList.push(i)
    })
    return itemList;
  }

  render(){
    return(
      <div style={{marginBottom: '50px'}}>
        <p className='bcs-title'><FormattedMessage id='cart.confirmTitle'/></p>
        {this.state.components}
        <div className='bcs-title'>
        <div className='cart-radio'>  
          <RadioGroup label={<FormattedMessage id='cart.del.ops'/>}
            onChange={this.handleDelivery}
            selectedValue={this.state.deliver}
            inline='true'>
            <Radio label="Take Away" value="TAKE_AWAY" />
            <Radio label="Delivery" value="DELIVERY" />
          </RadioGroup>
        </div>
        {this.state.deliver === 'DELIVERY' && <span>
          <div className='delivery-fee'>
            <span className='delivery-text'><FormattedMessage id='delivery.fee'/></span>
          </div>
          <div><DeliveryDetails/></div>
        </span>}
        {this.state.deliver === 'TAKE_AWAY' && <div><TakeAwayDetails/></div>}
        <div className='cart-radio'>
        <RadioGroup label={<FormattedMessage id='cart.pay.ops'/>}
            onChange={this.handlePayment}
            selectedValue={this.state.payment}
            inline='true'>
            <Radio label={<FormattedMessage id='cart.money'/>} value="CASH" />
            <Radio label={<FormattedMessage id='cart.debit'/>} value="DEBIT" />
            <Radio label={<FormattedMessage id='cart.credit'/>} value="CREDIT" />
        </RadioGroup>
        </div>
        <div style={{marginTop: '25px'}}>
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
        <Alert isOpen={this.state.alert}
               confirmButtonText={<FormattedMessage id='t.accept'/>}
               intent={this.state.alertIntent}
							 icon={this.state.alertIntent === 'danger' ? 'error' : 'endorsed'}
               onClose={() => {
                 if(this.state.alertIntent === 'success'){
                  this.props.success();
                 } else {
                  this.setState({alert: false})
                 }
               }}>
          <FormattedMessage id={this.state.alertId}/>
        </Alert>
      </div>
    )
  }

}

export default BuyConfirmationScreen;