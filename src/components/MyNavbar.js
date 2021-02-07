import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context';

class MyNavbar extends Component {
    state = {  }
    render() { 
        return ( 
            <header>
                <Navbar fixed="top" bg="dark" variant="dark" className="py-0">
                    <Link className="nav-link" to="/products">
                        <Navbar.Brand >
                            Models 
                            <i className="fas fa-paper-plane"></i> 
                            Shop 
                            <span style={{"color":"red"}} className={!this.context.adminMode && "hidden"}> (admin_mode)</span>
                        </Navbar.Brand>
                    </Link>    
                        <Nav className="ml-auto">
                            <Link className="nav-link" to="/cart">
                                <div className="cart_wrapper">
                                    <i className="fas fa-shopping-basket fa-2x"></i> 
                                    <div> {this.context.cart.length > 0 && this.context.cart.length}</div>
                                </div>
                            </Link>
                        </Nav>
                    </Navbar>
            </header>
        );
    }
}
 
MyNavbar.contextType = ProductContext;
export default MyNavbar;