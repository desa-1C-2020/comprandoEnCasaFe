import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Collapse } from '@blueprintjs/core'

export class PurchaseHistory extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      total: '',
      btnText: 'ph.more',
      collapse: false,
      details: []
    }
    this.generateTitle = this.generateTitle.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.generateDetails = this.generateDetails.bind(this);
  }

  componentDidMount(){
    const title = this.generateTitle();
    const total = this.calculateTotal();
    const details = this.generateDetails();
    this.setState({title: title, total: total, details: details})
  }

  generateTitle(){
    const shops = this.props.info.shops;
    let title = '';
    shops.forEach((s) => {
      title = title + ` [${s.name}] `
    })
    return title;
  }

  handleCollapse(){
    const newValue = !this.state.collapse;
    const newText = this.state.btnText === 'ph.more' ? 'ph.less' : 'ph.more';
    this.setState({collapse: newValue, btnText: newText});
  }

  calculateTotal(){
    let total = 0;
    const shops = this.props.info.shops;
    shops.forEach((s)=> {
      s.products.forEach((p)=>{
        total = total + (p.productPrice * p.productAmmount)
      })
    })
    return total;
  }

  generateDetails(){
    const details = [];
    const shops = this.props.info.shops;
    shops.forEach((s)=> {
      s.products.forEach((p)=>{
        let detail = <p>[{s.name}] {p.productName} x{p.productAmmount}: ${p.productAmmount * p.productPrice}</p>
        details.push(detail);
      })
    })
    return details;
  }

  render(){
    return(
      <div>
        <p>{this.state.title} {' - '} <FormattedMessage id='cart.total'/> ${this.state.total}</p>
        <Button onClick={this.handleCollapse}>
          <FormattedMessage id={this.state.btnText}/>
        </Button>
        <Collapse isOpen={this.state.collapse}>
          {this.state.details}
        </Collapse>
      </div>
    )
  }

}

export default PurchaseHistory