import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import Login from './screens/user/login/Login';
import RegisterScreen from './screens/RegisterScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants/index';
import LoadingIndicator from './common/LoadingIndicator';
import AppHeader from './common/AppHeader';
import PrivateRoute from './common/PrivateRoute';
import NotFound from './common/NotFound';
import Alert from 'react-s-alert';
import './App.css';
import OAuth2RedirectHandler from '../src/screens/user/oauth2/OAuth2RedirectHandler';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
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
        Alert.success('You\'re safely logged out!');
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
                <div className="app-top-box">
                    <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                </div>
                <div className="app-body">
                    <Switch>
                        <Route path="/"
                               render={(props) => <Login
                                   authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route exact path='/home' component={HomeScreen}/>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
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

export default App;
