import React, { Component } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

class Product extends Component {
    render() { 
        const { id, title, img, price, inCart } = this.props.product;
        const handleDetails = this.props.handleDetails;
        return ( 
            <Col className="my-3 mx-auto mx-sm-0" xs="10" sm="6" lg="4" xl="3">
                <Card  onClick={() => {handleDetails(id)}}>
                    <div className="card_container">
                        <Link to={"/products/" + id}>
                            <div data-href={img} className="card-img-top progressive replace">
                                <img 
                                    width="200"
                                    height="200"
                                    loading="lazy"
                                    className="card-img-top preview"
                                    src="../img/tiny.png" 
                                    alt="изображение_лота" 
                                />
                            </div>
                        </Link>
                        <span 
                            className={this.props.adminMode ? "btn btn-danger" : "hidden"} 
                            onClick={() => {
                                this.props.dbProductDelete(id);
                            }}
                        >
                            <strong>X</strong>
                        </span>
                        <button 
                            className={this.props.adminMode ? "hidden" : "btn btn-success"}
                            disabled={inCart} 
                            onClick={() => {
                                this.props.openModal(id);
                                this.props.addToCart(id);
                            }}
                        >
                            {inCart ? <i className="fas fa-shopping-cart fa-lg"></i> : <i className="fas fa-cart-plus fa-lg"></i>}
                        </button>
                        <p className="align-self-center mb-0 px-2"><strong>{price} ₽</strong></p>
                    </div>
                        
                    <Card.Footer className="d-flex justify-content-between">
                        <p className="align-self-center mb-0">{title}</p>
                    </Card.Footer>
                </Card>
            </Col>
         );
    }
}
 
//Setting the required types for the props values (throws an error to the console, if not matched)
Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool,
        total: PropTypes.number
    }).isRequired
}

 
export default Product;