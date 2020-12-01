import React, { Component } from 'react';
import CartColumns from './CartColumns';
import CartList from './CartList';
import CartTotals from './CartTotals';
import CartEmpty from './CartEmpty';
import Title from '../Title';
import {ProductConsumer} from '../../context';


class Cart extends Component {
    state = {  }
    render() { 
        return ( 
            <ProductConsumer>
                { values => {
                    const {cart} = values; 
                        if (cart.length > 0) {
                            return (
                                <>
                                    <Title name="Ваша" title="корзина" />
                                    <CartColumns />
                                    <CartList values={values} />
                                    <CartTotals values={values} />
                                </>
                            );
                        } else {
                            return ( 
                                <>
                                    <CartEmpty /> 
                                </>
                            );
                        }

                }}
            </ProductConsumer>

         );
    }
}
 
export default Cart;