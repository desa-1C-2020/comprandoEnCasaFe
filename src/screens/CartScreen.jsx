import React from 'react'
///import {NonIdealState} from '@blueprintjs/core'
import { injectIntl, FormattedMessage } from 'react-intl'

export class CartScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: []
    }
    this.createArray = this.createArray.bind(this);
  }

  componentDidMount(){
    const products = this.createArray();
    this.setState({items: products});
  }

  createArray(){
    const shoppingList = localStorage.getItem('usercart');
    if(shoppingList === null) return [];
    const shoppings = Array.from(JSON.parse(localStorage.getItem('usercart')).cart);
    const productList = [];
    let key = 8000;
    shoppings.forEach(element => {
      //TODO - componente
    let e = <p key={key} >{element.product.commerceName} y {element.ammount}</p>
      productList.push(e);
      key = key + 1;
    })
    return productList;
  }

	render() {
  //  const { intl } = this.props;
    return (
      // <div>
      //   <div className='results-title'><FormattedMessage id='navbar.myproducts'/></div>
      //   {this.state.items.length === 0 ? 
      //   <div className='no-results-nis'>
      //     caaart
      //     {/* <NonIdealState icon='shop' title={intl.formatMessage({id:'seller.noprod'})}/> */}
      //   </div>
      //   :
      //   <div className='product-boxes' style={{textAlign: 'center'}}>
      //     caaaart
      //   </div>
      //   }
      // </div>
      <div>
        <FormattedMessage id='navbar.myshopping'/>
        <p>hola</p>
        {this.state.items}
      </div>
		);
	}
}

export default injectIntl(CartScreen)