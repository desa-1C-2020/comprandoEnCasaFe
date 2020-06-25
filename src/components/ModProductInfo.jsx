import React from 'react'
import { Dialog, InputGroup, Button, Alert } from '@blueprintjs/core'
import '../styles/ModProductInfo.css'
import { injectIntl } from 'react-intl'

class ModProductInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      brand: '',
      stock: '',
      price: '',
      url: '',
      alert: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendProduct = this.sendProduct.bind(this);
    this.isValidProduct = this.isValidProduct.bind(this);
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
    if(this.isValidProduct()){
      const prod = {
        name: this.state.name,
        brand: this.state.brand,
        stock: this.state.stock,
        price: this.state.price,
        url: this.state.url
      }
      this.props.modify(prod);
    } else {
      this.setState({alert: true});
    }
  }

  isValidProduct(){
    return (
      this.state.name !== '' && this.state.brand !== '' &&
      this.state.stock !== '' && this.state.price !== '' &&
      this.state.url !== ''
    )
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    const { intl } = this.props;
    return(
      <div>
        <Dialog title={intl.formatMessage({id:'seller.modifymsg'})}
                isOpen={this.props.isOpen}
                onClose={() => this.props.close()}>
          <span>
          <InputGroup className="mod-field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.prodname'})}
          />
          <InputGroup className="mod-field" 
                      type="text" 
                      name="brand"
                      value={this.state.brand}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.brand'})}
          />
          <InputGroup className="mod-field" 
                      type="number" 
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.stock'})}
          />
          <InputGroup className="mod-field" 
                      type="number" 
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.price'})}
          />
          <InputGroup className="mod-field" 
                        type="text" 
                        name="url"
                        value={this.state.url}
                        onChange={this.handleChange} 
                        onBlur={this.updateParent}
                        placeholder={intl.formatMessage({id:'ploader.url'})}
          />
        </span>
        <span>
          <Button className='accept-btn' onClick={this.sendProduct}>
            {intl.formatMessage({id:'t.accept'})}
          </Button>
        </span>
        </Dialog>
        <Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
							 intent='warning'
               onClose={() => {this.setState({alert: false})}}>
          {intl.formatMessage({id:'t.fillfields'})}
        </Alert>
      </div>
    )
  }

}

export default injectIntl(ModProductInfo)