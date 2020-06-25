import React from 'react'
import ProductBoxSell from './ProductBoxSell'
import {NonIdealState} from '@blueprintjs/core'
import { injectIntl, FormattedMessage } from 'react-intl'

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
      let e = <ProductBoxSell key={key} info={element} shopId={this.props.shopId}/>
      productList.push(e);
      key = key + 1;
    });
    return productList;
  }

	render() {
    const { intl } = this.props;
    return (
      <div>
        <div className='results-title'><FormattedMessage id='navbar.myproducts'/></div>
        {this.state.items.length === 0 ? 
        <div className='no-results-nis'>
          <NonIdealState icon='shop' title={intl.formatMessage({id:'seller.noprod'})}/>
        </div>
        :
        <div className='product-boxes' style={{textAlign: 'center'}}>
          {this.state.items}
        </div>
        }
      </div>
		);
	}
}

export default injectIntl(SellerProductsComponent)