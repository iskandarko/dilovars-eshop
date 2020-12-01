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
                <Card onClick={() => {handleDetails(id)}}>
                    <Link to={"/products/" + id}>
                        <Card.Img 
                            variant="top" 
                            src={img} 
                            alt="изображение_лота"
                            className="p-5"
                        />
                    </Link>
                    <Card.Body className="p-0">
                        <div className="d-flex justify-content-end">
                            <Button 
                                variant="success" 
                                disabled={inCart} 
                                onClick={() => {
                                    this.props.openModal(id);
                                    this.props.addToCart(id);
                                }}
                            >
                                {inCart ? <i class="fas fa-shopping-cart fa-lg"></i> : <i class="fas fa-cart-plus fa-lg"></i>}
                            </Button>
                        </div>
                        <Card.Footer className="d-flex justify-content-between">
                            <p className="align-self-center mb-0">{title}</p>
                            <h5 className="mb-0">{price} ₽</h5>
                        </Card.Footer>
                    </Card.Body>
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