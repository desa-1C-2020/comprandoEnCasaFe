import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Alert } from '@blueprintjs/core';
import '../../../styles/LogInScreen.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../../constants';
import googleLogo from '../../../img/google-logo.png';
import fbLogo from '../../../img/fb-logo.png';

class Login extends React.Component {

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        const { intl } = this.props;
        if (this.props.authenticated) {

            return <Redirect
                to={{
                    pathname: '/check-address',
                    state: { from: this.props.location }
                }}/>;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">{intl.formatMessage({ id: 'login.title' })}</h1>
                    <SocialLogin/>
                    <p className="register-text">
                        <span className="signup-link">
                            {intl.formatMessage({ id: 'login.new' })} <Link to="/signup"><FormattedMessage
                            id='t.register'/></Link>
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <div>
                    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google"/> Log in with Google</a>
                </div>
                <br/>
                <div>
                    <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                        <img src={fbLogo} alt="Facebook"/> Log in with Facebook</a>
                </div>
            </div>
        );
    }
}

export default injectIntl(withRouter(Login));