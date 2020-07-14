import React from 'react'
import '../styles/Details.css'
import { deliveryOptions } from '../services/PurchaseService'
import { FormattedMessage } from 'react-intl'
import { Alert, Spinner } from '@blueprintjs/core'

export class DeliveryDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      strDate: '',
      isLoading: false,
      alert: false,
      success: false
    }
    this.formatDate = this.formatDate.bind(this);
    this.addZeroes = this.addZeroes.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    deliveryOptions()
      .then((localDateTime) => {
        let date = new Date(localDateTime);
        let dateAsString = this.formatDate(date);
        this.props.updateDate(dateAsString);
        this.setState({ date: date, strDate: dateAsString, isLoading: false, success: true });
      })
      .catch((_error) => {
        this.props.updateDate('');
        this.setState({ alert: true, isLoading: false, success: false });
      })
  }

  formatDate(date) {
    let d = new Date(date);
    const year = d.getFullYear();
    const month = this.addZeroes(d.getMonth().toString());
    const day = this.addZeroes(d.getDate().toString());
    const hour = this.addZeroes(d.getHours().toString());
    const minute = this.addZeroes(d.getMinutes().toString());
    const second = '00'
    return (`${year}${month}${day}:${hour}${minute}${second}`)
  }

  addZeroes(string) {
    let newString = string;
    if (string.length === 1) {
      newString = '0' + string;
    }
    return newString
  }

  render() {
    return (
      <div className='detail-container'>
        {this.state.success &&
          <div className='delivery-info'>
            <FormattedMessage id='delivery.arrive' />
            {this.state.date.toLocaleDateString()}
            <FormattedMessage id='delivery.at' />
            {this.state.date.toLocaleTimeString()}
          </div>}
        <Alert isOpen={this.state.alert}
          confirmButtonText={<FormattedMessage id='t.accept' />}
          intent='danger'
          icon='error'
          onClose={() => this.setState({ alert: false })}>
          <FormattedMessage id='t.error' />
        </Alert>
        {this.state.isLoading &&
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Spinner size='100' intent='primary' />
          </div>
        }
      </div>
    )
  }

}

export default DeliveryDetails