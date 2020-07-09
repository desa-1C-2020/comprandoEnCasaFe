import React from 'react'
import { Button } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import '../styles/ShopProductDisplay.css'

export class ShopProductDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: 'block'
    }
    this.delete = this.delete.bind(this);
  }

  delete(){
    this.props.delete(this.props.product.product.productId);
    this.setState({display: 'none'});
  }

  render(){
    const product = this.props.product.product
    return(
      <span style={{display: this.state.display}}>
      <div className='spd-main-container'>
        <table>
          <tbody>
            <tr>
              <td className='sdp-t1'>
                <img className='min-image' alt='product' src={product.imageUrl}></img>
              </td>
              <td className='sdp-t2'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p className='spd-title'>{product.name} - [{product.brand}]</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='spd-stats'>
                          <span className='stats-unit'>
                            <FormattedMessage id='buybox.ammount'/>
                            <b>{this.props.product.ammount}</b>
                          </span>
                          <span className='stats-unit'>
                            <FormattedMessage id='cart.unity'/>
                            <b>${product.price}</b>
                          </span>
                          <span className='stats-unit'>
                            <FormattedMessage id='cart.total'/>
                            <b>${product.price * this.props.product.ammount}</b>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className='del-btn' >
                <Button icon='trash' onClick={this.delete}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </span>
    )
  }

}

export default ShopProductDisplay