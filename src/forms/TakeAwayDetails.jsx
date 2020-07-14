import React from 'react';
import '../styles/Details.css';
import { Button, Alert, Spinner } from '@blueprintjs/core';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { takeawayOptions } from '../services/PurchaseService';
import { DAYS_GAP } from '../constants';

export class TakeAwayDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            stringDate: '',
            suggestionValidated: false,
            alert: false,
            isLoading: false
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.addZeroes = this.addZeroes.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentDidMount() {
        this.props.updateDate('');
        this.setState({ stringDate: this.formatDate(this.state.date) });
    }

    handleDateChange(date) {
        let strDate = this.formatDate(date);
        this.props.updateDate('');
        this.setState({ date: date, isValidDate: true, stringDate: strDate, suggestionValidated: false });
    }

    formatDate(date) {
        let d = new Date(date);
        const year = d.getFullYear();
        const month = this.addZeroes(d.getMonth().toString());
        const day = this.addZeroes(d.getDate().toString());
        const hour = this.addZeroes(d.getHours().toString());
        const minute = this.addZeroes(d.getMinutes().toString());
        const second = '00';
        return (`${year}${month}${day}:${hour}${minute}${second}`);
    }

    addZeroes(string) {
        let newString = string;
        if (string.length === 1) {
            newString = '0' + string;
        }
        return newString;
    }

    handleValidate() {
        this.setState({ isLoading: true });
        let takeAwayTO = {
            commercesId: this.props.ids,
            suggestedDay: this.state.stringDate
        };
        takeawayOptions(takeAwayTO)
            .then((localDateTime) => {
                let date = new Date(localDateTime);
                let dateAsString = this.formatDate(date);
                this.props.updateDate(dateAsString);
                this.setState({ date: date, stringDate: dateAsString, suggestionValidated: true, isLoading: false });
            })
            .catch((error) => {
                this.props.updateDate('');
                this.setState({ alert: true, isLoading: false });
            });
    }

    render() {
        const today = new Date();
        let maxDate = new Date();
        maxDate.setDate(today.getDate() + DAYS_GAP);
        return (
            <div className='detail-container'>
                <p className='calendar-title'><FormattedMessage id='delivery.title'/></p>
                <div className='calendar'>
                    <DatePicker minDate={today}
                                maxDate={maxDate}
                                timePrecision={TimePrecision.MINUTE}
                                value={this.state.date}
                                onChange={this.handleDateChange}>
                    </DatePicker>
                </div>
                <Button intent='primary'
                        onClick={this.handleValidate}>
                    <FormattedMessage id='delivery.validate'/>
                </Button>
                {this.state.suggestionValidated && <div className='suggested-date'>
                    <FormattedMessage id='delivery.suggested'/>
                    <FormattedDate value={this.state.date.toLocaleDateString()}/>
                    <FormattedMessage id='delivery.at'/>
                    {this.state.date.toLocaleTimeString()}
                </div>}
                <Alert isOpen={this.state.alert}
                       confirmButtonText={<FormattedMessage id='t.accept'/>}
                       intent='danger'
                       icon='error'
                       onClose={() => this.setState({ alert: false })}>
                    <FormattedMessage id='t.error'/>
                </Alert>
                {this.state.isLoading &&
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Spinner size='100' intent='primary'/>
                </div>
                }
            </div>
        );
    }
}

export default TakeAwayDetails;