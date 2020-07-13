import React from 'react'
import '../styles/DeliveryPayOptions.css'
import { FormattedMessage } from 'react-intl'
import FormattedCurrency from '../components/FormattedCurrency'

export class DeliveryPayOptions extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      total: 0,
    }
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount(){
    const newTotal = this.calculateTotal();
    this.setState({total: newTotal})
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
        <span>
          <FormattedMessage id='cart.del'/>
          {item.distance / 1000} KM
        </span> <br></br>
        <span>
          <FormattedMessage id='cart.quant'/> {this.props.info.buyList.length}
        </span> <br></br>
        <span>
          <FormattedMessage id='cart.total'/>
          <FormattedCurrency value={this.state.total}/>
        </span>
      </div>
    )
  }

}

export default DeliveryPayOptions;