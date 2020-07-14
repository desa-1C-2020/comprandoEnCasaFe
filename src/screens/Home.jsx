import React from 'react'
import '../styles/LogInScreen.css';
import logo from '../CEC.png';
import { FormattedMessage } from 'react-intl';
import { Button } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';

export class Home extends React.Component {

  render(){
    return(
      <div className="login-container" style={{textAlign: 'center'}}>
					<h1 className="login-title"><FormattedMessage id='login.intro'/></h1>
					<img className='logo-login' src={logo} alt='CEC'></img>
          <Button onClick={()=> this.props.history.push('/login')}
            large='true' intent='primary'>
            <FormattedMessage id='login.enter'/>    
          </Button>
			</div>
    )
  }
}

export default withRouter(Home);