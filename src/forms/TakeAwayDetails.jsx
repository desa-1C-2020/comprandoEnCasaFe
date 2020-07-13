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
    this.formatDate = this.formatDate.bind(this);
    this.addZeroes = this.addZeroes.bind(this);
  }
   
  componentDidMount(){
    //TODO - traer del back horarios etc.
  }

  handleDateChange(date){
    if(this.isValidDate(date)){
      let strDate = this.formatDate(date);
      this.props.updateDate(strDate);
      this.setState({date: date, isValidDate: true, stringDate: strDate});
    } else {
      this.setState({date: date, isValidDate: false});
    }
  }

  // TODO - verificar que sea valido segun los horarios del comercio
  isValidDate(){
    return true
  }

  formatDate(date){
    let d = new Date(date);
    const year = d.getFullYear();
    const month = this.addZeroes(d.getMonth().toString());
    const day = this.addZeroes(d.getDate().toString());
    const hour = this.addZeroes(d.getHours().toString());
    const minute = this.addZeroes(d.getMinutes().toString());
    const second = '00'
    return(`${year}${month}${day}:${hour}${minute}${second}`)
  }

  addZeroes(string){
    let newString = string;
    if(string.length === 1){
      newString = '0' + string;
    }
    return newString
  }

  // TODO - traducciones y estilos
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