import React, { Component } from 'react';
import { Col, Card, Button, Container } from 'react-bootstrap';


const Product = (props) => {
    return (
            <Col className="mb-3" xs lg="4">
                    <Card style={{ width: '18rem' }} className="m-auto">
                        <Card.Img variant="top" src={props.product.img} />
                        <Card.Body>
                            <Card.Title>{props.product.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. {props.product.price}$
                            </Card.Text>
                            <Button variant="primary">В корзину</Button>
                        </Card.Body>
                    </Card>
            </Col>
    );
}



 
export default Product;