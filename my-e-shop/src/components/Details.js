import React, { Component } from 'react';
import { Col, Container, Row, Image, Button} from 'react-bootstrap';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
// import { storeProducts } from '../data';

class Details extends Component {

    // state = {
    //     detailsProduct: {}
    // }

    // componentDidMount() {
    //     this.setProduct();
    // }

    // setProduct() { 
    //     console.log("hello from setProduct")
    //     console.log(this.props.match.params.id)
    //     let theProduct;
    //     storeProducts.forEach(item => {
    //         if (item.id === parseInt(this.props.match.params.id, 10)) {
    //             console.log("hello from if statement in details")
    //             theProduct = {...item};
    //             this.setState(() => {
    //                 return {detailsProduct: theProduct}
    //             });
    //         }
    //     });
    // }

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
                                        <Image src={img} fluid />
                                    </Col>
                                    <Col className="my-3 mx-auto" xs="9" md="6">
                                        <h2>{title}</h2>
                                        <p><strong>Производитель:</strong> {company}</p>
                                        <p><strong>Цена:</strong> ${price}</p>
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
                                            {inCart ? "В корзине" : "Добавить"}
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