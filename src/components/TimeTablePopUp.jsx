import React from 'react'
import '../styles/TimeTablePopUp.css'
import { Dialog, Button } from '@blueprintjs/core';
import TickDate from './TickDate';

export class TimeTablePopUp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.save = this.save();
  }

  handleClose(){
    this.props.closeModal()
  }

  handleDay(day, info){
    this.setState({[day]: info});
  }

  save(){
    // TODO 
  }

	render() {
    return (
      <div>
        <Dialog 
          isOpen={this.props.isOpen} 
          onClose={this.handleClose}
          title="Días y horarios de atención">
          <TickDate dia="Lunes" value="monday" updateTT={this.handleDay}/>
          <TickDate dia="Martes" value="tuesday" updateTT={this.handleDay}/>
          <TickDate dia="Miércoles" value="wednesday" updateTT={this.handleDay}/>
          <TickDate dia="Jueves" value="thursday" updateTT={this.handleDay}/>
          <TickDate dia="Viernes" value="friday" updateTT={this.handleDay}/>
          <TickDate dia="Sabado" value="saturday" updateTT={this.handleDay}/>
          <TickDate dia="Domingo" value="sunday" updateTT={this.handleDay}/>
          <Button className="h-btn" intent='success' onClick={this.save}>Guardar Horarios</Button>
        </Dialog>
      </div>
		);
	}
}

export default TimeTablePopUp