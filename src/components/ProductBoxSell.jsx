import React from 'react'
import '../styles/ProductBoxSell.css'
import { Button, Alert, Spinner } from '@blueprintjs/core'
import {deleteProduct, modifyProduct} from '../services/SellerService'
import ModProductInfo from '../components/ModProductInfo'
import { injectIntl, FormattedMessage } from 'react-intl'

class ProductBoxSell extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      brand: '',
      price: '',
      stock: '',
      url: '',
      alert: false,
      alertResult: false,
      alertResultIntent: '',
      alertResultMsg: '',
      alertResultIcon: '',
      display: 'inline-block',
      openMod: false,
      isLoading: false
    }
    this.deleteProduct = this.deleteProduct.bind(this);
    this.closeMod = this.closeMod.bind(this);
    this.modifyProduct = this.modifyProduct.bind(this);
  }

  componentDidMount(){
    this.setState({
      name: this.props.info.product.name,
      brand: this.props.info.product.brand,
      price: this.props.info.price,
      stock: this.props.info.stock,
      url: this.props.info.product.imageUrl,
      id: this.props.info.id
    })
  }

  deleteProduct(){
    this.setState({isLoading: true})
    deleteProduct(this.props.shopId, this.props.info.product.id, (err, res) => {
      if(err){
        this.setState({
          alert: false,
          alertResult: true,
          alertResultIntent: 'danger',
          alertResultMsg: <FormattedMessage id='t.error'/>,
          alertResultIcon: 'error',
          isLoading: false
        })
      } else {
        this.setState({
          alert: false,
          alertResult: true,
          alertResultIntent: 'success',
          alertResultMsg: <FormattedMessage id='seller.deleteprod'/>,
          alertResultIcon: 'endorsed',
          display: 'none',
          isLoading: false
        })
      }
    });
  }

  modifyProduct(product){
    modifyProduct(this.props.shopId, product, (err, _res) => {
      if(err){
        this.setState({
          openMod: false,
          alertResult: true,
          alertResultIntent: 'danger',
          alertResultMsg: <FormattedMessage id='t.error'/>,
          alertResultIcon: 'error',
        })
      } else {
        this.setState({
          name: product.name,
          brand: product.brand,
          price: product.price,
          stock: product.stock,
          url: product.url,
          openMod: false,
          alertResult: true,
          alertResultIntent: 'success',
          alertResultMsg: <FormattedMessage id='seller.modifyprod'/>,
          alertResultIcon: 'endorsed',
        })
      }
    })
  }

  closeMod(){
    this.setState({openMod: false});
  }

  render(){
    const p = this.state
    const { intl } = this.props;
    return (   
      <div style={{display: this.state.display}}>     
      <div className='bs-container'>
        <table className='bs-image-container'><tbody>
          <tr><td><img className='bs-image' alt={p.name} src={p.url}></img></td></tr>
        </tbody></table>
        <table className='bs-desc-container'><tbody>
          <tr><td className='bs-desc-item'>
            <b><FormattedMessage id='t.name'/>:</b> {p.name}
          </td></tr>
          <tr><td className='bs-desc-item'>
            <b><FormattedMessage id='ploader.brand'/>:</b> {p.brand}
          </td></tr>
          <tr><td className='bs-desc-item'>
            <b><FormattedMessage id='ploader.price'/>:</b> ${p.price}
          </td></tr>
          <tr><td className='bs-desc-item'>
            <b><FormattedMessage id='ploader.stock'/>:</b> {p.stock}
          </td></tr>
          <tr><td className='bs-btn-container'>
            <Button className='bs-btn-m' intent='primary'
                    onClick={()=>{this.setState({openMod: true})}}>
              <FormattedMessage id='t.modify'/>
            </Button>
            <Button className='bs-btn' intent='danger'
                    onClick={()=>this.setState({alert: true})}>
              <FormattedMessage id='t.delete'/>
            </Button>
          </td></tr>
        </tbody></table>
        <Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.delete'})}
               cancelButtonText={intl.formatMessage({id:'t.goback'})}
               intent='danger'
               onCancel={() => this.setState({alert: false})}
               onConfirm={this.deleteProduct}>
              <img className='bs-image-del' alt={p.name} src={p.url}></img><br></br>
              <FormattedMessage id='seller.deletemsg'/>
        </Alert> 
        <Alert isOpen={this.state.alertResult}
               intent={this.state.alertResultIntent}
               icon={this.state.alertResultIcon}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
               onClose={()=>{this.setState({alertResult: false})}}>
               {this.state.alertResultMsg}
        </Alert>
        <ModProductInfo isOpen={this.state.openMod} 
                        modify={this.modifyProduct}
                        close={this.closeMod} product={this.state.name === '' ? this.props.info : this.state} />
        {this.state.isLoading &&
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>   
          <Spinner size='100' intent='primary'/>
        </div>
        }
      </div>
      </div>
    )
  }

}

export default injectIntl(ProductBoxSell)