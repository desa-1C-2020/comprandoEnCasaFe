import React from 'react'
import { Dialog, InputGroup, Button } from '@blueprintjs/core'
import '../styles/ModProductInfo.css'

class ModProductInfo extends React.Component {

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
    this.sendProduct = this.sendProduct.bind(this);
  }

  componentDidMount(){
    this.setState({
      name: this.props.product.name,
      brand: this.props.product.brand,
      stock: this.props.product.stock,
      price: this.props.product.price,
      url: this.props.product.image
    })
  }

  sendProduct(){
    //TODO - verificar si los datos son validos
    if(true){
      const prod = {
        name: this.props.product.name,
        brand: this.props.product.brand,
        stock: this.props.product.stock,
        price: this.props.product.price,
        url: this.props.product.image
      }
      this.props.modify(prod)
    } else {
      //TODO - Alert
    }
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    return(
      <div>
        <Dialog title="Modificar producto" 
                isOpen={this.props.isOpen}
                onClose={() => this.props.close()}>
          <span>
          <InputGroup className="mod-field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Nombre producto"
          />
          <InputGroup className="mod-field" 
                      type="text" 
                      name="brand"
                      value={this.state.brand}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Marca"
          />
          <InputGroup className="mod-field" 
                      type="number" 
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Stock"
          />
          <InputGroup className="mod-field" 
                      type="number" 
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder="Precio"
          />
          <InputGroup className="mod-field" 
                        type="text" 
                        name="url"
                        value={this.state.url}
                        onChange={this.handleChange} 
                        onBlur={this.updateParent}
                        placeholder="Imágen (URL)"
          />
        </span>
        <span>
          <Button className='accept-btn' onClick={this.sendProduct}>Aceptar</Button>
        </span>
        </Dialog>
      </div>
    )
  }

}

export default ModProductInfo