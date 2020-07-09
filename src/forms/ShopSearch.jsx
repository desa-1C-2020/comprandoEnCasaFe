import React from 'react';
import '../styles/ShopSearch.css';
import { InputGroup, Button } from '@blueprintjs/core';
import SearchResult from '../components/SearchResult';
import { injectIntl, FormattedMessage } from 'react-intl';

export class ShopSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            showResults: false,
            max: '0'
        };
        this.openResultsModal = this.openResultsModal.bind(this);
        this.closeResultsModal = this.closeResultsModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    openResultsModal() {
        this.setState({ showResults: true });
    }

    closeResultsModal() {
        this.setState({ showResults: false });
    }

    render() {
        const { intl } = this.props;
        return (
            <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <div className="background">
                    <h1 className="title"><FormattedMessage id='shopsearch.title'/></h1>
                    <h2 className="title"><FormattedMessage id='shopsearch.max'/></h2>
                    <div className="input-container">
                        <InputGroup className="input"
                                    type="number"
                                    name="max"
                                    value={this.state.max}
                                    onChange={this.handleChange}
                                    placeholder={intl.formatMessage({ id: 'shopsearch.meters' })}
                        />
                    </div>
                    <Button className="search-button" onClick={this.openResultsModal} icon='search'>
                        <FormattedMessage id='t.search'/>
                    </Button>
                    {this.state.showResults &&
                    <SearchResult isOpen={this.state.showResults} closeModal={this.closeResultsModal} {...this.state}/>}
                </div>
            </div>
        );
    }
}

export default injectIntl(ShopSearch);