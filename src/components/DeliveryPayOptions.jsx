import React from 'react'
import '../styles/DeliveryPayOptions.css'
import { FormattedMessage } from 'react-intl'
import {Divider, RadioGroup, Radio} from '@blueprintjs/core'
import FormattedCurrency from '../components/FormattedCurrency'

export class DeliveryPayOptions extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      payment: 'money',
      deliver: 'takeaway',
      total: 0,
    }
    this.handleDelivery = this.handleDelivery.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  componentDidMount(){
    const newTotal = this.calculateTotal();
    this.setState({total: newTotal})
  }

  handleDelivery(e){
    this.setState({deliver: e.target.value})
  }

  handlePayment(e){
    this.setState({payment: e.target.value})
  }

  componentDidUpdate(){
    const info = {
      shopId: this.props.info.buyList[0].product.commerceId,
      payment: this.state.payment,
      deliver: this.state.deliver 
    }
    this.props.updateInfo(info);
  }

  calculateTotal(){
    let total = 0;
    const items = this.props.info.buyList;
    items.forEach((item) =>{
      total = total + (item.ammount * item.product.price);
    })
    return total;
  }

  render(){
    const item = this.props.info.buyList[0].product
    return(
      <div className='dpo-container'>
        <p className='dpo-title'>
          <b>{item.commerceName.toUpperCase()}</b>
        </p>
        <Divider vertical='true'/>
        <div>  
          <RadioGroup label={<span>
            <FormattedMessage id='cart.del'/>
            {' - '}
            ({item.distance} <FormattedMessage id='shopsearch.meters'/>)
            </span> }
            onChange={this.handleDelivery}
            selectedValue={this.state.deliver}
            inline='true'>
            <Radio label="Take Away" value="takeaway" />
            <Radio label="Delivery" value="delivery" />
          </RadioGroup>
        </div>
        <Divider vertical='true'/>
        <div>
        <RadioGroup label={<span>
            <FormattedMessage id='cart.total'/>
            <FormattedCurrency value={this.state.total}/>
            </span> }
            onChange={this.handlePayment}
            selectedValue={this.state.payment}
            inline='true'>
            <Radio label={<FormattedMessage id='cart.money'/>} value="money" />
            <Radio label={<FormattedMessage id='cart.debit'/>} value="debit" />
            <Radio label={<FormattedMessage id='cart.credit'/>} value="credit" />
        </RadioGroup>
        </div>
      </div>
    )
  }

}

export default DeliveryPayOptions;