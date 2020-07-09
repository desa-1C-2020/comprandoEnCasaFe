import React from 'react'
import { FormattedMessage } from 'react-intl'
import '../styles/ShoppingHistory.css'
import { getHistory } from '../services/ProductService'
import { Alert } from '@blueprintjs/core'
import PurchaseHistory from '../components/PurchaseHistory'

export class ShoppingHistory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      alert: false,
      purchasesComponents: []
    }
    this.createComponents = this.createComponents.bind(this);
  }

  componentDidMount(){
    getHistory(this.props.userID, (err, purchases) => {
      if(err) {
        this.setState({alert: true})
      }
      else {
        this.setState({purchases: this.createComponents(purchases)})
      }
    })
  }

  createComponents(purchases){
    const components = [];
    let key = 11000;
    purchases.forEach((p) => {
      let c = <PurchaseHistory key={key} info={p}/>
      key = key + 1
      components.push(c);
    })
    return components
  }

  render(){
    return(
      <div>
        <div>
          <p className='sh-title'><FormattedMessage id='navbar.history'/></p>
          {this.state.purchases}
        </div>
        <Alert isOpen={this.state.alert}
               confirmButtonText={<FormattedMessage id='t.accept'/>}
               icon='error'
               intent='danger'
               onClose={() => {this.setState({alert: false})}}>
              <FormattedMessage id='t.error'/>
        </Alert>
      </div>
    )
  }

}

export default ShoppingHistory;