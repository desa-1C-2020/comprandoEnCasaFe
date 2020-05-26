import React from 'react'
import '../styles/BuyerForm.css'
import { InputGroup } from '@blueprintjs/core'

export class BuyerForm extends React.Component {

  constructor(){
    super();
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      street: '',
      lat: '',
      lng: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
    //update parent
    /* 
    data = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      address: {
        street: this.state.street,
        latitud: this.state, lat,
        longitud: this.state.lng
      }
      
    }
    
    */
  }

	render() {
    return (
      <div>
        <p className="dp">Datos personales</p>
        <span className="personal-buyer">
          <InputGroup className="field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      placeholder="Nombre"
          />
          <InputGroup className="field" 
                      type="text" 
                      name="surname"
                      value={this.state.surname}
                      onChange={this.handleChange} 
                      placeholder="Apellido"
            />
        </span>
        <span className="personal-buyer">
          <InputGroup className="field" 
                      type="text" 
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange} 
                      placeholder="Correo electrónico"
          />
          <InputGroup className="field"
                      type="password" 
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange} 
                      placeholder="Contraseña"
          />
        </span>
        <p className="dd">Datos del domicilio</p>
        <span className="address-buyer">
          <InputGroup className="field" 
                      type="text" 
                      name="street"
                      value={this.state.street}
                      onChange={this.handleChange} 
                      placeholder="Dirección"
          /> 
          <InputGroup className="field" 
                      type="text" 
                      name="lat"
                      value={this.state.lat}
                      onChange={this.handleChange} 
                      placeholder="Latitud"
          /> 
          <InputGroup className="field" 
                      type="text" 
                      name="lng"
                      value={this.state.lng}
                      onChange={this.handleChange} 
                      placeholder="Longitud"
          /> 
        </span>
      </div>
		);
	}
}

export default BuyerForm