import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class CheckAddressHandler extends Component {
    render() {
        if (this.props.missingAddress) {
            return <Redirect to={{
                pathname: '/update-account',
                state: { from: this.props.location }
            }}/>;
        } else {
            return <Redirect to={{
                pathname: '/home',
                state: { from: this.props.location }
            }}/>;
        }
    }
}

export default CheckAddressHandler;