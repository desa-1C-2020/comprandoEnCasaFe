import React from 'react'
import '../styles/ProductLoader.css'
import { InputGroup, Button, Alert } from '@blueprintjs/core'
import { saveProduct } from '../services/SellerService'

export class ProductLoader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      brand: '',
      stock: '',
      price: '',
      url: '',
      alert: false,
      msg: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.isValidProduct = this.isValidProduct.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  saveProduct(){
    const product = {
      name: this.state.name,
      brand: this.state.brand,
      stock: this.state.stock,
      price: this.state.price,
      imageUrl: this.state.url
    }
    if(this.isValidProduct()){
      saveProduct(product, this.props.userID, (err, res) => {
        if(err){
          this.setState({alert: true, msg: '¡Algo salió mal!'});
        } else {
          this.setState({name: '', brand: '', stock: '', price: '', url: '',
                         alert: true, msg: 'Producto guardado satisfactoriamente.'});
        }
      })
    } else {
      this.setState({alert: true, msg: 'Por favor, complete todos los campos.'});
    }
  }

  isValidProduct(){
    return (
      this.state.name !== '' && this.state.brand !== '' &&
      this.state.stock !== '' && this.state.price !== '' &&
      this.state.url !== ''
    )
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
        <Alert isOpen={this.state.alert}
               confirmButtonText='ACEPTAR'
               icon={this.state.msg.includes('Producto') ? 'endorsed' : 'error'}
               intent={this.state.msg.includes('Producto') ? 'success' : 'danger'}
               onClose={() => {this.setState({alert: false})}}>
              {this.state.msg}
        </Alert>
      </div>
		);
	}
}

export default ProductLoader