import React from 'react'
import '../styles/Details.css'
import { DatePicker, TimePrecision } from "@blueprintjs/datetime";

export class TakeAwayDetails extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      stringDate: '',
      isValidDate: true
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
  }
   
  componentDidMount(){
    //TODO - traer del back horarios etc.
  }

  handleDateChange(date){
    this.setState({date: date})
    if(this.isValidDate()){
      //parse date y setearla en string
      this.setState({isValidDate: true})
    } else {
      this.setState({isValidDate: false})
    }
    
  }

  //TODO - String con formato "yyyyMMdd:HHmmss"
  componentDidUpdate(){
    console.log(this.state.date)
    // TODO - enviar al padre la fecha string
  }

  // TODO - verificar que sea valido segun los horarios del comercio
  isValidDate(){
    return true
  }

  render(){
    const today = new Date();
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 10)
    return(
      <div className='detail-container'>
        <p>Elija día y hora para pasar por el comercio:</p>
        <div className='calendar'>
          <DatePicker minDate={today} 
                      maxDate={maxDate}
                      timePrecision={TimePrecision.MINUTE}
                      value={this.state.date}
                      onChange={this.handleDateChange}>
          </DatePicker>
        </div>
        {!this.state.isValidDate && <p>No es una fecha/hora hábil</p>}
      </div>
    )
  }

}

export default TakeAwayDetails;