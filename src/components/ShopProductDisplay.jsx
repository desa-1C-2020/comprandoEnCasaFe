import React from 'react'
import { Button } from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import '../styles/ShopProductDisplay.css'

export class ShopProductDisplay extends React.Component {

  componentDidMount(){
    console.log(this.props.product)
  }

  render(){
    const product = this.props.product.product
    return(
      <div className='spd-main-container'>
        <table>
          <tbody>
            <tr>
              <td>
                <img className='min-image' alt='product' src={product.imageUrl}></img>
              </td>
              <td>
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
                <Button icon='trash' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default ShopProductDisplay