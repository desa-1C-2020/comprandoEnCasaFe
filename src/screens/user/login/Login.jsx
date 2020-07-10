import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Alert } from '@blueprintjs/core';
import '../../../styles/LogInScreen.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../../constants';
import googleLogo from '../../../img/google-logo.png';
import fbLogo from '../../../img/fb-logo.png';
import logo from '../../../CEC.png';

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
				}} />;
		}

		return (
			<div className="login-container" style={{textAlign: 'center'}}>
					<h1 className="login-title">{intl.formatMessage({ id: 'login.intro' })}</h1>
					<img className='logo-login' src={logo}></img>
					<h1 className="login-title">{intl.formatMessage({ id: 'login.title' })}</h1>
					<SocialLogin/>
			</div>
		);
	}
}

class SocialLogin extends Component {
	render() {
		return (
			<div className='social-login'>
				<table className='sn-table'>
					<tbody>
						<tr className='sn-container'>
							<td>
								<img className='google-logo' src={googleLogo} alt="Google"/>
							</td>
							<td className='log-text'>		
								<a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
									<FormattedMessage id='login.google'/>
								</a>
							</td>
						</tr>
						<tr className='sn-container'>
							<td>
								<img className='facebook-logo' src={fbLogo} alt="Facebook"/>
							</td>
							<td className='log-text'>
								<a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
									<FormattedMessage id='login.fb'/>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default injectIntl(withRouter(Login));