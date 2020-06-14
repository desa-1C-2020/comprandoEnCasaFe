import React from 'react'
import ProductBoxBuy from './ProductBoxBuy';

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
    //TODO- contemplar cuando no hay resultados
    //Mejorar estilos
    return (
      <div>
        <h1>Resultados de Búsqueda</h1>
        <div>{this.state.items}</div>
      </div>
		);
	}
}

export default ProductComponent