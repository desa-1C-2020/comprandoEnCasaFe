import React from 'react'
import '../styles/ProductLoader.css'
import { InputGroup, Button, Alert } from '@blueprintjs/core'
import { saveProduct } from '../services/SellerService'
import { injectIntl, FormattedMessage } from 'react-intl'

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
      msg: '', 
      res: ''
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
      productId: '',
      name: this.state.name,
      brand: this.state.brand,
      stock: parseInt(this.state.stock),
      price: parseInt(this.state.price),
      imageUrl: this.state.url
    }
    if(this.isValidProduct()){
      const id = parseInt(this.props.userID)
      saveProduct(product, id, (err, res) => {
        if(err){
          this.setState({alert: true, res: 'err', msg: <FormattedMessage id='t.error'/>});
        } else {
          this.setState({name: '', brand: '', stock: '', price: '', url: '', res: 'ok',
                         alert: true, msg: <FormattedMessage id='ploader.success'/>});
        }
      })
    } else {
      this.setState({alert: true, res: 'err', msg: <FormattedMessage id='t.fillfields'/>});
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
    const { intl } = this.props;
    return (
      <div className='loader-container'>
        <p className='loader-container-title'>
          <b><FormattedMessage id='ploader.title'/></b>
        </p>
        <span className='fields-container'>
          <InputGroup className="field" 
                      type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.prodname'})}
          />
          <InputGroup className="field" 
                      type="text" 
                      name="brand"
                      value={this.state.brand}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.brand'})}
          />
          <InputGroup className="field" 
                      type="number" 
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.stock'})}
          />
          <InputGroup className="field" 
                      type="number" 
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange} 
                      onBlur={this.updateParent}
                      placeholder={intl.formatMessage({id:'ploader.price'})}
          />
          <InputGroup className="field" 
                        type="text" 
                        name="url"
                        value={this.state.url}
                        onChange={this.handleChange} 
                        onBlur={this.updateParent}
                        placeholder={intl.formatMessage({id:'ploader.url'})}
          />
        </span>
        <span className='preview-container'>
          <img alt='' src={this.state.url} className='preview'></img>
        </span>
        <Button onClick={this.saveProduct}>
          <FormattedMessage id='ploader.addprod'/>
        </Button>
        <Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
               icon={this.state.res === 'ok' ? 'endorsed' : 'error'}
               intent={this.state.res === 'ok' ? 'success' : 'danger'}
               onClose={() => {this.setState({alert: false})}}>
              {this.state.msg}
        </Alert>
      </div>
		);
	}
}

export default injectIntl(ProductLoader)