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
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount(){
    this.props.updateTT(this.props.value, this.state);
  }

  updateInfo(event, attr){
    this.setState({[attr]: event.target.value});
    this.props.updateTT(this.props.value, this.state);
  }

  updateCheck(){
    this.setState({open: !this.state.open});
    this.props.updateTT(this.props.value, this.state);
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
                      onChange={(e) => this.updateInfo(e, "from")}/>
          <span className="h-text">Hs. a</span>
          <InputGroup className="time"
                      type="text"
                      value={this.state.to}
                      onChange={(e) => this.updateInfo(e, "to")}/> 
          <span className="h-text">Hs.</span>
        </div>
      </div>
    )
  }

}

export default TickDate