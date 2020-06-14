import React from 'react'
import '../styles/SearchResult.css'
import { searchForShops } from '../services/ProductService'
import { Dialog, Spinner } from '@blueprintjs/core';
import ResultBox from './ResultBox';

export class SearchResult extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: [],
      isLoaded: false
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
        //TODO - err alert
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
        </div>
		);
	}
}

export default SearchResult