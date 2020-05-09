import React from 'react'
import '../styles/HomeNavBar.css'
import { InputGroup, Button } from '@blueprintjs/core'
import SearchResult from './SearchResult';


export class ShopSearch extends React.Component {

  constructor(){
    super();
    this.state = {
      showResults: false,
      lat: '-34.7058979',
      lng: '-58.2775644',
      max: '2000'
    }
    this.openResultsModal = this.openResultsModal.bind(this)
    this.closeResultsModal = this.closeResultsModal.bind(this)
  }

  openResultsModal(){
    this.setState({showResults: true})
  }

  closeResultsModal(){
    this.setState({showResults: false})
  }

	render() {
    return (
      <div style={{ maxWidth: '500px', borderRadius: '20px'}}>
        <h1 style={{color: 'white'}}>Buscar comercios</h1>
        <h2 style={{color: 'white'}}>Mi domicilio</h2>
        <div>
          <InputGroup type="text" placeholder="Longitud"></InputGroup>
          <InputGroup type="text" placeholder="Latitud"></InputGroup>
        </div>
        <h2 style={{color: 'white'}}>Distancia máxima (en metros)</h2>
        <InputGroup type="number" placeholder="Max metros de distancia"></InputGroup>
        <Button onClick={this.openResultsModal}>Buscar</Button>
        {this.state.showResults && <SearchResult isOpen={this.state.showResults} closeModal={this.closeResultsModal} {...this.state}/>}
      </div>
		);
	}
}

export default ShopSearch