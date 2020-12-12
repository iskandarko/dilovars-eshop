import React from 'react';
import OrderMake from './OrderMake';
import OrderDone from './OrderDone';
import { ProductConsumer } from '../../context';
import { Link } from 'react-router-dom';

const Order = () => {
    return ( 
        <>
            <ProductConsumer>
                {values => {
                    const {order, cart} = values;
                    if (cart.length > 0 && order.length === 0) {
                        console.log (cart.length, order.length);
                        return (
                            <OrderMake />
                        );
                    } else if (cart.length === 0 && order.length > 0) {
                        console.log (cart.length, order.length);
                        return (
                            <OrderDone />
                        );
                    } else {
                        console.log (cart.length, order.length);
                        return ( 
                            <p>Произошла ошибка, пожалуйста, вернитесь <Link to="/products">на главную страницу</Link>, чтобы оформить заказ</p>
                        );
                    }
                }}
            </ProductConsumer>

        </>
     );
}
 
export default Order;