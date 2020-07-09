import React from 'react'
import '../styles/PurchaseHistory.css'
import { FormattedMessage } from 'react-intl'
import { Button, Collapse } from '@blueprintjs/core'

export class Sale extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: '',
      btnText: 'seller.show',
      collapse: false,
      details: []
    }
    this.generateTitle = this.generateTitle.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.generateDetails = this.generateDetails.bind(this);
  }

  componentDidMount(){
    const title = this.generateTitle();
    const details = this.generateDetails();
    this.setState({title: title, details: details})
  }

  generateTitle(){
    let title = <span>
      <p><FormattedMessage id='t.buyer'/>: <b>{this.props.info.name}</b></p>
      <p><FormattedMessage id='seller.pay'/>: <b><FormattedMessage id={`cart.${this.props.info.options.payment}`}/></b></p>
      <p><FormattedMessage id='seller.del'/>: <b>{this.props.info.options.deliver.toUpperCase()}</b></p>
    </span>
    return title;
  }

  handleCollapse(){
    const newValue = !this.state.collapse;
    const newText = this.state.btnText === 'seller.show' ? 'seller.hide' : 'seller.show';
    this.setState({collapse: newValue, btnText: newText});
  }

  generateDetails(){
    const details = [];
    const products = this.props.info.products;
    let key = 14500
    products.forEach((p)=> {
      let detail = 
        <p key={key}>
          {p.productName} x{p.productAmmount}
        </p>
      key = key + 1;
      details.push(detail);
     })
     return details;
  }

  render(){
    return(
      <div className='ph-container' style={{backgroundColor: '#B3F57B', border: 'solid #78F70C'}}>
        <span className='ph-title' style={{fontSize: '15px'}}>
          {this.state.title}
        </span>
        <Button className='ph-btn2' onClick={this.handleCollapse}>
          <FormattedMessage id={this.state.btnText}/>
        </Button>
        <span className='ph-detail'>
          <Collapse className='ph-collapse' isOpen={this.state.collapse}>
            {this.state.details}
          </Collapse>
        </span>
      </div>
    )
  }
}

export default Sale;