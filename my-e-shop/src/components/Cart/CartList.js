import React from 'react';
import { ProductConsumer } from "../../context";
import CartItem from "./CartItem";

const CartList = (props) => {
    const {cart} = props.values;
    return ( 
        <>
            <div className="container-fluid">
                        {cart.map(item => {
                            return ( 
                                <CartItem key={item.id} item={item} values={props.values}/> 
                            );
                        })}
            </div>
        </>
     );
}
 
export default CartList;