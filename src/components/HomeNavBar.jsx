import React from 'react'
import '../styles/HomeNavBar.css'
import logo from '../CEC.png'
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup,
Menu, MenuItem, MenuDivider, Popover, Position, Alert} from '@blueprintjs/core'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';

export class HomeNavBar extends React.PureComponent {

	constructor(props){
		super(props);
		this.state = {
			search: '',
			distance: '2000',
			alert: false
		}
		this.openProfile = this.openProfile.bind(this);
		this.goHome = this.goHome.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.goProductList = this.goProductList.bind(this);
		this.goShoppingCart = this.goShoppingCart.bind(this);
	}

	openProfile(){
        this.props.history.push('/profile');
	}

	goHome(){
		this.setState({search: ''})
		this.props.goHome();
	}

	doSearch(){
		if(this.state.search !== ''){
			this.props.handleSearch(this.state.search, this.state.distance);
			this.setState({search: ''})
		}
	}

	goProductList(){
		this.props.showSellerProducts();
	}

	goShoppingCart(){
		this.props.goShoppingCart();
	}

	render() {
		const { intl } = this.props;
		const isSeller = this.props.isSeller;
		const profileMenu = (
			<Menu>
				<MenuItem icon="id-number"
									text={isSeller ? <FormattedMessage id='navbar.info'/>
									: <FormattedMessage id='navbar.data'/>}
									onClick={this.openProfile}/>

				{!isSeller && <MenuItem icon="notifications"
																text={intl.formatMessage({id:'navbar.alert'})}
																onClick={() => {this.setState({alert: true})}}/>}
				<MenuDivider />
				<MenuItem icon="log-out"
									text={intl.formatMessage({id:'navbar.logout'})}
									onClick={this.props.onLogout}/>
			</Menu>
		);
		const dropdownMenu = (
			<Menu>
				<MenuItem icon="home" text={intl.formatMessage({id:'navbar.home'})} onClick={this.goHome}/>
				<MenuDivider />
				{isSeller && <MenuItem icon="shop"
															 text={intl.formatMessage({id:'navbar.myproducts'})}
															 onClick={this.goProductList}/>}
				{!isSeller && <MenuItem icon="shopping-cart"
																text={intl.formatMessage({id:'navbar.myshopping'})}
																onClick={this.goShoppingCart}/>}
			</Menu>
		);
		const searchButton = <Button minimal={true} onClick={this.doSearch}>
			<FormattedMessage id='t.search'/></Button>
		return (
			<Navbar>
				<div className="desktop">
					<NavbarGroup align={Alignment.LEFT}>
						<NavbarHeading>
							<img className="logo" alt="Comprando en casa" src={logo} />
						</NavbarHeading>
						<NavbarDivider />
						<Button className={Classes.MINIMAL}
										icon="home"
										text={intl.formatMessage({id:'navbar.home'})}
										onClick={this.goHome}/>
						{isSeller && <Button className={Classes.MINIMAL}
																 icon="shop"
																 text={intl.formatMessage({id:'navbar.myproducts'})}
																 onClick={this.goProductList}/>}
						{!isSeller && <Button className={Classes.MINIMAL}
																	icon="shopping-cart"
																	text={intl.formatMessage({id:'navbar.myshopping'})}
																	onClick={this.goShoppingCart}/>}
						<NavbarDivider />
						{!isSeller &&<InputGroup style={{width: '300px'}}
																		 type="search"
																		 leftIcon="search"
																		 placeholder={intl.formatMessage({id:'navbar.search'})}
																		 value={this.state.search}
																		 onChange={(e) => this.setState({search: e.target.value})}
																		 rightElement={searchButton}/>}
						{!isSeller && <InputGroup style={{width: '100px', marginLeft: '5px'}}
																			type="number"
																			leftIcon="map-marker"
																		 	value={this.state.distance}
																		 	onChange={(e) => this.setState({distance: e.target.value})}/>}
					</NavbarGroup>
					<NavbarGroup align={Alignment.RIGHT}>
						<Popover content={profileMenu} position={Position.RIGHT_BOTTOM}>
							<Button className={Classes.MINIMAL}
											icon={isSeller ? 'shop' : 'user'}
											text={isSeller ? <FormattedMessage id='navbar.mycommerce'/>
											: <FormattedMessage id='navbar.myprofile'/>} />
						</Popover>
					</NavbarGroup>
				</div>
				<div className="mobile">
					<NavbarGroup align={Alignment.CENTER}>
					<NavbarHeading>
							<img className="logo" alt="Comprando en casa" src={logo} />
						</NavbarHeading>
						<span style={{width: '100%'}}>
						{!isSeller && <InputGroup style={{width: '100%'}}
																			type="search"
																			leftIcon="search"
																			placeholder={intl.formatMessage({id:'navbar.search'})}
																			value={this.state.search}
																			onChange={(e) => this.setState({search: e.target.value})}
																			rightElement={searchButton}/>}
						</span>
						{!isSeller && <InputGroup style={{width: '75px', marginLeft: '5px'}}
																			type="text"
																			leftIcon="map-marker"
																		 	value={this.state.distance}
																		 	onChange={(e) => this.setState({distance: e.target.value})}/>}
						<NavbarDivider />
						<Popover content={dropdownMenu} position={Position.RIGHT_BOTTOM}>
              <Button className={Classes.MINIMAL} icon="menu"/>
            </Popover>
						<NavbarDivider />
						<Popover content={profileMenu} position={Position.RIGHT_BOTTOM}>
              <Button className={Classes.MINIMAL} icon={isSeller ? 'shop' : 'person'}/>
            </Popover>
					</NavbarGroup>
				</div>
				<Alert isOpen={this.state.alert}
               confirmButtonText={intl.formatMessage({id:'t.accept'})}
							 intent='warning'
							 icon='wrench'
               onClose={() => {this.setState({alert: false})}}>
          <FormattedMessage id='t.commingsoon'/>
        </Alert>
			</Navbar>
		);
	}
}

export default injectIntl(HomeNavBar)