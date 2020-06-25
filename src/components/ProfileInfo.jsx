import React from 'react'
import { Dialog } from '@blueprintjs/core'
import '../styles/ProfileInfo.css'
import { injectIntl, FormattedMessage } from 'react-intl'

class ProfileInfo extends React.Component {

  constructor(props){
    super(props);
    this.close = this.close.bind(this);
  }

  close(){
    this.props.handleProfile();
  }

  render(){
    const { intl } = this.props;
    const info = this.props.info
    return (  
      <div>
        <Dialog isOpen={this.props.isOpen} onClose={this.close} 
                title={intl.formatMessage({id:'navbar.data'})} icon='info-sign'>
        {this.props.accountType === 'buyer' ? 
        <div className='info-container'>
          <p className='text-format'>
            <b><FormattedMessage id='t.name'/>:</b> {`${info.name} ${info.surname}`}
          </p>
          <p className='text-format'>
            <b><FormattedMessage id='t.mail'/>:</b> {info.email}
          </p>
          <p className='text-format'>
            <b><FormattedMessage id='t.address'/>:</b> {info.address.street}
          </p>
          <p className='text-format'><b><FormattedMessage id='navbar.coor'/>:</b>
            <br/>{`${intl.formatMessage({id:'t.lat'})}: ${info.address.latitud} - 
                   ${intl.formatMessage({id:'t.lgn'})}: ${info.address.longitud}`}
          </p>
        </div> 
        :
        <div>
          {/* TODO - datos de vendedor (falta arreglar endpoints login)*/}
        </div> 
        }
        </Dialog>
      </div>      
    )
  }

}

export default injectIntl(ProfileInfo)