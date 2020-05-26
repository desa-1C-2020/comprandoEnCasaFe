import React from 'react'
import '../styles/SellerForm.css'
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
        <p className="ddc">Datos del comercio</p>
        <span className="shop">
          <InputGroup className="field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      placeholder="Nombre"
          />
          <InputGroup className="field" 
                      type="text" 
                      name="sector"
                      value={this.state.sector}
                      onChange={this.handleChange} 
                      placeholder="Rubro"
          />
        </span>
        <p>Dirección del comercio</p>
        <span className="address">
          <InputGroup className="field" 
                      type="text" 
                      name="address"
                      value={this.state.address}
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
        <p>Formas de pago</p>
        <span className="payments">
          <Checkbox className="check"
                    checked={this.state.money}
                    onChange={() => this.setState({money: !this.state.money})}>
                    Efectivo
          </Checkbox>
          <Checkbox className="check"
                    checked={this.state.debit}
                    onChange={() => this.setState({debit: !this.state.debit})}>
                    Tarjetas de débito
          </Checkbox>
          <Checkbox className="check"
                    checked={this.state.credit}
                    onChange={() => this.setState({credit: !this.state.credit})}>
                    Tarjetas de crédito
          </Checkbox>
        </span>
        <div className="seller-btn">
          <Button>Personalizar horarios</Button>
        </div>
        <p className="d-max">Distancia máxima de entregas (en metros)</p>
        <span className="range">
          <InputGroup className="field" 
                      type="number" 
                      name="radio"
                      value={this.state.radio}
                      onChange={this.handleChange} 
                      placeholder="Ej: 2000"
          />
        </span>
      </div>
		);
	}
}

export default SellerForm