import React from 'react'
import '../styles/ResultBox.css'
import { getShops } from '../services/ProductService'
import { Dialog } from '@blueprintjs/core';
import ResultBox from './ResultBox';

export class SearchResult extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: []
    }
    this.handleClose = this.handleClose.bind(this);
    this.createBoxesFromArray = this.createBoxesFromArray.bind(this)
  }

  handleClose(){
    this.props.closeModal()
  }

  componentDidMount(){
    console.log(this.props.lat)
    console.log(this.props.lng)
    console.log(this.props.max)
    const shops = getShops();
    this.setState({results: this.createBoxesFromArray(shops)})
  }

  createBoxesFromArray(shops){
    const shopList = []
    shops.forEach((shop) =>{
    const box = <ResultBox
      name={shop.name}
      address={shop.address}
    />
      shopList.push(box)
    })
    return shopList;
  }

	render() {
    return (
      <Dialog 
        isOpen={this.props.isOpen} 
        onClose={this.handleClose}
        title="Resultados de la búsqueda">
        {this.state.results.length === 0 ? 
          <div className="no-results">
            <h3>No se encontraron resultados</h3>
          </div> 
          : this.state.results}
      </Dialog>
		);
	}
}

export default SearchResult