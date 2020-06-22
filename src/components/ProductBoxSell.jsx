import React from 'react'
import '../styles/ProductBoxSell.css'
import { Button, Alert } from '@blueprintjs/core'
import {deleteProduct, modifyProduct} from '../services/SellerService'
import ModProductInfo from '../components/ModProductInfo'

class ProductBoxSell extends React.Component {

  constructor(props){
    super(props);
    this.state = {
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
      openMod: false
    }
    this.deleteProduct = this.deleteProduct.bind(this);
    this.closeMod = this.closeMod.bind(this);
    this.modifyProduct = this.modifyProduct.bind(this);
  }

  componentDidMount(){
    this.setState({
      name: this.props.info.name,
      brand: this.props.info.brand,
      price: this.props.info.price,
      stock: this.props.info.stock,
      url: this.props.info.image,
    })
  }

  deleteProduct(){
    deleteProduct(this.props.shopId, this.props.info.productId, (err, res) => {
      if(err){
        this.setState({
          alert: false,
          alertResult: true,
          alertResultIntent: 'danger',
          alertResultMsg: `Algo salió mal: ${err}`,
          alertResultIcon: 'error',
        })
      } else {
        this.setState({
          alert: false,
          alertResult: true,
          alertResultIntent: 'success',
          alertResultMsg: `Producto borrado satisfactoriamente`,
          alertResultIcon: 'endorsed',
          display: 'none'
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
          alertResultMsg: `Algo salió mal: ${err}`,
          alertResultIcon: 'error',
        })
      } else {
        console.log(product);
        this.setState({
          name: product.name,
          brand: product.brand,
          price: product.price,
          stock: product.stock,
          url: product.url,
          openMod: false,
          alertResult: true,
          alertResultIntent: 'success',
          alertResultMsg: `Producto modificado satisfactoriamente`,
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
    return (   
      <div style={{display: this.state.display}}>     
      <div className='bs-container'>
        <table className='bs-image-container'><tbody>
          <tr><td><img className='bs-image' alt={p.name} src={p.url}></img></td></tr>
        </tbody></table>
        <table className='bs-desc-container'><tbody>
          <tr><td className='bs-desc-item'><b>Nombre:</b> {p.name}</td></tr>
          <tr><td className='bs-desc-item'><b>Marca:</b> {p.brand}</td></tr>
          <tr><td className='bs-desc-item'><b>Precio:</b> ${p.price}</td></tr>
          <tr><td className='bs-desc-item'><b>Stock:</b> {p.stock}</td></tr>
          <tr><td className='bs-btn-container'>
            <Button className='bs-btn-m' intent='primary'
                    onClick={()=>{this.setState({openMod: true})}}>Modificar</Button>
            <Button className='bs-btn' intent='danger'
                    onClick={()=>this.setState({alert: true})}>Eliminar</Button>
          </td></tr>
        </tbody></table>
        <Alert isOpen={this.state.alert}
               confirmButtonText='Eliminar'
               cancelButtonText='Volver'
               intent='danger'
               onCancel={() => this.setState({alert: false})}
               onConfirm={this.deleteProduct}>
              <img className='bs-image-del' alt={p.name} src={p.url}></img><br></br>
              ¿Está seguro que desea eliminar este producto?
        </Alert> 
        <Alert isOpen={this.state.alertResult}
               intent={this.state.alertResultIntent}
               icon={this.state.alertResultIcon}
               confirmButtonText='ACEPTAR'
               onClose={()=>{this.setState({alertResult: false})}}>
               {this.state.alertResultMsg}
        </Alert>
        <ModProductInfo isOpen={this.state.openMod} 
                        modify={this.modifyProduct}
                        close={this.closeMod} product={this.state.name === '' ? this.props.info : this.state} />
      </div>
      </div>
    )
  }

}

export default ProductBoxSell