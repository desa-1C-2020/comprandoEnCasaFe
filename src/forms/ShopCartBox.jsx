import React from 'react'
import { Divider } from '@blueprintjs/core'
import { ShopProductDisplay } from '../components/ShopProductDisplay'
import '../styles/ShopCartBox.css'

export class ShopCartBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    const products = Array.from(this.props.info.buyList);
    const productList = [];
    let key = 600
    products.forEach((p) => {
      let e = <ShopProductDisplay key={key} product={p}/>
      productList.push(e);
      key = key + 1;
    })
    this.setState({products: productList})
  }

  render(){
    const products = this.props.info.buyList
    return(
      <div className='shop-cart-box-container'>
        <div className='scb-title'>
          <p><b>{products[0].product.commerceName.toUpperCase()}</b></p>
        </div>
        <Divider vertical='true'></Divider>
        {this.state.products}
      </div>
    )
  }

}

export default ShopCartBox