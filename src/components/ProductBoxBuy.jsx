import React from 'react'

class ProductBoxBuy extends React.Component {

  render(){
    //TODO - Mejorar estilos
    const price = this.props.info.price
    const product = this.props.info.product
    return (        
      <div style={{width: '150px', height:'150px', backgroundColor: 'white', marginRight: '10px', marginBottom: '10px', display:'inline-block'}}>
        <img alt={product.name} src={product.image} style={{width: '50px', height: '50px'}}></img>
        <p>{`${product.name} ${product.brand}`}</p>
        <p>${price}</p>
      </div>
    )
  }

}

export default ProductBoxBuy