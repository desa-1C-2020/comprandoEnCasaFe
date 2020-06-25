import React from 'react'
import '../styles/ShopSearch.css'
import { InputGroup, Button } from '@blueprintjs/core'
import SearchResult from './SearchResult';
import { injectIntl, FormattedMessage } from 'react-intl'

export class ShopSearch extends React.Component {

  constructor(){
    super();
    this.state = {
      showResults: false,
      lat: '',
      lng: '',
      max: '2000'
    }
    this.openResultsModal = this.openResultsModal.bind(this)
    this.closeResultsModal = this.closeResultsModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.setState({
      lat: this.props.address.latitud, 
      lng: this.props.address.longitud
    })
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  openResultsModal(){
    this.setState({showResults: true})
  }

  closeResultsModal(){
    this.setState({showResults: false})
  }

	render() {
    const { intl } = this.props;
    return (
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <div className="background">
          <h1 className="title"><FormattedMessage id='shopsearch.title'/></h1>
          <h2 className="title"><FormattedMessage id='shopsearch.address'/></h2>
          <div className="input-container">
            <InputGroup className="input" 
                        type="text" 
                        name="lng"
                        value={this.state.lng}
                        onChange={this.handleChange} 
                        placeholder={intl.formatMessage({id:'t.lgn'})}
            />
            <InputGroup className="input" 
                        type="text" 
                        name="lat"
                        value={this.state.lat} 
                        onChange={this.handleChange}
                        placeholder={intl.formatMessage({id:'t.lat'})}
            />
          </div>
          <h2 className="title"><FormattedMessage id='shopsearch.max'/></h2>
          <div className="input-container">
          <InputGroup className="input" 
                      type="number" 
                      name="max"
                      value={this.state.max} 
                      onChange={this.handleChange}
                      placeholder={intl.formatMessage({id:'shopsearch.meters'})}
          />
          </div>
          <Button className="search-button" onClick={this.openResultsModal} icon='search'>
            <FormattedMessage id='t.search'/>
          </Button>
          {this.state.showResults && <SearchResult isOpen={this.state.showResults} closeModal={this.closeResultsModal} {...this.state}/>}
        </div>
      </div>
		);
	}
}

export default injectIntl(ShopSearch)