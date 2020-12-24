import React from 'react';
import OrderMake from './OrderMake';
import OrderDone from './OrderDone';
import OrderError from './OrderError';
import { ProductConsumer } from '../../context';


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
                            <OrderError />
                        );
                    }
                }}
            </ProductConsumer>

        </>
     );
}
 
export default Order;