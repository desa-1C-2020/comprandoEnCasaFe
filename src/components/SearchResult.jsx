import React from 'react'
import '../styles/SearchResult.css'
import { searchForShops } from '../services/ProductService'
import { Dialog, Spinner, Alert } from '@blueprintjs/core';
import ResultBox from './ResultBox';

export class SearchResult extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: [],
      isLoaded: false,
      alert: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.createBoxesFromArray = this.createBoxesFromArray.bind(this)
  }

  handleClose(){
    this.props.closeModal()
  }

  componentDidMount(){
    searchForShops(this.props.lat, this.props.lng, this.props.max, (err, result) =>{
      if(err) {
        this.setState({isLoaded: true, alert: true})
      }
      else {
        this.setState({isLoaded: true, results: this.createBoxesFromArray(result.data)})
      }
    })
  }

  createBoxesFromArray(shops){
    const shopList = []
    let key = 2000
    shops.forEach((shop) =>{ 
    const box = <ResultBox
      key={key}
      name={shop.name}
      address={shop.address.street}
    />
      shopList.push(box)
      key = key + 1;
    })
    return shopList;
  }

	render() {
    return (
      <div>
      {this.state.isLoaded ?
        <Dialog 
          isOpen={this.props.isOpen} 
          onClose={this.handleClose}
          title="Resultados de la búsqueda">
          <div>
            {this.state.results.length === 0 ? 
              <div className="no-results">
                <h3>No se encontraron resultados</h3>
              </div> 
              : this.state.results}
          </div>
        </Dialog>
        :
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>   
          <Spinner size='100' intent='primary'/>
        </div>}
        <Alert isOpen={this.state.alert}
               confirmButtonText='ACEPTAR'
               icon='error'
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              ¡Algo salió mal!
        </Alert>
        </div>
		);
	}
}

export default SearchResult