import React from 'react'
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from '@blueprintjs/core'

export class HomeNavBar extends React.PureComponent {
    
  render() {
        return (
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavbarHeading>Comprando en Casa</NavbarHeading>
                        <NavbarDivider />
                        <Button className={Classes.MINIMAL} icon="home" text="Home" />
                        <Button className={Classes.MINIMAL} icon="shop" text="Tiendas" />
                        <Button className={Classes.MINIMAL} icon="person" text="Mi perfil" />
                        <Button className={Classes.MINIMAL} icon="shopping-cart" text="Mis compras" />
                    </NavbarGroup>
                </Navbar>
        );
    }
}

export default HomeNavBar