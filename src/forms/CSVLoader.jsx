import React from 'react'
import { FileInput, Button } from '@blueprintjs/core';
import { saveProduct } from '../services/SellerService';
import * as Papa from 'papaparse'
import '../styles/CSVLoader.css'

export class CSVLoader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      productArray: [],
      fileName: '',
      uploading: false,
      totalLoaded: 0,
      totalProducts: 0
    }
    this.handleReadCSV = this.handleReadCSV.bind(this);
    this.uploadProducts = this.uploadProducts.bind(this);
  }

 handleReadCSV(event){
    if(event.target.files) {
      const name = event.target.files[0].name
      Papa.parse(event.target.files[0], {
        complete: function(results) {
          let products = results.data;
          let lastElem = results.data.length;
          products.splice(lastElem-1,1);
          products.splice(0,1);
          this.setState({productArray: products, isLoaded: true, fileName: name, totalProducts: products.length});
        }.bind(this)
      });
    }
  }

  uploadProducts(){
    const products = this.state.productArray;
    let index = 1
    products.forEach((product)=>{
      this.setState({uploading: true, totalLoaded: index})
      let productBody = {
        name: product[0],
        brand: product[1],
        stock: parseInt(product[2]),
        price: parseFloat(product[3]),
        imageUrl: product[4]
      }
      saveProduct(productBody).then(()=>{
        index = index + 1;
        this.setState({uploading: false, totalLoaded: index});
      }).catch(
        //TODO ???
      )
    })
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render(){
    return(
      <div className='csv-loader'>
        <h1>Cargar productos mediante CSV</h1>
         <FileInput buttonText='buscar'
                  id='file-element'
                  fill='true'
                  large='true'
                  hasSelection={this.state.isLoaded}
                  onChange={this.handleReadCSV}
                  text={this.state.isLoaded ? this.state.fileName : 'elegi un archivo' } />
        <Button disabled={!this.state.isLoaded} onClick={this.uploadProducts}>Cargar</Button> 
      </div>
    )
    
  }
}

export default CSVLoader;