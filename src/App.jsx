import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '@blueprintjs/core';
import { ToastContainer, toast } from 'react-toastify';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getCurrentUser } from './util/APIUtils';
import PrivateRoute from './common/PrivateRoute';
import LoadingIndicator from './common/LoadingIndicator';
import NotFound from './common/NotFound';
import { ACCESS_TOKEN, BUYER, SELLER } from './constants';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/user/login/Login';
import OAuth2RedirectHandler from '../src/screens/user/oauth2/OAuth2RedirectHandler';
import CheckAddressHandler from '../src/screens/user/address/CheckAddressHandler';
import ProfileInfo from './components/ProfileInfo';
import RegisterScreen from './screens/RegisterScreen';
import { injectIntl } from 'react-intl';
import { Home } from './screens/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            accountType: null,
            loading: false
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        const { intl } = this.props;
        this.intl = intl;
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response.user,
                    userRol: response.rol,
                    missingAddress: response.missingAddress,
                    accountType: response.accountType,
                    isBuyer: response.accountType === BUYER,
                    isSeller: response.accountType === SELLER,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        toast.success(this.intl.formatMessage({id:'toast.bye'}), {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>;
        }

        return (
            <div className="app">
                <div className="app-body">
                    <ToastContainer autoClose={false}/>
                    <Switch>
                        {/*Esto debería ser un home que te permita buscar productos y que te los muestre ordenados por comercio. */}
                        {/*Adentro de home debería haber un componente que reciba una lista de comercios con productos, */}
                        {/*y adentro de ese componente, otro que sepa dibujar un commercio con sus productos.  */}
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login"
                               render={(props) => <Login
                                   authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                        <PrivateRoute path="/check-address"
                                      authenticated={this.state.authenticated}
                                      missingAddress={this.state.missingAddress}
                                      component={CheckAddressHandler}>
                        </PrivateRoute>

                        <PrivateRoute path="/update-account"
                                      authenticated={this.state.authenticated}
                                      user={this.state.currentUser}
                                      onLogout={this.handleLogout}
                                      component={RegisterScreen}>
                        </PrivateRoute>

                        <PrivateRoute path="/home"
                                      authenticated={this.state.authenticated}
                                      currentUser={this.state.currentUser}
                                      rol={this.state.userRol}
                                      accountType={this.state.accountType}
                                      isBuyer={this.state.isBuyer}
                                      isSeller={this.state.isSeller}
                                      onLogout={this.handleLogout}
                                      component={HomeScreen}>
                        </PrivateRoute>

                        <PrivateRoute path="/profile"
                                      authenticated={this.state.authenticated}
                                      userRol={this.state.userRol}
                                      isBuyer={this.state.isBuyer}
                                      component={ProfileInfo}>
                        </PrivateRoute>

                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
                <Alert stack={{ limit: 3 }}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}

export default injectIntl(App);
