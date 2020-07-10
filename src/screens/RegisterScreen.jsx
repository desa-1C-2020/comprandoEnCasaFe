import React from 'react';
import BuyerForm from '../forms/BuyerForm';
import SellerForm from '../forms/SellerForm';
import { registerBuyer, registerSeller } from '../services/UserService';
import { Redirect, withRouter } from 'react-router-dom';
import { RadioGroup, Radio, Button, Spinner } from '@blueprintjs/core';
import '../styles/RegisterScreen.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import { BUYER } from '../constants';
import { toast } from 'react-toastify';

class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: BUYER,
            buyerInfo: {},
            sellerInfo: {},
            alertField: false,
            errorMsg: '',
            isLoading: false,
            updateSuccess: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.goBack = this.goBack.bind(this);
        this.setBuyerInfo = this.setBuyerInfo.bind(this);
        this.setSellerInfo = this.setSellerInfo.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.registerBuyer = this.registerBuyer.bind(this);
        this.isValidBuyer = this.isValidBuyer.bind(this);
        this.registerSeller = this.registerSeller.bind(this);
        const { intl } = this.props;
        this.intl = intl;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRadio(event) {
        this.setState({ form: event.target.value });
    }

    goBack() {
        this.props.history.push('/login');
    }

    setBuyerInfo(info) {
        this.setState({ sellerInfo: {}, buyerInfo: info });
    }

    setSellerInfo(info) {
        this.setState({ sellerInfo: info, buyerInfo: {} });
    }

    handleRegister() {
        if (this.state.form === BUYER) {
            this.registerBuyer();
        } else {
            this.registerSeller();
        }
    }

    updateUser(onUpdateUser, isValid, message) {
        if (isValid) {
            this.setState({ isLoading: true });
            onUpdateUser
                .then(response => {
                    this.setState({ isLoading: false, updateSuccess: true });
                    this.props.history.push('/home');
                    this.showOnSuccessful(message);
                })
                .catch(() => {
                    this.setState({ isLoading: false });
                    this.showOnError(message);
                });
        } else {
            this.onInvalidFields();
        }
    }

    registerBuyer() {
        this.updateUser(registerBuyer(this.state.buyerInfo), this.isValidBuyer(), 'dirección');
    }

    registerSeller() {
        this.updateUser(registerSeller(this.state.sellerInfo), this.isValidSeller(), 'comercio');
    }

    showOnSuccessful(message) {
        toast.success(`😀 Gracias por actualizar tu ${message} `, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    showOnError(message) {
        toast.error(`😔 No pudimos actualizar tu ${message}`, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    onInvalidFields() {
        toast.warn(`${this.intl.formatMessage({ id: 't.fillfields' })}`, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    isValidBuyer() {
        const buyer = this.state.buyerInfo;
        return (buyer.name !== undefined && buyer.name !== '' &&
            buyer.surname !== '' && buyer.email !== '' && buyer.address.street !== '' &&
            buyer.address.latitud !== '' && buyer.address.longitud !== '');
    }

    isValidSeller() {
        const seller = this.state.sellerInfo;
        return (
            seller !== undefined && seller.user.name !== '' &&
            seller.user.surname !== '' && seller.user.email !== '' && seller.commerceName !== '' &&
            seller.commerceBussinessSector !== '' && seller.commerceAddress.street !== '' &&
            seller.commerceAddress.latitud !== '' && seller.commerceAddress.longitud !== '' &&
            seller.arrivalRange !== ''
        );
    }

    render() {
        if (this.updateSuccess) {
            return <Redirect to={{
                pathname: '/home',
                state: { from: this.props.location }
            }}/>;
        } else {
            return (
                <div>
                    <div className="register-container">
                        <p className="register-title">
                            <FormattedMessage id='register.title'/>
                        </p>
                        <p className="register-sub">
                            <FormattedMessage id='register.subtitle'/>
                        </p>
                        <RadioGroup
                            className="radio"
                            inline={true}
                            onChange={this.handleRadio}
                            selectedValue={this.state.form}>
                            <Radio label={this.intl.formatMessage({ id: 't.buyer' })} value='buyer' large={true}/>
                            <Radio label={this.intl.formatMessage({ id: 't.seller' })} value='seller' large={true}/>
                        </RadioGroup>


                        {this.state.form === BUYER ?
                            <div className="buyer-form"><BuyerForm user={this.props.user} update={this.setBuyerInfo}/>
                            </div>
                            : <div className="seller-form"><SellerForm user={this.props.user}
                                                                       update={this.setSellerInfo}/>
                            </div>}

                        <div className="buttons">
                            <Button className="register-btn" intent="success" onClick={this.handleRegister}>
                                <FormattedMessage id='t.register'/>
                            </Button>
                            <Button intent="danger" onClick={this.goBack}>
                                <FormattedMessage id='t.goback'/>
                            </Button>
                        </div>

                    </div>

                    {this.state.isLoading &&
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Spinner size='100' intent='primary'/>
                    </div>
                    }
                </div>
            );
        }
    }

}

export default injectIntl(withRouter(RegisterScreen));