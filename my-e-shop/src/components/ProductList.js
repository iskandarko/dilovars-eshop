import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../context';
import { Container, Row} from 'react-bootstrap';

class ProductList extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Title name="Все" title="Товары" />
                <Container className="justify-content-center"> 
                    <Row>
                        <ProductConsumer>
                            {value => {
                                return value.products.map(product => {
                                    return <Product key={product.id} product={product} />
                                });
                            }}
                        </ProductConsumer>
                    </Row>
                </Container>
            </div>
         );
    }
}
 
export default ProductList;