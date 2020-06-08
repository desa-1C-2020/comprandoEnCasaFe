import React from 'react'
import '../styles/TickDate.css'
import { Checkbox, InputGroup } from '@blueprintjs/core';

class TickDate extends React.Component {

  constructor(props){
    super(props);
    this.state={
      open: false,
      from: '',
      to: ''
    }
    this.updateCheck = this.updateCheck.bind(this);
    this.updateFrom = this.updateFrom.bind(this);
    this.updateTo = this.updateTo.bind(this);
  }

  componentDidMount(){
    this.props.updateTT(this.props.value, this.state);
  }

  updateCheck(){
    this.setState({open: !this.state.open});
    this.props.updateTT(this.props.value, {
      open: !this.state.open,
      from: this.state.from,
      to: this.state.to
    });
  }

  updateFrom(event){
    this.setState({from: event.target.value});
    this.props.updateTT(this.props.value, {
      open: this.state.open,
      from: event.target.value,
      to: this.state.to
    });
  }

  updateTo(event){
    this.setState({to: event.target.value});
    this.props.updateTT(this.props.value, {
      open: this.state.open,
      from: this.state.from,
      to: event.target.value
    });
  }

  render(){
    return (        
      <div className="day-container">
        <Checkbox className="day-check" 
                  large={true} 
                  checked={this.state.open}
                  onChange={this.updateCheck}>
        </Checkbox>
        <div className="hours">
          <span className="h-text">
            <span className="day-name">{this.props.dia}:</span> De
          </span>
          <InputGroup className="time"
                      type="text"
                      value={this.state.from}
                      onChange={this.updateFrom}/>
          <span className="h-text">Hs. a</span>
          <InputGroup className="time"
                      type="text"
                      value={this.state.to}
                      onChange={this.updateTo}/> 
          <span className="h-text">Hs.</span>
        </div>
      </div>
    )
  }

}

export default TickDate