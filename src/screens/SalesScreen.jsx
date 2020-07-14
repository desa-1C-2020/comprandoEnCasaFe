import React from 'react'
import { FormattedMessage } from 'react-intl'
import '../styles/ShoppingHistory.css'
import { Alert, Spinner } from '@blueprintjs/core'
import { getSales } from '../services/SellerService'
import Sale from '../components/Sale'

export class SalesScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      alert: false,
      isLoading: false,
      salesComponents: []
    }
    this.createComponents = this.createComponents.bind(this);
  }

  componentDidMount(){
    this.setState({isLoading: true});
    getSales()
      .then((sales) => {
        this.setState({salesComponents: this.createComponents(sales), isLoading: false})
      })
      .catch((_err) => {
        this.setState({alert: true, isLoading: false})
      })
  }

  createComponents(sales){
    const components = [];
    let key = 17000;
    sales.forEach((s) => {
      let c = <Sale key={key} info={s}/>
      key = key + 1
      components.push(c);
    })
    return components
  }

  render(){
    return(
      <div>
        {!this.state.isLoading ? 
        <span>
        <div>
          <p className='sh-title'><FormattedMessage id='seller.sales'/></p>
          {this.state.salesComponents}
        </div>
        <Alert isOpen={this.state.alert}
               confirmButtonText={<FormattedMessage id='t.accept'/>}
               icon='error'
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              <FormattedMessage id='t.error'/>
        </Alert></span>
        :
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner size='100' intent='primary'/>
        </div>}
      </div>
    )
  }

}

export default SalesScreen;