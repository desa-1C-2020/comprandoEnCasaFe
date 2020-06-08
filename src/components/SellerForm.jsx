import React from 'react'
import '../styles/SellerForm.css'
import { InputGroup, Button, Checkbox } from '@blueprintjs/core'
import TimeTablePopUp from './TimeTablePopUp'

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
      credit: false,
      schedule: [],
      timeTable: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateParent = this.updateParent.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  updateParent(){
    this.props.update({
      commerceName: this.state.name,
      commerceBussinessSector: this.state.sector,
      commerceAddress: {
        street: this.state.address,
        latitud: this.state.lat,
        longitud: this.state.lng
      },
      paymentMethods: [
        {money: this.state.money},
        {credit: this.state.credit},
        {debit: this.state.debit}
      ],
      daysAndHoursOpen: this.state.schedule,
      arrivalRange: this.state.radio
    })
  }

  addSchedule(sched){
    this.setState({schedule: sched});
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
                      onBlur={this.updateParent}
                      placeholder="Nombre"
          />
          <InputGroup className="field" 
                      type="text" 
                      name="sector"
                      value={this.state.sector}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
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
                      onBlur={this.updateParent}
                      placeholder="Dirección"
          />
          <InputGroup className="field" 
                      type="text" 
                      name="lat"
                      value={this.state.lat}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Latitud"
          />
          <InputGroup className="field" 
                      type="text" 
                      name="lng"
                      value={this.state.lng}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Longitud"
          />
        </span>
        <p>Formas de pago</p>
        <span className="payments">
          <Checkbox className="check"
                    checked={this.state.money}
                    onBlur={this.updateParent}
                    onChange={() => this.setState({money: !this.state.money})}>
                    Efectivo
          </Checkbox>
          <Checkbox className="check"
                    checked={this.state.debit}
                    onBlur={this.updateParent}
                    onChange={() => this.setState({debit: !this.state.debit})}>
                    Tarjetas de débito
          </Checkbox>
          <Checkbox className="check"
                    checked={this.state.credit}
                    onBlur={this.updateParent}
                    onChange={() => this.setState({credit: !this.state.credit})}>
                    Tarjetas de crédito
          </Checkbox>
        </span>
        <div className="seller-btn">
          <Button onClick={() => this.setState({timeTable: true})}>Personalizar horarios</Button>
        </div>
        <p className="d-max">Distancia máxima de entregas (en metros)</p>
        <span className="range">
          <InputGroup className="field" 
                      type="number" 
                      name="radio"
                      value={this.state.radio}
                      onBlur={this.updateParent}
                      onChange={this.handleChange} 
                      placeholder="Ej: 2000"
          />
        </span>
        <TimeTablePopUp isOpen={this.state.timeTable} 
                        closeModal={() => this.setState({timeTable: false})}
                        sendTimeTable={this.addSchedule}/>
      </div>
		);
	}
}

export default SellerForm