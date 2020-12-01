import React, { Component } from 'react';
import { Col, Container, Row, Image, Button} from 'react-bootstrap';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
// import { storeProducts } from '../data';

class Details extends Component {

    render() { 
        return(
            <div>
            <ProductConsumer>
                    {value => {
                        const {id, title, img, price, company, info, inCart } = value.detailsProduct;
                        return (
                            <Container className="my-5">
                                <Row>
                                    <Col className="my-3 mx-auto" xs="9" md="6">
                                        <Image src={img} alt="изображение_лота" fluid />
                                    </Col>
                                    <Col className="my-3 mx-auto" xs="9" md="6">
                                        <h2>{title}</h2>
                                        <p><strong>Производитель:</strong> {company}</p>
                                        <p><strong>Цена:</strong> {price} ₽</p>
                                        <p><strong>Информация о продукте:</strong> <br/> {info}</p>
                                        <Link to="/products">
                                            <Button className="mx-2" variant="primary">Назад</Button>
                                        </Link>
                                        <Button 
                                            className="mx-2" 
                                            variant="success" 
                                            disabled={inCart}
                                            onClick={() => {
                                                value.openModal(id);
                                                value.addToCart(id);
                                                }}>
                                            {inCart ? "В корзине" : "Купить"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    }}
            </ProductConsumer>
            </div>
        );
    }
}
 
export default Details;