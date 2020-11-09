import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class MyNavbar extends Component {
    state = {  }
    render() { 
        return ( 
            <header>
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Navbar.Brand href="/">D-Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Товары</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart">Корзина</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </header>
        );
    }
}
 
export default MyNavbar;