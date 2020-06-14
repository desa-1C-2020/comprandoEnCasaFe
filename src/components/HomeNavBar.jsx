import React from 'react'
import '../styles/HomeNavBar.css'
import logo from '../CEC.png'
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup,
Menu, MenuItem, MenuDivider, Popover, Position} from '@blueprintjs/core'

export class HomeNavBar extends React.PureComponent {

	constructor(props){
		super(props);
		this.openProfile = this.openProfile.bind(this);
	}

	openProfile(){
		this.props.handleProfile();
	}

	render() {
		const isSeller = this.props.accountType === 'seller'
		const profileMenu = (
			<Menu>
				<MenuItem icon="id-number" 
									text={isSeller ? 'Información' : 'Mis datos'} 
									onClick={this.openProfile}/>
				{!isSeller && <MenuItem icon="notifications" text="Alertas" />}
				<MenuDivider />
				<MenuItem icon="log-out" text="Cerrar sesión"/>
			</Menu>
		);
		const dropdownMenu = (
			<Menu large={true} className="mobile">
				<MenuItem icon="home" text="Inicio" />
				<MenuDivider />
				<MenuItem icon="shop" text="Mis productos" />
				{!isSeller && <MenuDivider />}
				{!isSeller && <MenuItem icon="shopping-cart" text="Mis compras" />}
			</Menu>
		);
		return (
			<Navbar>
				<div className="desktop">
					<NavbarGroup align={Alignment.LEFT}>
						<NavbarHeading>
							<img className="logo" alt="Comprando en casa" src={logo} />
						</NavbarHeading>
						<NavbarDivider />
						<Button className={Classes.MINIMAL} icon="home" text="Inicio" />
						{isSeller && <Button className={Classes.MINIMAL} icon="shop" text="Mis productos" />}
						{!isSeller && <Button className={Classes.MINIMAL} icon="shopping-cart" text="Mis compras" />}
						<NavbarDivider />
						{!isSeller &&<InputGroup style={{width: '300px'}} type="search" leftIcon="search" placeholder="Buscar un producto" />}				
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
		{!isSeller && <InputGroup style={{width: '100%'}} type="search" leftIcon="search" placeholder="Buscar un producto" />}	
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
			</Navbar>
		);
	}
}

export default HomeNavBar