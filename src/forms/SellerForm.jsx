import React from 'react';
import '../styles/SellerForm.css';
import { InputGroup, Button, Checkbox } from '@blueprintjs/core';
import TimeTablePopUp from './TimeTablePopUp';
import { injectIntl, FormattedMessage } from 'react-intl';

export class SellerForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSeller: this.props.user.name,
            surnameSeller: this.props.user.surname,
            email: this.props.user.email,
            name: '',
            sector: '',
            address: {
                street: '',
                number: '',
                city: ''
            },
            radio: '',
            money: false,
            debit: false,
            credit: false,
            schedule: [],
            timeTable: false
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.addSchedule = this.addSchedule.bind(this);
    }

    handleAddressChange(event) {
        const changed = { [event.target.name]: event.target.value };
        const newaddress = Object.assign(this.state.address, changed);
        this.setState(newaddress);
        this.props.updateRegisterState(newaddress);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.updateParent();
    }

    addSchedule(sched) {
        this.setState({ schedule: sched });
        this.updateParent();
    }

    updateParent() {
        let toUpdate = {
            user: {
                name: this.state.nameSeller,
                surname: this.state.surnameSeller,
                email: this.state.email.toLowerCase()
            },
            commerceName: this.state.name,
            commerceBusinessSector: this.state.sector,
            paymentMethods: [
                {
                    type: 'Efectivo',
                    accept: 'Efectivo'
                }
            ],
            daysAndHoursOpen: this.state.schedule,
            arrivalRange: this.state.radio
        };
        this.props.update(toUpdate);
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
                                disabled={true}
                                placeholder={intl.formatMessage({ id: 't.name' })}
                    />
                    <InputGroup className="field"
                                type="text"
                                name="surnameSeller"
                                value={this.state.surnameSeller}
                                disabled={true}
                                placeholder={intl.formatMessage({ id: 't.surname' })}
                    />
                    <InputGroup className="field"
                                type="text"
                                name="email"
                                value={this.state.email}
                                disabled={true}
                                placeholder={intl.formatMessage({ id: 't.mail' })}
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
                                placeholder={intl.formatMessage({ id: 't.commercename' })}
                    />
                    <InputGroup className="field"
                                type="text"
                                name="sector"
                                value={this.state.sector}
                                onChange={this.handleChange}
                                onBlur={this.updateParent}
                                placeholder={intl.formatMessage({ id: 't.sector' })}
                    />
                    <div className="seller-btn">
                        <Button onClick={() => this.setState({ timeTable: true })}>
                            <FormattedMessage id='register.customtime'/>
                        </Button>
                    </div>
                </span>

                <span className="payments">
                    <p className="fdp"><FormattedMessage id='register.payment'/></p>
                    <Checkbox className="check"
                              checked={this.state.money}
                              onBlur={this.updateParent}
                              onChange={() => this.setState({ money: !this.state.money })}>
                        <FormattedMessage id='t.money'/>
                    </Checkbox>
                    <Checkbox className="check"
                              checked={this.state.debit}
                              onBlur={this.updateParent}
                              onChange={() => this.setState({ debit: !this.state.debit })}>
                        <FormattedMessage id='t.debitcard'/>
                    </Checkbox>
                    <Checkbox className="check"
                              checked={this.state.credit}
                              onBlur={this.updateParent}
                              onChange={() => this.setState({ credit: !this.state.credit })}>
                        <FormattedMessage id='t.creditcard'/>
                    </Checkbox>
                </span>

                <p className="dd">Domicilio del comercio</p>
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

                <p className="d-max"><FormattedMessage id='register.distance'/></p>
                <span className="range">
                    <InputGroup className="field"
                                type="number"
                                name="radio"
                                value={this.state.radio}
                                onBlur={this.updateParent}
                                onChange={this.handleChange}
                                placeholder="2000"
                    />
                </span>

                <TimeTablePopUp isOpen={this.state.timeTable}
                                closeModal={() => this.setState({ timeTable: false })}
                                sendTimeTable={this.addSchedule}/>
            </div>
        );
    }
}

export default injectIntl(SellerForm);