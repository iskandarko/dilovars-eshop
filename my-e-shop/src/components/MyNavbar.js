import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class MyNavbar extends Component {
    state = {  }
    render() { 
        return ( 
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">E-Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/details">Details_test</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </header>
        );
    }
}
 
export default MyNavbar;