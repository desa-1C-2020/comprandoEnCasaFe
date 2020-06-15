import React from 'react'
import '../styles/HomeNavBar.css'
import logo from '../CEC.png'
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup,
Menu, MenuItem, MenuDivider, Popover, Position, Alert} from '@blueprintjs/core'

export class HomeNavBar extends React.PureComponent {

	constructor(props){
		super(props);
		this.state = {
			search: '',
			alert: false
		}
		this.openProfile = this.openProfile.bind(this);
		this.logOut = this.logOut.bind(this);
		this.goHome = this.goHome.bind(this);
		this.doSearch = this.doSearch.bind(this);
	}

	openProfile(){
		this.props.handleProfile();
	}

	goHome(){
		this.setState({search: ''})
		this.props.goHome();
	}

	logOut(){
		this.props.handleLogOut();
	}

	doSearch(){

		if(this.state.search !== ''){
			this.props.handleSearch(this.state.search);
			this.setState({search: ''})
		}	
	}

	render() {
		const isSeller = this.props.accountType === 'seller'
		const profileMenu = (
			<Menu>
				<MenuItem icon="id-number" 
									text={isSeller ? 'Información' : 'Mis datos'} 
									onClick={this.openProfile}/>
				{!isSeller && <MenuItem icon="notifications" 
																text="Alertas" 
																onClick={() => {this.setState({alert: true})}}/>}
				<MenuDivider />
				<MenuItem icon="log-out" 
									text="Cerrar sesión"
									onClick={this.logOut}/>
			</Menu>
		);
		const dropdownMenu = (
			<Menu large={true} className="mobile">
				<MenuItem icon="home" text="Inicio" onClick={this.goHome}/>
				<MenuDivider />
				{isSeller && <MenuItem icon="shop" text="Mis productos" />}
				{!isSeller && <MenuItem icon="shopping-cart" 
																text="Mis compras" 
																onClick={()=> this.setState({alert: true})}/>}
			</Menu>
		);
		const searchButton = <Button minimal={true} onClick={this.doSearch}>BUSCAR</Button>
		return (
			<Navbar>
				<div className="desktop">
					<NavbarGroup align={Alignment.LEFT}>
						<NavbarHeading>
							<img className="logo" alt="Comprando en casa" src={logo} />
						</NavbarHeading>
						<NavbarDivider />
						<Button className={Classes.MINIMAL} icon="home" text="Inicio" onClick={this.goHome}/>
						{isSeller && <Button className={Classes.MINIMAL} icon="shop" text="Mis productos" />}
						{!isSeller && <Button className={Classes.MINIMAL} 
																	icon="shopping-cart" 
																	text="Mis compras" 
																	onClick={()=> this.setState({alert: true})}/>}
						<NavbarDivider />
						{!isSeller &&<InputGroup style={{width: '300px'}} 
																		 type="search" 
																		 leftIcon="search" 
																		 placeholder="Buscar un producto"
																		 value={this.state.search}
																		 onChange={(e) => this.setState({search: e.target.value})}
																		 rightElement={searchButton}/>}				
					</NavbarGroup>
					<NavbarGroup align={Alignment.RIGHT}>
						<Popover content={profileMenu} position={Position.RIGHT_BOTTOM}>
							<Button className={Classes.MINIMAL} 
											icon={isSeller ? 'shop' : 'user'} 
											text={isSeller ? 'Mi comercio' : 'Mi perfil'} />
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
																			placeholder="Buscar un producto" 
																			onChange={(e) => this.setState({search: e.target.value})}
																			rightElement={searchButton}/>}	
						</span>
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
               confirmButtonText='ACEPTAR'
							 intent='warning'
							 icon='wrench'
               onClose={() => {this.setState({alert: false})}}>
              Próximamente!
        </Alert>
			</Navbar>
		);
	}
}

export default HomeNavBar