import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Alert as ALERTITA, Spinner } from '@blueprintjs/core';
import ShopSearch from '../forms/ShopSearch';
import ProductLoader from '../forms/ProductLoader';
import { searchProduct } from '../services/ProductService';
import { getAllProducts } from '../services/SellerService';
import SellerProductsComponent from './SellerProductsComponent';
import HomeNavBar from '../components/HomeNavBar';
import ProductComponent from './ProductComponent';
import { CartScreen } from './CartScreen';
import SalesScreen from './SalesScreen';
import ShoppingHistory from './ShoppingHistory';
import CSVLoader from '../forms/CSVLoader'
import '../styles/CSVLoader.css'

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopSearch: true,
            productLoader: true,
            profile: false,
            searchResult: false,
            productList: false,
            products: [],
            shoppingCart: false,
            alert: false,
            isLoading: false
        };
        this.handleEvent = this.handleEvent.bind(this);
        this.goHome = this.goHome.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.goProductList = this.goProductList.bind(this);
        this.goShoppingCart = this.goShoppingCart.bind(this);
        this.goShoppingHistory = this.goShoppingHistory.bind(this);
        this.goSalesList = this.goSalesList.bind(this);
    }

    handleEvent(name, value) {
        this.setState({ [name]: value });
    }

    goHome() {
        this.setState({
            shopSearch: true,
            productLoader: true,
            profile: false,
            searchResult: false,
            productList: false,
            shoppingCart: false,
            history: false,
            salesList: false
        });
    }

    goShoppingCart() {
        this.setState({
            shopSearch: false,
            productLoader: false,
            profile: false,
            searchResult: false,
            productList: false,
            shoppingCart: true,
            history: false,
            salesList: false
        });
    }

    goShoppingHistory() {
        this.setState({
            shopSearch: false,
            productLoader: false,
            profile: false,
            searchResult: false,
            productList: false,
            shoppingCart: false,
            history: true,
            salesList: false
        });
    }

    goProductList() {
        this.setState({ isLoading: true });
        getAllProducts()
            .then(products => {
                this.setState({
                    shopSearch: false,
                    productLoader: false,
                    profile: false,
                    searchResult: false,
                    productList: true,
                    shoppingCart: false,
                    products,
                    isLoading: false,
                    history: false,
                    salesList: false
                });
            })
            .catch(() => this.setState({ alert: true, isLoading: false }));
    }

    doSearch(text, distance) {
        this.setState({ isLoading: true, searchResult: false });
        searchProduct(text, distance)
            .then(res => {
                this.setState({
                    shopSearch: false,
                    productLoader: false,
                    profile: false,
                    searchResult: true,
                    productList: false,
                    shoppingCart: false,
                    products: res,
                    isLoading: false,
                    history: false,
                    salesList: false
                });

            }).catch(() => this.setState({ alert: true, isLoading: false }));
    }

    goSalesList() {
        this.setState({
            shopSearch: false,
            productLoader: false,
            profile: false,
            searchResult: false,
            productList: false,
            shoppingCart: false,
            history: false,
            salesList: true
        });
    }

    render() {
        const isSeller = this.props.isSeller;
        const isBuyer = this.props.isBuyer;
        const accountType = this.props.accountType;
        const user = this.props.currentUser;

        return (
            <div>
                <HomeNavBar accountType={accountType}
                            goHome={this.goHome}
                            showSellerProducts={this.goProductList}
                            onLogout={this.props.onLogout}
                            isSeller={isSeller}
                            handleSearch={this.doSearch}
                            goShoppingCart={this.goShoppingCart}
                            goShoppingHistory={this.goShoppingHistory}
                            goSalesList={this.goSalesList}/>
                {isBuyer && this.state.shopSearch && <ShopSearch/>}
                {this.state.searchResult && <ProductComponent products={this.state.products}/>}
                {isSeller && this.state.productLoader && 
                <div>
                    <span className='component-container'>
                        <ProductLoader userID={user.id}/>
                    </span>
                    <span className='component-container'>
                        <CSVLoader/>
                    </span>
                </div>}
                {isSeller && this.state.productList && <SellerProductsComponent
                    products={this.state.products}
                    shopId={user.id}/>}
                {isBuyer && this.state.shoppingCart && <CartScreen/>}
                {isBuyer && this.state.history && <ShoppingHistory userID={user.id}/>}
                {isSeller && this.state.salesList && <SalesScreen userID={user.id}/>}
                <ALERTITA isOpen={this.state.alert}
                          confirmButtonText='ACEPTAR'
                          icon='error'
                          intent='danger'
                          onClose={() => {
                              this.setState({ alert: false });
                          }}>
                    <FormattedMessage id='t.error'/>
                </ALERTITA>
                {this.state.isLoading &&
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Spinner size='100' intent='primary'/>
                </div>
                }
            </div>
        );
    }
}

export default withRouter(HomeScreen);