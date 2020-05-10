import React from 'react'
import '../styles/ShopSearch.css'
import { InputGroup, Button } from '@blueprintjs/core'
import SearchResult from './SearchResult';

export class ShopSearch extends React.Component {

  constructor(){
    super();
    this.state = {
      showResults: false,
      lat: '-34.7040003',
      lng: '-58.2754042',
      max: '2000'
    }
    this.openResultsModal = this.openResultsModal.bind(this)
    this.closeResultsModal = this.closeResultsModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  openResultsModal(){
    this.setState({showResults: true})
  }

  closeResultsModal(){
    this.setState({showResults: false})
  }

	render() {
    return (
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <div className="background">
          <h1 className="title">Buscar comercios</h1>
          <h2 className="title">Mi domicilio</h2>
          <div className="input-container">
            <InputGroup className="input" 
                        type="text" 
                        name="lgn"
                        value={this.state.lng}
                        onChange={this.handleChange} 
                        placeholder="Longitud"
            />
            <InputGroup className="input" 
                        type="text" 
                        name="lat"
                        value={this.state.lat} 
                        onChange={this.handleChange}
                        placeholder="Latitud"
            />
          </div>
          <h2 className="title">Distancia máxima (en metros)</h2>
          <InputGroup className="input" 
                      type="number" 
                      name="max"
                      value={this.state.max} 
                      onChange={this.handleChange}
                      placeholder="Metros de distancia"
          />
          <Button className="search-button" onClick={this.openResultsModal} icon='search'>Buscar</Button>
          {this.state.showResults && <SearchResult isOpen={this.state.showResults} closeModal={this.closeResultsModal} {...this.state}/>}
        </div>
      </div>
		);
	}
}

export default ShopSearch