import React from 'react'
import { FormattedMessage } from 'react-intl'
import '../styles/ShoppingHistory.css'
import { Alert } from '@blueprintjs/core'
import { getSales } from '../services/SellerService'
import Sale from '../components/Sale'

export class SalesScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      alert: false,
      salesComponents: []
    }
    this.createComponents = this.createComponents.bind(this);
  }

  componentDidMount(){
    getSales(this.props.userID, (err, sales) => {
      if(err) {
        this.setState({alert: true})
      }
      else {
        this.setState({salesComponents: this.createComponents(sales)})
      }
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
        </Alert>
      </div>
    )
  }

}

export default SalesScreen;