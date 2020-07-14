import React from 'react'
import '../styles/PurchaseHistory.css'
import { FormattedMessage } from 'react-intl'
import { updateSale } from '../services/SellerService'
import { Button, Collapse, ButtonGroup, Spinner, Alert } from '@blueprintjs/core'

export class Sale extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      btnText: 'seller.show',
      collapse: false,
      details: [],
      state: 'PENDING',
      isLoading: false,
      alert: false
    }
    this.generateTitle = this.generateTitle.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.generateDetails = this.generateDetails.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.stateTranslator = this.stateTranslator.bind(this);
    this.colors = this.colors.bind(this);
  }

  componentDidMount() {
    const title = this.generateTitle();
    const details = this.generateDetails();
    this.setState({ title: title, details: details })
  }

  generateTitle() {
    let title = <span>
      <p><FormattedMessage id='t.buyer' />: <b>{this.props.info.name}</b></p>
      <p><FormattedMessage id='seller.pay' />: <b><FormattedMessage id={`cart.${this.props.info.options.payment}`} /></b></p>
      <p><FormattedMessage id='seller.del' />: <b>{this.props.info.options.deliver.toUpperCase()}</b></p>
    </span>
    return title;
  }

  handleUpdate(updateType) {
    this.setState({ isLoading: true });
    updateSale()
      .then(() => {
        this.setState({state: 'CONFIRMED', isLoading: false});
      })
      .catch(() => {
        this.setState({ alert: true, isLoading: false });
      })
  }

  handleCollapse() {
    const newValue = !this.state.collapse;
    const newText = this.state.btnText === 'seller.show' ? 'seller.hide' : 'seller.show';
    this.setState({ collapse: newValue, btnText: newText });
  }

  generateDetails() {
    const details = [];
    const products = this.props.info.products;
    let key = 14500
    products.forEach((p) => {
      let detail =
        <p key={key}>
          {p.productName} x{p.productAmmount}
        </p>
      key = key + 1;
      details.push(detail);
    })
    return details;
  }

  stateTranslator() {
    let translation = 'seller.h.pending'
    if (this.state.state === 'CANCELED') translation = 'seller.h.canceled'
    if (this.state.state === 'CONFIRMED') translation = 'seller.h.confirmed'
    return translation;
  }

  colors() {
    let colors = {}
    if (this.state.state === 'CANCELED') colors = { back: '#FCA9B1', bor: ' solid #C90A1A' }
    if (this.state.state === 'CONFIRMED') colors = { back: '#B3F57B', bor: 'solid #78F70C' }
    if (this.state.state === 'PENDING') colors = { back: '#E3E3E3', bor: 'solid #7A7A7A' }
    return (colors)
  }

  render() {
    return (
      <div className='ph-container' style={{ backgroundColor: this.colors().back, border: this.colors().bor }}>
        <span className='ph-title' style={{ fontSize: '15px' }}>
          {this.state.title}
        </span>
        <div className='ph-title' style={{ fontSize: '15px' }}>
          <FormattedMessage id='seller.h.state' />
          <b><FormattedMessage id={this.stateTranslator()} /></b>
        </div>
        <ButtonGroup className='btn-group' fill='true' vertical='true'>
          {this.state.state === 'PENDING' &&
            <span>
              <Button onClick={() => this.handleUpdate('CONFIRMED')} intent='success'>
                <FormattedMessage id='seller.h.conf' />
              </Button>
              <Button className='mid-btn' 
                onClick={() => this.handleUpdate('CANCELED')} intent='danger'>
                <FormattedMessage id='seller.h.canc' />
              </Button>
            </span>}
          <Button onClick={this.handleCollapse} intent='primary'>
            <FormattedMessage id={this.state.btnText} />
          </Button>
        </ButtonGroup>
        <span className='ph-detail'>
          <Collapse className='ph-collapse' isOpen={this.state.collapse}>
            {this.state.details}
          </Collapse>
        </span>
        <Alert isOpen={this.state.alert}
          confirmButtonText={<FormattedMessage id='t.accept' />}
          intent='danger'
          icon='error'
          onClose={() => this.setState({ alert: false })}>
          <FormattedMessage id='t.error' />
        </Alert>
        {this.state.uploading &&
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Spinner size='100' intent='primary' />
          </div>}
      </div>
    )
  }
}

export default Sale;