import React from 'react'
import DeliveryPayOptions from '../components/DeliveryPayOptions'
import { Button, Alert } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import '../styles/BuyConfirmationScreen.css'
import { sendPurchase } from '../services/ProductService'

export class BuyConfirmationScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: {},
      components: [],
      alert: false,
      alertIntent: '',
      alertId: ''
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

  // TODO - faltan definiciones para hacer esto
  doPurchase(){
    const shopsIds = Array.from(this.state.options.keys());
    const purchases = [];
    shopsIds.forEach((id) => {
      //obtener productos del localStorage que tengan este shop ID
      let products = [];
      //Armo el purchase para la tienda [FALTA DEFINIR EL FORMATO DE ESTO!]
      let purchase = {
        shopId: id,
        items: products 
      }
      purchases.push(purchase);
    })
    sendPurchase(purchases, (err, res) =>{
      if(err) {
        this.setState({alert: true, alertId: 'cart.error', alertIntent: 'danger'})
      } 
      else {
        //guardo la compra, llamado al back no definido
        //si sale bien, levanto alert OK [falta definir como es esto]
        this.setState({alert: true, alertId: 'cart.success', alertIntent: 'success'})
      }
    });
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