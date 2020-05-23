import React from 'react'
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
        <p>Datos personales</p>
        <InputGroup className="input" 
                        type="text" 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} 
                        placeholder="Nombre"
            />
        <InputGroup className="input" 
                        type="text" 
                        name="surname"
                        value={this.state.surname}
                        onChange={this.handleChange} 
                        placeholder="Apellido"
            />
         <InputGroup className="input" 
                        type="text" 
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} 
                        placeholder="Correo electrónico"
            />
          <p>Datos del domicilio</p>
          <InputGroup className="input" 
                        type="text" 
                        name="street"
                        value={this.state.street}
                        onChange={this.handleChange} 
                        placeholder="Dirección"
            /> 
          <InputGroup className="input" 
                        type="text" 
                        name="lat"
                        value={this.state.lat}
                        onChange={this.handleChange} 
                        placeholder="Latitud"
            /> 
            <InputGroup className="input" 
                        type="text" 
                        name="lng"
                        value={this.state.lng}
                        onChange={this.handleChange} 
                        placeholder="Longitud"
            /> 
      </div>
		);
	}
}

export default BuyerForm