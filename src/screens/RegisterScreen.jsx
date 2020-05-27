import React from 'react'
import BuyerForm from '../components/BuyerForm'
import SellerForm from '../components/SellerForm'
import { withRouter } from "react-router-dom";
import { RadioGroup, Radio, Button, Alert } from '@blueprintjs/core'
import '../styles/RegisterScreen.css'

class RegisterScreen extends React.Component {

  constructor(){
    super();
    this.state={
      form: 'buyer',
      buyerInfo: {},
      sellerInfo: {},
      alertSuccess: false,
      alertField: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setBuyerInfo = this.setBuyerInfo.bind(this);
    this.setSellerInfo = this.setSellerInfo.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.registerBuyer = this.registerBuyer.bind(this);
    this.isValidBuyer = this.isValidBuyer.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleRadio(event){
    this.setState({form: event.target.value});
  }

  goBack(){
    this.props.history.push('/');
  }

  setBuyerInfo(info){
    this.setState({sellerInfo: {}, buyerInfo: info});
  }

  setSellerInfo(info){
    this.setState({sellerInfo: info, buyerInfo: {}});
  }

  handleRegister(){
    if(this.state.form === 'buyer'){
      this.registerBuyer();
    } else {
      //TODO - request vendedor
      this.setState({alertSuccess: true})
    }
  }

  registerBuyer(){
    if(this.isValidBuyer()){
      //TODO - request comprador
      this.setState({alertSuccess: true})
    } else {
      this.setState({alertField: true})
    }
  }

  isValidBuyer(){
    const buyer = this.state.buyerInfo;
    return (buyer.name !== undefined && buyer.name !== '' && 
            buyer.surname !== '' && buyer.email !== '' && 
            buyer.password !== '' && buyer.address.street !== '' && 
            buyer.address.latitud !== '' && buyer.address.longitud !== '')
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
          <div className="buyer-form" ><BuyerForm update={this.setBuyerInfo}/></div>
          : <div className="seller-form"><SellerForm update={this.setSellerInfo}/></div>}
        <div className="buttons">
          <Button className="register-btn" intent="success" onClick={this.handleRegister}>Registarse</Button>
          <Button intent="danger" onClick={this.goBack}>Volver</Button>
        </div>
        </div>
        <Alert isOpen={this.state.alertSuccess} confirmButtonText='ACEPTAR' intent='success' onClose={this.goBack}>    
          Cuenta creada satisfactoriamente
        </Alert>
        <Alert isOpen={this.state.alertField} confirmButtonText='ACEPTAR' intent='danger' 
               onClose={() => this.setState({alertField: false})}>    
          Por favor, complete todos los campos
        </Alert>
      </div>      
    )
  }

}

export default withRouter(RegisterScreen)