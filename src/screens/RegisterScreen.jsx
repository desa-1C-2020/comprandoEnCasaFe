import React from 'react'
import BuyerForm from '../forms/BuyerForm'
import SellerForm from '../forms/SellerForm'
import { registerBuyer, registerSeller } from '../services/UserService'
import { withRouter } from "react-router-dom";
import { RadioGroup, Radio, Button, Alert, Spinner } from '@blueprintjs/core'
import '../styles/RegisterScreen.css'
import { injectIntl, FormattedMessage } from 'react-intl';

class RegisterScreen extends React.Component {

  constructor(){
    super();
    this.state={
      form: 'buyer',
      buyerInfo: {},
      sellerInfo: {},
      alertSuccess: false,
      alertField: false,
      errorMsg: "",
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setBuyerInfo = this.setBuyerInfo.bind(this);
    this.setSellerInfo = this.setSellerInfo.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.registerBuyer = this.registerBuyer.bind(this);
    this.isValidBuyer = this.isValidBuyer.bind(this);
    this.registerSeller = this.registerSeller.bind(this);
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
      this.registerSeller();
    }
  }

  registerBuyer(){
    if(this.isValidBuyer()){
      this.setState({isLoading: true});
      registerBuyer(this.state.buyerInfo, (err, _res) =>{
        if(err){
          this.setState({
            errorMsg: <FormattedMessage id='t.error'/>,
            alertField: true,
            isLoading: false
          })
        } else {
          this.setState({alertSuccess: true, isLoading: false})
        }
      })
    } else {
      this.setState({
        errorMsg: <FormattedMessage id='t.fillfields'/>,
        alertField: true
      })
    }
  }

  registerSeller(){
    if(this.isValidSeller()){
      this.setState({isLoading: true});
      registerSeller(this.state.sellerInfo, (err, _res) =>{
        if(err){
          this.setState({
            errorMsg: <FormattedMessage id='t.error'/>,
            alertField: true,
            isLoading: false
          })
        } else {
          this.setState({alertSuccess: true, isLoading: false})
        }
      })
    } else {
      this.setState({
        errorMsg: <FormattedMessage id='t.fillfields'/>,
        alertField: true
      })
    }
  }

  isValidBuyer(){
    const buyer = this.state.buyerInfo;
    return (buyer.name !== undefined && buyer.name !== '' && 
            buyer.surname !== '' && buyer.email !== '' && 
            buyer.password !== '' && buyer.address.street !== '' && 
            buyer.address.latitud !== '' && buyer.address.longitud !== '')
  }

  isValidSeller(){
    const seller = this.state.sellerInfo
    return (
      seller !== undefined && seller.user.name !== '' &&
      seller.user.surname !== '' && seller.user.email !== '' &&
      seller.user.password !== '' && seller.commerceName !== '' &&
      seller.commerceBussinessSector !== '' && seller.commerceAddress.street !== '' &&
      seller.commerceAddress.latitud !== '' && seller.commerceAddress.longitud !== '' &&
      seller.arrivalRange !== '' 
    )
  }

  render(){
    const { intl } = this.props;
    return (        
      <div>
        <div className="register-container">
        <p className="register-title">
          <FormattedMessage id='register.title'/>
        </p>
        <p className="register-sub">
          <FormattedMessage id='register.subtitle'/>
        </p>
        <RadioGroup
          className="radio"
          inline={true}
          onChange={this.handleRadio}
          selectedValue={this.state.form}>
          <Radio label={intl.formatMessage({id:'t.buyer'})} value='buyer' large={true}/>
          <Radio label={intl.formatMessage({id:'t.seller'})} value='seller' large={true}/>
        </RadioGroup>
        {this.state.form === 'buyer' ? 
          <div className="buyer-form" ><BuyerForm update={this.setBuyerInfo}/></div>
          : <div className="seller-form"><SellerForm update={this.setSellerInfo}/></div>}
        <div className="buttons">
          <Button className="register-btn" intent="success" onClick={this.handleRegister}>
            <FormattedMessage id='t.register'/>
          </Button>
          <Button intent="danger" onClick={this.goBack}>
            <FormattedMessage id='t.goback'/>
          </Button>
        </div>
        </div>
        <Alert isOpen={this.state.alertSuccess} confirmButtonText={<FormattedMessage id='t.accept'/>} 
              intent='success' onClose={this.goBack}>    
          <FormattedMessage id='register.success'/>
        </Alert>
        <Alert isOpen={this.state.alertField} confirmButtonText={<FormattedMessage id='t.accept'/>} 
                intent='danger' onClose={() => this.setState({alertField: false})}>    
         {this.state.errorMsg}
        </Alert>
        {this.state.isLoading &&
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>   
          <Spinner size='100' intent='primary'/>
        </div>
        }
      </div>      
    )
  }

}

export default injectIntl(withRouter(RegisterScreen))