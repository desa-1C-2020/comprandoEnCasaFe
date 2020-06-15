import React from 'react'
import ProductBoxBuy from './ProductBoxBuy'
import {NonIdealState} from '@blueprintjs/core'
import '../styles/ProductComponent.css'

export class ProductComponent extends React.Component {

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
    let key = 1000
    products.forEach(element => {
      let e = <ProductBoxBuy key={key} info={element}/>
      productList.push(e);
      key = key + 1;
    });
    return productList;
  }

	render() {
    return (
      <div>
        <div className='results-title'>Resultados de Búsqueda</div>
        {this.state.items.length === 0 ? 
        <div className='no-results-nis'>
          <NonIdealState icon='search' title='¡No se han encontrado resultados!'/>
        </div>
        :
        <div className='product-boxes'>{this.state.items}</div>
        }
      </div>
		);
	}
}

export default ProductComponent