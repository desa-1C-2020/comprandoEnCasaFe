import React from 'react'
import logo from '../CEC.png'
import { login } from '../services/UserService'
import { InputGroup, Button, Alert, Spinner } from '@blueprintjs/core'
import { withRouter } from "react-router-dom";
import '../styles/LogInScreen.css';
import { injectIntl, FormattedMessage } from 'react-intl';

class LogInScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      user: '',
      pass: '',
      alert: false,
      msg: '',
      isLoading: false
    }
    this.logIn = this.logIn.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goRegister = this.goRegister.bind(this);
  }

  logIn(){
    if(this.isValid()){
      const info = {email: this.state.user, password: this.state.pass}
      this.setState({isLoading: true})
      login(info, (err, res) =>{
        if(err){
          this.setState({
            alert: true, 
            msg: <FormattedMessage id='login.error.msg'/>,
            isLoading: false
          })
        } else {
          this.props.history.push('/home', {account: res.type, accountInfo: res.info});
        }
      })
    } else {
      const msgError = this.state.user === '' ? 
          <FormattedMessage id='login.error.username'/> 
        : <FormattedMessage id='login.error.password'/>
      this.setState({alert: true, msg: msgError});
    }
  }

  goRegister(){
    this.props.history.push('/register');
  }

  isValid(){
    return this.state.user !== '' && this.state.pass !== ''
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    const { intl } = this.props;
    return (        
      <div>
        <Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
               icon={this.state.icon}
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              {this.state.msg}
        </Alert>
        <span>
          <img className="logo-login" alt="Comprando en casa" src={logo} />
          <div className="login-container">
            <p className="title">{intl.formatMessage({id:'login.title'})}</p>
            <div className="input-container">
              <InputGroup className="input" 
                          name="user"
                          value={this.state.user}
                          type="text" 
                          onChange={this.handleChange}
                          placeholder={intl.formatMessage({id:'t.mail'})}/>
              <InputGroup className="input"
                          name="pass" 
                          value={this.state.pass}
                          type="password" 
                          onChange={this.handleChange}
                          placeholder={intl.formatMessage({id:'t.password'})}/>
            </div>
            <Button className="button" onClick={this.logIn}>
              <FormattedMessage id='login.btn.login'/>
            </Button>
            <p className="register-text">
              <FormattedMessage id='login.new'/>
              <span className="register" onClick={this.goRegister}> 
                <FormattedMessage id='t.register'/>
              </span>
            </p>
          </div>
        </span>
        {this.state.isLoading &&
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>   
          <Spinner size='100' intent='primary'/>
        </div>
        }
      </div>      
    )
  }

}

export default injectIntl(withRouter(LogInScreen))