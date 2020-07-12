import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Collapse } from '@blueprintjs/core'
import FormattedCurrency from './FormattedCurrency'
import '../styles/PurchaseHistory.css'

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
    let key = 13500
    shops.forEach((s)=> {
      s.products.forEach((p)=>{
        let detail = 
          <p key={key}>
            [{s.name}] {p.productName} x{p.productAmmount}: <b>          
            <FormattedCurrency value={p.productAmmount * p.productPrice}/></b>
          </p>
        key = key + 1;
        details.push(detail);
      })
    })
    return details;
  }

  render(){
    return(
      <div className='ph-container'>
        <p className='ph-title'>
          {this.state.title} {' - '} <FormattedMessage id='cart.total'/> <b>
            <FormattedCurrency value={this.state.total}/> </b>
          <Button className='ph-btn' onClick={this.handleCollapse}>
            <FormattedMessage id={this.state.btnText}/>
          </Button>
        </p>
        <span className='ph-detail'>
          <Collapse className='ph-collapse' isOpen={this.state.collapse}>
            {this.state.details}
          </Collapse>
        </span>
      </div>
    )
  }

}

export default PurchaseHistory