import React from 'react'
import { FormattedMessage } from 'react-intl'
import '../styles/ShoppingHistory.css'
import { getHistory } from '../services/ProductService'
import { Alert } from '@blueprintjs/core'

export class ShoppingHistory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      alert: true,
      purchasesComponents: []
    }
    this.createComponents = this.createComponents.bind(this);
  }

  componentDidMount(){
    getHistory(this.props.userID, (err, purchases) => {
      if(err) this.setState({alert: true})
      else this.setState({purchases: this.createComponents(purchases)})
    })
  }

  createComponents(purchases){
    // TODO - luego de crear componente, armarlos aca
    return purchases
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