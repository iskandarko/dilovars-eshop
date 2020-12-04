import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class MyNavbar extends Component {
    state = {  }
    render() { 
        return ( 
            <header>
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Navbar.Brand href="/products">Models <i class="fas fa-paper-plane"></i> Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link class="nav-link" to="/products">
                                Все товары
                            </Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link class="nav-link" to="/cart">
                                Корзина
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </header>
        );
    }
}
 
export default MyNavbar;