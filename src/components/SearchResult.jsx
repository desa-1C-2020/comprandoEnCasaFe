import React from 'react'
import '../styles/HomeNavBar.css'
import { getShops } from '../services/ProductService'
import { Dialog } from '@blueprintjs/core';

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
    const box = <p key={shop.name}>{shop.name} - {shop.address}</p>
      shopList.push(box)
    })
    return shopList;
  }

	render() {
    return (
      <Dialog 
        isOpen={this.props.isOpen} 
        onClose={this.handleClose}
        title="Resultados">
        {this.state.results.length === 0 ? "No hay resultados" : this.state.results}
      </Dialog>
		);
	}
}

export default SearchResult