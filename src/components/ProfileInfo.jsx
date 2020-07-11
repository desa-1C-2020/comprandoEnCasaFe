import React from 'react';
import { Dialog } from '@blueprintjs/core';
import '../styles/ProfileInfo.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.isOpen = true;
        this.close = this.close.bind(this);
    }

    close() {
        this.isOpen = false;
        this.props.history.push('/home');
    }

    render() {
        const { intl } = this.props;
        const user = this.props.userRol.user;
        const commerce = this.props.userRol.commerce;
        return (
            <div>
                <Dialog isOpen={this.isOpen} onClose={this.close}
                        title={intl.formatMessage({ id: 'navbar.data' })} icon='info-sign'>
                    {this.props.isBuyer ?
                        <div className='info-container'>
                            <p className='text-format'>
                                <b><FormattedMessage id='t.name'/>:</b> {`${user.name} ${user.surname}`}
                            </p>
                            <p className='text-format'>
                                <b><FormattedMessage id='t.mail'/>:</b> {user.email}
                            </p>
                            <p className='text-format'>
                                <b><FormattedMessage id='t.address'/>:</b> {user.address.street}
                            </p>
                            <p className='text-format'><b><FormattedMessage id='navbar.coor'/>:</b>
                                <br/>{`${intl.formatMessage({ id: 't.lat' })}: ${user.address.latitud} -
                   ${intl.formatMessage({ id: 't.lgn' })}: ${user.address.longitud}`}
                            </p>
                        </div>
                        :
                        <div>
                            <div className='info-container'>
                                <h2><FormattedMessage id='t.sellerdata'/></h2>
                                <p className='text-format'>
                                    <b><FormattedMessage id='t.name'/>:</b> {`${user.name} ${user.surname}`}
                                </p>
                                <p className='text-format'>
                                    <b><FormattedMessage id='t.mail'/>:</b> {user.email}
                                </p>
                                <h2><FormattedMessage id='t.commercedata'/></h2>
                                <p className='text-format'>
                                    <b><FormattedMessage id='t.commercename'/>:</b> {commerce.name}
                                </p>
                                <p className='text-format'>
                                    <b><FormattedMessage
                                        id='t.sector'/>:</b> {commerce.businessSector}
                                </p>
                                <p className='text-format'>
                                    <b><FormattedMessage id='t.address'/>:</b> {commerce.address.street}
                                </p>
                                <p className='text-format'><b><FormattedMessage id='navbar.coor'/>:</b>
                                    <br/>{`${intl.formatMessage({ id: 't.lat' })}: ${commerce.address.latitud} |
                   ${intl.formatMessage({ id: 't.lgn' })}: ${commerce.address.longitud}`}
                                </p>
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }

}

export default injectIntl(withRouter(ProfileInfo));