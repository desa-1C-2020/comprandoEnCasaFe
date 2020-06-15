import React from 'react'
import { Dialog } from '@blueprintjs/core'
import '../styles/ProfileInfo.css'

class ProfileInfo extends React.Component {

  constructor(props){
    super(props);
    this.close = this.close.bind(this);
  }

  close(){
    this.props.handleProfile();
  }

  render(){
    const info = this.props.info
    return (  
      <div>
        <Dialog isOpen={this.props.isOpen} onClose={this.close} title='Mis datos' icon='info-sign'>
        {this.props.accountType === 'buyer' ? 
        <div className='info-container'>
          <p className='text-format'><b>Nombre:</b> {`${info.name} ${info.surname}`}</p>
          <p className='text-format'><b>Correo electrónico:</b> {info.email}</p>
          <p className='text-format'><b>Dirección:</b> {info.address.street}</p>
          <p className='text-format'><b>Coordenadas:</b>
            <br/>{`Latitud: ${info.address.latitud} - Longitud: ${info.address.longitud}`}
          </p>
        </div> 
        :
        <div>
          
        </div> 
        }
        </Dialog>
      </div>      
    )
  }

}

export default ProfileInfo