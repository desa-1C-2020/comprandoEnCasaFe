import React from 'react'
import '../styles/HomeNavBar.css'
import logo from '../CEC.png'
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup } from '@blueprintjs/core'

export class HomeNavBar extends React.PureComponent {

	render() {
		return (
			<Navbar>
				<NavbarGroup align={Alignment.LEFT}>
					<NavbarHeading>
						<img className="logo" alt="Comprando en casa" src={logo} />
					</NavbarHeading>
					<NavbarDivider />
					<Button className={Classes.MINIMAL} icon="home" text="Inicio" />
					<Button className={Classes.MINIMAL} icon="shop" text="Mi comercio" />
					<NavbarDivider />
						<InputGroup style={{width: '300px'}} type="search" leftIcon="search" placeholder="Buscar un producto" />					
				</NavbarGroup>
				<NavbarGroup align={Alignment.RIGHT}>
					<Button className={Classes.MINIMAL} icon="shopping-cart" text="Mis compras" />
					<Button className={Classes.MINIMAL} icon="person" text="Mi perfil" />
				</NavbarGroup>
			</Navbar>
		);
	}
}

export default HomeNavBar