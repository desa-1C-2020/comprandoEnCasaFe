import React from 'react'
import '../styles/SellerForm.css'
import { InputGroup, Button, Checkbox } from '@blueprintjs/core'
import TimeTablePopUp from './TimeTablePopUp'
import { injectIntl, FormattedMessage } from 'react-intl'

export class SellerForm extends React.Component {

  constructor(){
    super();
    this.state = {
      nameSeller: '',
      surnameSeller: '',
      email: '',
      password: '',
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
      user: {
        name: this.state.nameSeller,
        surname: this.state.surnameSeller,
        email: this.state.email,
        password: this.state.password,
        address: {
          street: this.state.address,
          latitud: this.state.lat,
          longitud: this.state.lng
        }
      },
      commerce: {
        userId: '',
        commerceName: this.state.name,
        commerceBusinessSector: this.state.sector,
        commerceAddress: {
          street: this.state.address,
          latitud: this.state.lat,
          longitud: this.state.lng
        },
        paymentMethods: [
          {
            type: "Efectivo",
            accept: "Efectivo"
          }
        ],
        daysAndHoursOpen: this.state.schedule,
        arrivalRange: this.state.radio
      }
    })
  }

  addSchedule(sched){
    this.setState({schedule: sched});
  }

	render() {
    const { intl } = this.props;
    return (
      <div>
        <p><FormattedMessage id='t.sellerdata'/></p>
        <span className="shop">
          <InputGroup className="field" 
                      type="text" 
                      name="nameSeller"
                      value={this.state.nameSeller}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.name'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="surnameSeller"
                      value={this.state.surnameSeller}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.surname'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.mail'})}
          />
          <InputGroup className="field" 
                      type="password" 
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.password'})}
          />
        </span>
        <p className="ddc"><FormattedMessage id='t.commercedata'/></p>
        <span className="shop">
          <InputGroup className="field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.commercename'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="sector"
                      value={this.state.sector}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.sector'})}
          />
          <div className="seller-btn">
            <Button onClick={() => this.setState({timeTable: true})}>
              <FormattedMessage id='register.customtime'/>
            </Button>
          </div>
        </span>
        <span className="address">
          <InputGroup className="field" 
                      type="text" 
                      name="address"
                      value={this.state.address}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.address'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="lat"
                      value={this.state.lat}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.lat'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="lng"
                      value={this.state.lng}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.lgn'})}
          />
        </span>
        <span className="payments"> 
          <p className="fdp"><FormattedMessage id='register.payment'/></p>
          <Checkbox className="check"
                    checked={this.state.money}
                    onBlur={this.updateParent}
                    onChange={() => this.setState({money: !this.state.money})}>                 
            <FormattedMessage id='t.money'/>
          </Checkbox>
          <Checkbox className="check"
                    checked={this.state.debit}
                    onBlur={this.updateParent}
                    onChange={() => this.setState({debit: !this.state.debit})}>
            <FormattedMessage id='t.debitcard'/>
          </Checkbox>
          <Checkbox className="check"
                    checked={this.state.credit}
                    onBlur={this.updateParent}
                    onChange={() => this.setState({credit: !this.state.credit})}>
            <FormattedMessage id='t.creditcard'/>
          </Checkbox>
        </span>
        <p className="d-max"><FormattedMessage id='register.distance'/></p>
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

export default injectIntl(SellerForm)