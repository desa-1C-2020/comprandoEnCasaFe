import React from 'react'
import '../styles/TimeTablePopUp.css'
import { Dialog, Checkbox, InputGroup, Button } from '@blueprintjs/core';

export class TimeTablePopUp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      monday: {
        open: false,
        from: '',
        to: ''
      }
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
    this.props.closeModal()
  }

	render() {
    return (
      <div>
        <Dialog 
          isOpen={this.props.isOpen} 
          onClose={this.handleClose}
          title="Días y horarios de atención">
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Lunes: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Martes: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Miércoles: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Jueves: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Viernes: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Sábado: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <div className="day-container">
            <Checkbox className="day-check" large={true}>
            </Checkbox>
            <div className="hours">
              <span className="h-text">Domingo: De</span>
              <InputGroup className="time" type="text"/>
              <span className="h-text">Hs. a</span>
              <InputGroup className="time" type="text"/> 
              <span className="h-text">Hs.</span>
            </div>
          </div>
          <Button className="h-btn" intent='success'>Guardar Horarios</Button>
        </Dialog>
      </div>
		);
	}
}

export default TimeTablePopUp