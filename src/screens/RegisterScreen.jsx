import React from 'react';
import BuyerForm from '../forms/BuyerForm';
import SellerForm from '../forms/SellerForm';
import { registerBuyer, registerSeller } from '../services/UserService';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Radio, RadioGroup, Spinner } from '@blueprintjs/core';
import '../styles/RegisterScreen.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import { BUYER } from '../constants';
import { toast } from 'react-toastify';
import { coordsFrom } from '../services/GoogleService';

class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disableRegister: true,
            disableValidate: false,
            form: BUYER,
            sellerInfo: {},
            address: {
                street: '',
                number: '',
                city: ''
            },
            addressLocation: {
                street: null,
                latitud: null,
                longitud: null
            },
            alertField: false,
            errorMsg: '',
            isLoading: false,
            updateSuccess: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.setAddressInfo = this.setAddressInfo.bind(this);
        this.setSellerInfo = this.setSellerInfo.bind(this);
        this.register = this.register.bind(this);
        this.registerBuyer = this.registerBuyer.bind(this);
        this.registerSeller = this.registerSeller.bind(this);
        this.getLocationFromAddress = this.getLocationFromAddress.bind(this);
        const { intl } = this.props;
        this.intl = intl;
    }

    register() {
        if (this.state.form === BUYER) {
            this.registerBuyer();
        } else {
            this.registerSeller();
        }
    }

    registerBuyer() {
        this.updateUser(() => registerBuyer({
            address: {
                street: this.state.addressLocation.street,
                latitud: this.state.addressLocation.latitud,
                longitud: this.state.addressLocation.longitud
            }
        }), this.isValidAddress() && this.hasAddressLocation(), this.intl.formatMessage({id:'t.address'}));
    }

    registerSeller() {
        const sellerInfo = this.state.sellerInfo;
        const commerce = {
            name: sellerInfo.commerceName,
            businessSector: sellerInfo.commerceBusinessSector,
            address: {
                street: this.state.addressLocation.street,
                latitud: this.state.addressLocation.latitud,
                longitud: this.state.addressLocation.longitud
            },
            paymentMethods: sellerInfo.paymentMethods,
            daysAndHoursOpen: sellerInfo.daysAndHoursOpen,
            arrivalRange: sellerInfo.arrivalRange
        };

        this.updateUser(() => registerSeller(commerce),
            this.isValidSeller() && this.isValidAddress() && this.hasAddressLocation(), 'comercio');
    }

    getLocationFromAddress() {
        if (this.isValidAddress()) {
            coordsFrom(this.state.address)
                .then(locationObject => {
                        this.setState(prevState => {
                            const addressLocation = { ...prevState.addressLocation };
                            addressLocation.latitud = locationObject.location.lat;
                            addressLocation.longitud = locationObject.location.lng;
                            addressLocation.street = locationObject.formattedAddress;
                            return { addressLocation };
                        });
                        this.setState({ disableRegister: false, disableValidate: true });
                        this.showOnSuccessful(this.intl.formatMessage({ id:'toast.latlgn'}));
                    }
                ).catch(error => {
                this.setState({ disableRegister: true, disableValidate: false });
                console.log(`Fallo al requerir las coordenadas para [${JSON.stringify(this.state.address)}]. 
                    Respuesta: [${error}]`);
                this.onAddressValidationError();
            });
        } else {
            this.onAddressValidationError();
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRadio(event) {
        this.setState({ form: event.target.value });
    }

    setAddressInfo(changed) {
        if (this.state.disableValidate) {
            this.setState({ disableRegister: true, disableValidate: false });
        }
        this.setState(prevState => {
            const address = Object.assign(prevState.address, changed);
            return { address };
        });
    }

    setSellerInfo(info) {
        this.setState({ sellerInfo: info });
    }

    updateUser(onUpdateUser, canUpdate, message) {
        if (canUpdate) {
            this.setState({ isLoading: true });
            onUpdateUser()
                .then(response => {
                    this.setState({ isLoading: false, updateSuccess: true });
                    this.props.history.push('/home');
                    this.showOnSuccessful(message);
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    this.showOnError(message);
                });
        } else {
            this.onInvalidFields();
        }
    }

    isValidSeller() {
        const seller = this.state.sellerInfo;
        return seller !== undefined && seller.commerceName !== '' && seller.commerceBussinessSector !== ''
            && seller.arrivalRange !== '' && seller.daysAndHoursOpen !== [];
    }

    isValidAddress() {
        const address = this.state.address;
        return address.street !== '' && address.number !== '' && address.city !== '';
    }

    hasAddressLocation() {
        const addressLocation = this.state.addressLocation;
        return (addressLocation.latitud !== '' && addressLocation.longitud !== '' && addressLocation.street !== '');
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

    showOnSuccessful(message) {
        toast.success(this.intl.formatMessage({id:'toast.update'}) + message , {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    onAddressValidationError() {
        toast.warn(this.intl.formatMessage({id:'toast.addwarning'}), {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    showOnError(message) {
        toast.error(this.intl.formatMessage({id:'toast.updatefail'}) + message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
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
                            <div className="buyer-form"><BuyerForm user={this.props.user}
                                                                   address={this.state.address}
                                                                   updateRegisterState={this.setAddressInfo}/>
                            </div>
                            :
                            <div className="seller-form"><SellerForm user={this.props.user}
                                                                     address={this.state.address}
                                                                     updateRegisterState={this.setAddressInfo}
                                                                     update={this.setSellerInfo}/>
                            </div>}

                        <div className="buttons">
                            <Button className="register-btn" intent="success" onClick={this.register}
                                    disabled={this.state.disableRegister}>
                                <FormattedMessage id='t.register'/>
                            </Button>
                            <Button intent="danger" onClick={this.props.onLogout} className="goback-btn">
                                <FormattedMessage id='t.goback'/>
                            </Button>
                            <Button intent="warning" onClick={this.getLocationFromAddress}
                                    disabled={this.state.disableValidate}>
                                {this.state.disableValidate ? 
                                <FormattedMessage id='register.validated'/> : 
                                <FormattedMessage id='register.validate'/>}
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