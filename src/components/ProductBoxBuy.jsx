import React from 'react'
import '../styles/ProductBoxBuy.css'

class ProductBoxBuy extends React.Component {

  render(){
    const price = this.props.info.price
    const product = this.props.info.product
    return (        
      <div className='main-container'>
        <img className='product-image' alt={product.name} src={product.image}></img>
        <p className='name-brand'>{`${product.name} ${product.brand}`}</p>
        <p className='product-price'><b>${price}</b></p>
      </div>
    )
  }

}

export default ProductBoxBuy