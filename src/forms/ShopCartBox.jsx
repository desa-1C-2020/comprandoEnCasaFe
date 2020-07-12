import React from 'react'
import { Divider } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import { ShopProductDisplay } from '../components/ShopProductDisplay'
import FormattedCurrency from '../components/FormattedCurrency'
import '../styles/ShopCartBox.css'

export class ShopCartBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
      display: 'block',
      totalPrice: 0
    }
    this.deleteProduct = this.deleteProduct.bind(this);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }

  componentDidMount(){
    const products = Array.from(this.props.info.buyList);
    const productList = [];
    let key = 600
    products.forEach((p) => {
      let e = <ShopProductDisplay key={key} product={p} delete={this.deleteProduct}/>
      productList.push(e);
      key = key + 1;
    })
    const price = this.calculateTotalPrice(products);
    this.setState({products: productList, totalPrice: price})
  }

  calculateTotalPrice(products){
    let price = 0;
    products.forEach((p) =>{
      price = price + (p.product.price * p.ammount);
    })
    return price;
  }

  deleteProduct(id){
    if(this.state.products.length === 1){
      this.props.delete(id, this.props.info.shopId);
      this.setState({products: [], display: 'none', totalPrice: 0});
    } else {
      const updatedProducts = [];
      const products = this.state.products;
      let newTotal = 0
      products.forEach((p) => {
        if(p.props.product.product.productId !== id){
          updatedProducts.push(p)
        } else {
          let price = p.props.product.product.price * p.props.product.ammount
          newTotal = this.state.totalPrice - price;
        }
      })
      this.props.delete(id, this.props.info.shopId);
      this.setState({products: updatedProducts, totalPrice: newTotal});
    }
  }

  render(){
    const products = this.props.info.buyList
    return(
      <span style={{display: this.state.display}}>
      <div className='shop-cart-box-container'>
        <div className='scb-title'>
          <p><b>{products[0].product.commerceName.toUpperCase()}</b></p>
        </div>
        <Divider vertical='true'></Divider>
        {this.state.products}
        <p className='scb-total'><FormattedMessage id='cart.totalshop'/>
          <b><FormattedCurrency value={this.state.totalPrice}/></b>
        </p>
      </div>
      </span>
    )
  }

}

export default ShopCartBox