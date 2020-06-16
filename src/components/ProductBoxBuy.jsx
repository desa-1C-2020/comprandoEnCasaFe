import React from 'react'
import '../styles/ProductBoxBuy.css'

class ProductBoxBuy extends React.Component {

  render(){
    const product = this.props.info
    return (        
      <div className='main-container'>
        <img className='product-image' alt={product.name} src={product.imageUrl}></img>
        <p className='name-brand'>{product.name}</p>
        <p className='product-price'><b>${product.price}</b></p>
      </div>
    )
  }

}

export default ProductBoxBuy