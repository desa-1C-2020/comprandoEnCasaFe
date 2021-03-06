import React from 'react'
import '../styles/ProductBoxBuy.css'
import { Dialog, Button, Alert, NumericInput } from '@blueprintjs/core'
import { FormattedMessage, injectIntl } from 'react-intl'
import FormattedCurrency from '../components/FormattedCurrency'

class ProductBoxBuy extends React.Component {

  constructor(){
    super();
    this.state = {
      isOpen: false,
      alert: false,
      alertFail: false,
      ammount: 1,
    }
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('usercart') === null){
      localStorage.setItem('usercart', JSON.stringify({ cart: []}))
    }
  }

  addProductToCart(){
    if(this.state.ammount > this.props.info.stock){
      this.setState({alertFail: true});
    } else {
      const cartProduct = {
        product: this.props.info, 
        ammount: this.state.ammount
      }
      const myProductId = this.props.info.productId;
      const shoppingList = Array.from(JSON.parse(localStorage.getItem('usercart')).cart);
      let exists = false;
      shoppingList.forEach(element => {
        if(element.product.productId === myProductId){
          exists = true;
          element.ammount = this.state.ammount;
        }
      });
      if(!exists) shoppingList.push(cartProduct);
      localStorage.setItem('usercart', JSON.stringify({cart: shoppingList}));
      this.setState({alert: true});
    }
  }

  render(){
    const product = this.props.info;
    const { intl } = this.props;
    return (   
      <span>
        <div className='main-container' onClick={() => this.setState({isOpen: true})}>
          <img className='product-image' alt={product.name} src={product.imageUrl}></img>
          <p className='name-brand'>{product.name}</p>
          <p className='shop-name'><b>{product.commerceName.toUpperCase()}</b></p>
          <p className='product-price'>
            <b> <FormattedCurrency value={product.price}/> </b></p>
        </div>
        <Dialog isOpen={this.state.isOpen} title={intl.formatMessage({id:'buybox.title'})} 
        onClose={() => this.setState({isOpen: false})}>
          <div className='dialog-container'>
            <div className='dialog-product'>
              <div style={{display: 'inline-block'}}>
                <img className='product-image-dialog' alt={product.name} src={product.imageUrl}></img>
              </div>
              <div style={{display: 'inline-block'}}>
                <table className='dialog-desc'><tbody>
                  <tr><td><p><FormattedMessage id='ploader.prodname'/><b>: {product.name}</b></p></td></tr>
                  <tr><td><p><FormattedMessage id='ploader.brand'/><b>: {product.brand}</b></p></td></tr>
                  <tr><td><p><FormattedMessage id='ploader.price'/>
                    <b>: <FormattedCurrency value={product.price}/> </b>
                  </p></td></tr>
                  <tr><td><p><FormattedMessage id='ploader.stock'/><b>: {product.stock}</b></p></td></tr>
                  <tr><td><FormattedMessage id='buybox.ammount'/>
                    <NumericInput style={{width: '50px'}} max={10} min={1} value={this.state.ammount}
                                  onValueChange={(n) => this.setState({ammount: n})}/>
                  </td></tr>
                </tbody></table>
              </div>
            </div>
            <div className='dialog-shop'>
              <h3 style={{textAlign: 'center'}}><FormattedMessage id='t.commercedata'/></h3>
              <p className='bb-shop-desc'><FormattedMessage id='t.commercename'/>: <b>{product.commerceName}</b></p>
              <p className='bb-shop-desc'><FormattedMessage id='buybox.distance'/>: <b>{product.distance}</b></p>
            </div>
            <div className='dialog-button'>
              <Button className='bb-add-btn' icon='shopping-cart' onClick={this.addProductToCart}>
                <FormattedMessage id='buybox.addtocart'/>
              </Button>
            </div>
          </div>
        </Dialog>
        <Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
							 intent='success'
							 icon='endorsed'
               onClose={() => {this.setState({alert: false, isOpen: false})}}>
          <FormattedMessage id='buybox.added'/>
        </Alert>
        <Alert isOpen={this.state.alertFail}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
							 intent='warning'
							 icon='error'
               onClose={() => {this.setState({alertFail: false})}}>
          <FormattedMessage id='buybox.stock'/>
        </Alert>
      </span>
    )
  }

}

export default injectIntl(ProductBoxBuy)