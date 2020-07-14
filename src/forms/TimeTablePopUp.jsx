import React from 'react'
import '../styles/TimeTablePopUp.css'
import { Dialog, Button, Alert } from '@blueprintjs/core';
import TickDate from '../components/TickDate';
import { injectIntl, FormattedMessage } from 'react-intl'

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
      sunday: {},
      alert: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.save = this.save.bind(this);
    this.isValidTimeTable = this.isValidTimeTable.bind(this);
    this.isValidDay = this.isValidDay.bind(this);
    this.zipTimetable = this.zipTimetable.bind(this);
  }

  handleClose(){
    this.props.closeModal()
  }

  handleDay(day, info){
    this.setState({[day]: info});
  }

  save(){
    if(this.isValidTimeTable()){
      const timeTable = this.zipTimetable();
      this.props.sendTimeTable(timeTable);
      this.handleClose();
    } else {
      this.setState({alert: true})
    }
  }

  isValidTimeTable(){
    return (
      this.isValidDay('monday') &&
      this.isValidDay('tuesday') &&
      this.isValidDay('wednesday') &&
      this.isValidDay('thursday') &&
      this.isValidDay('friday') &&
      this.isValidDay('saturday') &&
      this.isValidDay('sunday') 
    )
  }

  isValidDay(dayName){
    const day = this.state[dayName]
    if(day.open){
      let f = parseInt(day.from)
      let t = parseInt(day.to)
      return (
        f !== '' && t !== '' && 
        f < 24 && f >= 0 && t < 24 && t >= 0
      )
    } else {
      return true
    }
  }

  zipTimetable(){
    const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    const zipped = []
    let index = 1;
    days.forEach((d) =>{
      let day = this.state[d];
      if(day.open){
        let dayTO = {
          dayOfWeek: index,
          timeRanges: [day.from,day.to]
        }
        zipped.push(dayTO);
      }
      index = index + 1;
    })
    return zipped;
  }

	render() {
    const { intl } = this.props;
    return (
      <div>
        <Dialog 
          isOpen={this.props.isOpen} 
          onClose={this.handleClose}
          title={intl.formatMessage({id:'register.tt.title'})}>
          <TickDate dia={intl.formatMessage({id:'t.monday'})} value="monday" updateTT={this.handleDay}/>
          <TickDate dia={intl.formatMessage({id:'t.tuesday'})} value="tuesday" updateTT={this.handleDay}/>
          <TickDate dia={intl.formatMessage({id:'t.wednesday'})} value="wednesday" updateTT={this.handleDay}/>
          <TickDate dia={intl.formatMessage({id:'t.thursday'})} value="thursday" updateTT={this.handleDay}/>
          <TickDate dia={intl.formatMessage({id:'t.friday'})} value="friday" updateTT={this.handleDay}/>
          <TickDate dia={intl.formatMessage({id:'t.saturday'})} value="saturday" updateTT={this.handleDay}/>
          <TickDate dia={intl.formatMessage({id:'t.sunday'})} value="sunday" updateTT={this.handleDay}/>
          <Button className="h-btn" intent='success' onClick={this.save}>
            <FormattedMessage id='register.tt.savett'/>
          </Button>
        </Dialog>
        <Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
          <FormattedMessage id='register.tt.invalid'/>
        </Alert>
      </div>
		);
	}
}

export default injectIntl(TimeTablePopUp)