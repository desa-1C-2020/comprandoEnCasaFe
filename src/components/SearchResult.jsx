import React from 'react'
import '../styles/HomeNavBar.css'
import { Dialog } from '@blueprintjs/core';

export class SearchResult extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
    this.props.closeModal()
  }

	render() {
    return (
      <Dialog 
        isOpen={this.props.isOpen} 
        onClose={this.handleClose}
        title="Resultados">
        <div>
          <p>Nombre- Direccion</p>
        </div>
      </Dialog>
		);
	}
}

export default SearchResult