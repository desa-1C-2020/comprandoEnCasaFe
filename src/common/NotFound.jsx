import React from 'react'
import '../styles/NotFound.css';
import { Link } from 'react-router-dom';
import {NonIdealState, Button} from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import logo from '../CEC.png';

export class NotFound extends React.Component {
    
    render() {
        return (
            <div className="page-not-found">
                <img className='not-found-logo' src={logo} alt='CEC'></img>
                <NonIdealState
                    icon='error'
                    title='Oops!'
                    description={<FormattedMessage id='notfound.desc'/>}
                    action={
                        <Link to="/login">
                            <Button className='not-found-btn' large='true' intent='primary'>
                                <FormattedMessage id='notfound.btn'/>
                            </Button>
                        </Link>
                    }
                />
            </div>
        );
    }
}

export default NotFound;