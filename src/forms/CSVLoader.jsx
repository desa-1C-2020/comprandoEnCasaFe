import React from 'react'
import { FileInput, Button, Alert, Spinner, Icon, Tooltip } from '@blueprintjs/core';
import { injectIntl, FormattedMessage } from 'react-intl';
import { saveProductsBatch } from '../services/SellerService';
import * as Papa from 'papaparse';
import '../styles/CSVLoader.css';

export class CSVLoader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            uploading: false,
            productArray: [],
            fileName: '',
            totalProducts: 0,
            alert: false,
            alertMsg: 'csv.success',
            alertIntent: 'success'
        };
        this.handleReadCSV = this.handleReadCSV.bind(this);
        this.uploadProducts = this.uploadProducts.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    handleReadCSV(event) {
        if (event.target.files) {
            const name = event.target.files[0].name;
            Papa.parse(event.target.files[0], {
                complete: function (results) {
                    let products = results.data;
                    let lastElem = results.data.length;
                    products.splice(lastElem - 1, 1);
                    products.splice(0, 1);
                    this.setState({
                        productArray: products,
                        fileName: name,
                        isLoaded: true,
                        totalProducts: products.length
                    });
                }.bind(this)
            });
        }
    }

    getProductList(productsObjet) {
        return productsObjet.map(productObject => {
            const productParts = productObject[0].split('|');
            return {
                name: productParts[0],
                brand: productParts[1],
                stock: parseInt(productParts[2]),
                price: parseFloat(productParts[3]),
                imageUrl: productParts[4]
            };
        });
    }

    uploadProducts() {
        const productsObjet = this.state.productArray;
        this.setState({ uploading: true });

        const productList = this.getProductList(productsObjet);

        console.log(productList);

        saveProductsBatch(productList)
            .then(() => {
                this.setState({
                    uploading: false,
                    alert: true,
                    alertMsg: 'csv.success',
                    alertIntent: 'success'
                });

            }).catch(
            this.setState({
                uploading: false,
                alert: true,
                alertMsg: 't.error',
                alertIntent: 'danger'
            })
        );
    }

    resetState() {
        this.setState({
            isLoaded: false,
            uploading: false,
            productArray: [],
            fileName: '',
            totalProducts: 0,
            alert: false,
            alertMsg: 'csv.success',
            alertIntent: 'success'
        });
    }

  render(){
    const { intl } = this.props;
    return(
      <div className='csv-loader'>
        <p className='csv-title'><b><FormattedMessage id='csv.title'/></b>
        <Tooltip content={<FormattedMessage id='csv.info'/>}>
          <Icon className='info-icon' icon='info-sign' iconSize='30'></Icon>
        </Tooltip>
        </p>
         <FileInput buttonText={intl.formatMessage({id:'t.search'})}
                  id='file-element'
                  fill='true'
                  large='true'
                  hasSelection={this.state.isLoaded}
                  onChange={this.handleReadCSV}
                  text={this.state.isLoaded ? this.state.fileName : <FormattedMessage id='csv.search'/>}/>
        <Button className='csv-btn' disabled={!this.state.isLoaded} onClick={this.uploadProducts}>
          <FormattedMessage id='csv.load'/>
        </Button> 
        <Alert isOpen={this.state.alert}
                confirmButtonText={<FormattedMessage id='t.accept'/>}
                intent={this.state.alertIntent}
                icon={this.state.alertIntent === 'success' ? 'endorsed' : 'error'}
                onClose={this.resetState}>
          <FormattedMessage id={this.state.alertMsg}/>
        </Alert>
        {this.state.uploading &&
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner size='100' intent='primary'/>
        </div>}
      </div>
    )  
  }
}

export default injectIntl(CSVLoader);