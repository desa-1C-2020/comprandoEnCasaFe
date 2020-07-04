import React from 'react'
import ProductBoxBuy from '../components/ProductBoxBuy'
import {NonIdealState} from '@blueprintjs/core'
import '../styles/ProductComponent.css'
import { injectIntl, FormattedMessage } from 'react-intl'

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
    const { intl } = this.props;
    return (
      <div>
        <div className='results-title'><FormattedMessage id='shopsearch.restitle'/></div>
        {this.state.items.length === 0 ? 
        <div className='no-results-nis'>
          <NonIdealState icon='search' title={intl.formatMessage({id:'shopsearch.notfound'})}/>
        </div>
        :
        <div className='product-boxes'>{this.state.items}</div>
        }
      </div>
		);
	}
}

export default injectIntl(ProductComponent)