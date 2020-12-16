import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../context';
import { Container, Row} from 'react-bootstrap';

class ProductList extends Component {
    render() { 
        return ( 
            <>
                <Title name="Все" title="товары" />
                <div className="mb-5">
                    <Container> 
                        <Row>
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return (<Product 
                                                    key={value.products.indexOf(product)} 
                                                    product={product} 
                                                    handleDetails={value.handleDetails}
                                                    openModal={value.openModal}
                                                    addToCart={value.addToCart}
                                                />);
                                    });
                                }}
                            </ProductConsumer>
                        </Row>
                    </Container>
                </div>
            </>
         );
    }
}
 
export default ProductList;