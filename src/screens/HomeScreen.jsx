import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import ShopSearch from '../forms/ShopSearch';
import { withRouter } from 'react-router-dom';
import ProductComponent from './ProductComponent';
import { searchProduct } from '../services/ProductService';
import { getAllProducts } from '../services/SellerService';
import { Alert as ALERTITA, Spinner } from '@blueprintjs/core';
import ProductLoader from '../forms/ProductLoader';
import SellerProductsComponent from './SellerProductsComponent';
import { FormattedMessage } from 'react-intl';
import { CartScreen } from './CartScreen';
import { toast } from 'react-toastify';

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
    }

    handleEvent(name, value) {
        this.setState({ [name]: value });
    }

    goHome() {
        // this.setState({
        //     shopSearch: true,
        //     productLoader: true,
        //     profile: false,
        //     searchResult: false,
        //     productList: false,
        //     shoppingCart: false
        // });
        toast.success('🦄Vamos a casa!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });
    }

    goShoppingCart() {
        toast.success('🦄El carrito!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });
        // this.setState({
        //     shopSearch: false,
        //     productLoader: false,
        //     profile: false,
        //     searchResult: false,
        //     productList: false,
        //     shoppingCart: true
        // });
    }

    goProductList() {
        toast.success('🦄Buscando productos!', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });
        // const id = this.props.location.state.accountInfo.user.id;
        // this.setState({ isLoading: true });
        // getAllProducts()
        //     .then(products => this.setState({
        //         shopSearch: false,
        //         productLoader: false,
        //         profile: false,
        //         searchResult: false,
        //         productList: true,
        //         shoppingCart: false,
        //         products,
        //         isLoading: false
        //     }))
        //     .catch(() => this.setState({ alert: true, isLoading: false }));
    }

    doSearch(text, distance) {
        const id = parseInt(this.props.currentUser.id);
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
                    isLoading: false
                });

            }).catch((err) => {
            this.setState({ alert: true, isLoading: false });
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
                            goShoppingCart={this.goShoppingCart}/>
                {isBuyer && this.state.shopSearch && <ShopSearch/>}
                {this.state.searchResult && <ProductComponent products={this.state.products}/>}
                {/*{isSeller && this.state.productLoader && <ProductLoader userID={user.id}/>}*/}
                {/*{isSeller && this.state.productList && <SellerProductsComponent*/}
                {/*products={this.state.products}*/}
                {/*shopId={user.id}/>}*/}
                {isBuyer && this.state.shoppingCart && <CartScreen/>}
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