import React from 'react'
import { Dialog } from '@blueprintjs/core'

class ProfileInfo extends React.Component {

  constructor(props){
    super(props);
    this.close = this.close.bind(this);
  }

  close(){
    this.props.handleProfile();
  }

  //TODO - estilos para este modal
  render(){
    const info = this.props.info
    return (  
      <div>
        <Dialog isOpen={this.props.isOpen} onClose={this.close} title="Mis datos">
        {this.props.accountType === 'buyer' ? 
        <div>
          <p>Nombre: {`${info.name} ${info.surname}`}</p>
          <p>Correo electrónico: {info.email}</p>
          <p>Dirección: {info.street}</p>
          <p>Coordenadas: {`Latitud:${info.lat}  Longitud:${info.lgn}`}</p>
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