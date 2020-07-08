import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import Login from './screens/user/login/Login';
import RegisterScreen from './screens/RegisterScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from './util/APIUtils';
import LoadingIndicator from './common/LoadingIndicator';
import PrivateRoute from './common/PrivateRoute';
import NotFound from './common/NotFound';
import Alert from 'react-s-alert';
import './App.css';
import OAuth2RedirectHandler from '../src/screens/user/oauth2/OAuth2RedirectHandler';
import ProfileInfo from './components/ProfileInfo';
import { BUYER, SELLER } from './constants';

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
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                console.log('dentro app: ' + JSON.stringify(response.user));
                this.setState({
                    currentUser: response.user,
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

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        console.log('dentro app state 1:: ' + JSON.stringify(this.state.authenticated));
        console.log('dentro app state 2:: ' + JSON.stringify(this.state.currentUser));
        console.log('dentro app state 3  :: ' + JSON.stringify(this.state.accountType));
        if (this.state.loading) {
            return <LoadingIndicator/>;
        }

        return (
            <div className="app">
                <div className="app-body">
                    <Switch>
                        <Route path="/login"
                               render={(props) => <Login
                                   authenticated={this.state.authenticated} {...props} />}></Route>

                        {/*<PrivateRoute path="/home" authenticated={this.state.authenticated} currentUser={this.state.currentUser}*/}
                        {/*accountType={this.state.accountType} component={HomeScreen}></PrivateRoute>*/}

                        <Route path="/home"
                               render={(props) => <HomeScreen authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                              accountType={this.state.accountType} isBuyer={this.state.isBuyer}
                                                              isSeller={this.state.isSeller}{...props} />}></Route>

                        <Route path="/profile"
                               render={(props) => <ProfileInfo isOpen={this.state.profile} isBuyer={this.state.isBuyer}
                                                               user={this.state.currentUser} {...props} />}></Route>


                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                        <Route component={NotFound}></Route>
                        {/*Para manejar componentes en paths privados. Este wrappea que cada componente privado chequee si está logeado o no.*/}
                        {/*<PrivateRoute path="/finder" authenticated={this.state.authenticated} currentUser={this.state.currentUser}*/}
                        {/*component={ProductFinderWithAddress}></PrivateRoute>*/}

                        {/*Esto debería ser un home que te permita buscar productos y que te los muestre ordenados por comercio. */}
                        {/*Adentro de home debería haber un componente que reciba una lista de comercios con productos, */}
                        {/*y adentro de ese componente, otro que sepa dibujar un commercio con sus productos.  */}
                        {/*<Route path="/" component={Home}></Route>*/}
                    </Switch>
                </div>
                <Alert stack={{ limit: 3 }}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}

export default App;
