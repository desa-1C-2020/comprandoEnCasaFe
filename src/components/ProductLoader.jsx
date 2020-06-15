import React from 'react'
import '../styles/ProductLoader.css'
import { InputGroup, Button } from '@blueprintjs/core'

export class ProductLoader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      brand: '',
      stock: '',
      price: '',
      url: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  saveProduct(){
    //TODO-endpoint
  }

	render() {
    return (
      <div className='loader-container'>
        <p className='loader-container-title'><b>Agregar un producto</b></p>
        <span className='fields-container'>
          <InputGroup className="field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Nombre producto"
          />
          <InputGroup className="field" 
                      type="text" 
                      name="brand"
                      value={this.state.brand}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Marca"
          />
          <InputGroup className="field" 
                      type="number" 
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Stock"
          />
          <InputGroup className="field" 
                      type="number" 
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Precio"
          />
          <InputGroup className="field" 
                        type="text" 
                        name="url"
                        value={this.state.url}
                        onChange={this.handleChange} 
                        onBlur={this.updateParent}
                        placeholder="Imágen (URL)"
          />
        </span>
        <span className='preview-container'>
          <img alt='' src={this.state.url} className='preview'></img>
        </span>
        <Button onClick={this.saveProduct}>Agregar producto</Button>
      </div>
		);
	}
}

export default ProductLoader