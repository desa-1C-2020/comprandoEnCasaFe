import React from 'react'
import logo from '../CEC.png'
import { InputGroup, Button } from '@blueprintjs/core'
import '../styles/LogInScreen.css'

class LogInScreen extends React.Component {

  render(){
    return (        
      <div>
        <span>
          <img className="logo-login" alt="Comprando en casa" src={logo} />
          <div className="login-container">
            <p className="title">Ingrese para continuar</p>
            <div className="input-container">
              <InputGroup className="input" type="text" placeholder="Usuario"/>
              <InputGroup className="input" type="password" placeholder="Contraseña"/>
            </div>
            <Button className="button">Ingresar</Button>
            <p className="register-text">¿Nuevo en la aplicación? <span className="register">Registrate</span></p>
          </div>
        </span>
      </div>      
    )
  }

}

export default LogInScreen