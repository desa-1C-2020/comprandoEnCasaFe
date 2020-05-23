import React from 'react'
import { InputGroup, Button, Checkbox } from '@blueprintjs/core'

export class SellerForm extends React.Component {

  constructor(){
    super();
    this.state = {
      name: '',
      sector: '',
      address: '',
      lat: '',
      lng: '',
      radio: '',
      money: false,
      debit: false,
      credit: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

	render() {
    return (
      <div>
        <p>Datos del comercio</p>
        <InputGroup className="input" 
                        type="text" 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} 
                        placeholder="Nombre"
            />
        <InputGroup className="input" 
                        type="text" 
                        name="sector"
                        value={this.state.sector}
                        onChange={this.handleChange} 
                        placeholder="Rubro"
            />
          <p>Dirección del comercio</p>
        <InputGroup className="input" 
                        type="text" 
                        name="address"
                        value={this.state.address}
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
      <p>Formas de pago</p>
      <Checkbox checked={this.state.money}
                 onChange={() => this.setState({money: !this.state.money})}>
                   Efectivo
      </Checkbox>
      <Checkbox  checked={this.state.debit}
                 onChange={() => this.setState({debit: !this.state.debit})}>
                   Tarjetas de débito
      </Checkbox>
      <Checkbox  checked={this.state.credit}
                 onChange={() => this.setState({credit: !this.state.credit})}>
                  Tarjetas de crédito
      </Checkbox>
      <Button>Personalizar horarios</Button>
      <p>Distancia máxima de entregas (en metros)</p>
      <InputGroup className="input" 
                        type="number" 
                        name="radio"
                        value={this.state.radio}
                        onChange={this.handleChange} 
                        placeholder="Ej: 2000"
            />
      </div>
		);
	}
}

export default SellerForm