import React from 'react'
import { withRouter } from "react-router-dom";
import '../styles/LogInScreen.css'

class RegisterScreen extends React.Component {

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    return (        
      <div>
        <p>Registrarse</p>
      </div>      
    )
  }

}

export default withRouter(RegisterScreen)