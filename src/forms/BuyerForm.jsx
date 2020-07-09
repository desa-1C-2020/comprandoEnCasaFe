import React from 'react'
import '../styles/BuyerForm.css'
import { InputGroup } from '@blueprintjs/core'
import { injectIntl, FormattedMessage } from 'react-intl'

export class BuyerForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      street: '',
      lat: '',
      lng: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  updateParent(){
    this.props.update({
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      address: {
        street: this.state.street,
        latitud: this.state.lat,
        longitud: this.state.lng
      }
    })
  }

	render() {
    const { intl } = this.props;
    return (
      <div>
        <p className="dp"><FormattedMessage id='t.personaldata'/></p>
        <span className="personal-buyer">
          <InputGroup className="field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.name'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="surname"
                      value={this.state.surname}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'t.surname'})}
            />
        </span>
        <span className="personal-buyer">
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
        <p className="dd"><FormattedMessage id='t.addressdata'/></p>
        <span className="address-buyer">
          <InputGroup className="field" 
                      type="text" 
                      name="street"
                      value={this.state.street}
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
      </div>
		);
	}
}

export default injectIntl(BuyerForm)