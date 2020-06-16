import React from 'react'
import ProductBoxSell from './ProductBoxSell'
import {NonIdealState} from '@blueprintjs/core'

export class SellerProductsComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: []
    }
    this.createArray = this.createArray.bind(this);
  }

  componentDidMount(){
    const products = this.createArray(this.props.products);
    this.setState({items: products});
  }

  createArray(products){
    const productList = []
    let key = 7000
    products.forEach(element => {
      let e = <ProductBoxSell key={key}/>
      productList.push(e);
      key = key + 1;
    });
    return productList;
  }

	render() {
    return (
      <div>
        <div className='results-title'>Mis Productos</div>
        {this.state.items.length === 0 ? 
        <div className='no-results-nis'>
          <NonIdealState icon='shop' title='¡No hay productos en tu tienda!'/>
        </div>
        :
        <div className='product-boxes'>{this.state.items}</div>
        }
      </div>
		);
	}
}

export default SellerProductsComponent