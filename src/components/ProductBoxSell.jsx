import React from 'react'
import '../styles/ProductBoxSell.css'
import { Button } from '@blueprintjs/core'

class ProductBoxSell extends React.Component {

  render(){
    const p = this.props.info
    return (        
      <div className='bs-container'>
        <table className='bs-image-container'><tbody>
          <tr><td><img className='bs-image' alt={p.name} src={p.image}></img></td></tr>
        </tbody></table>
        <table className='bs-desc-container'><tbody>
          <tr><td className='bs-desc-item'><b>Nombre:</b> {p.name}</td></tr>
          <tr><td className='bs-desc-item'><b>Marca:</b> {p.brand}</td></tr>
          <tr><td className='bs-desc-item'><b>Precio:</b> ${p.price}</td></tr>
          <tr><td className='bs-desc-item'><b>Stock:</b> {p.stock}</td></tr>
          <tr><td className='bs-btn-container'>
            <Button className='bs-btn-m' intent='primary'>Modificar</Button>
            <Button className='bs-btn' intent='danger'>Eliminar</Button>
          </td></tr>
        </tbody></table>
      </div>
    )
  }

}

export default ProductBoxSell