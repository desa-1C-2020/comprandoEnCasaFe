import React, { Component } from 'react';
import '../styles/BuyerForm.css';
import { InputGroup } from '@blueprintjs/core';
import { injectIntl, FormattedMessage } from 'react-intl';

export class BuyerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            surname: this.props.user.surname,
            email: this.props.user.email,
            address: {
                street: '',
                number: '',
                city: ''
            }
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    handleAddressChange(event) {
        const changed = { [event.target.name]: event.target.value };
        const newaddress = Object.assign(this.state.address, changed);
        this.setState(newaddress);
        this.props.updateRegisterState(newaddress);
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
                                disabled={true}
                                placeholder={intl.formatMessage({ id: 't.name' })}
                    />
                    <InputGroup className="field"
                                type="text"
                                name="surname"
                                value={this.state.surname}
                                disabled={true}
                                placeholder={intl.formatMessage({ id: 't.surname' })}
                    />
                </span>
                <span className="personal-buyer">
                    <InputGroup className="field"
                                type="text"
                                name="email"
                                value={this.state.email}
                                disabled={true}
                                placeholder={intl.formatMessage({ id: 't.mail' })}
                    />
                </span>

                <p className="dd">Domicilio</p>
                <span className="address-buyer">
                <InputGroup className="field"
                            type="text"
                            name="street"
                            value={this.state.address.street}
                            onChange={this.handleAddressChange}
                            placeholder="Calle"
                />
                <InputGroup className="field"
                            type="text"
                            name="number"
                            value={this.state.address.number}
                            onChange={this.handleAddressChange}
                            placeholder="Número"
                />
                <InputGroup className="field"
                            type="text"
                            name="city"
                            value={this.state.address.city}
                            onChange={this.handleAddressChange}
                            placeholder="Ciudad"
                />
                </span>
            </div>
        );
    }
}

export default injectIntl(BuyerForm);