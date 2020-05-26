import React from 'react'
import BuyerForm from '../components/BuyerForm'
import SellerForm from '../components/SellerForm'
import { withRouter } from "react-router-dom";
import { RadioGroup, Radio, Button } from '@blueprintjs/core'
import '../styles/RegisterScreen.css'

class RegisterScreen extends React.Component {

  constructor(){
    super();
    this.state={
      form: 'buyer',
      buyerInfo: {},
      sellerInfo: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleRadio(event){
    //vaciar la info del que se va a ocultar
    this.setState({form: event.target.value});
  }

  render(){
    return (        
      <div>
        <div className="register-container">
        <p className="register-title">Bienvenido a Comprando en Casa</p>
        <p className="register-sub">¿Cómo quiere registrarse?</p>
        <RadioGroup
          className="radio"
          inline={true}
          onChange={this.handleRadio}
          selectedValue={this.state.form}>
          <Radio label='Comprador' value='buyer' large={true}/>
          <Radio label='Vendedor' value='seller' large={true}/>
        </RadioGroup>
        {this.state.form === 'buyer' ? 
          <div className="buyer-form" ><BuyerForm/></div>
          : <div className="seller-form"><SellerForm /></div>}
        <div className="buttons">
          <Button className="register-btn" intent="success">Registarse</Button>
          <Button intent="danger">Volver</Button>
        </div>
       </div>
      </div>      
    )
  }

}

export default withRouter(RegisterScreen)