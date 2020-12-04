import React from 'react';
import Title from '../Title';
import { ProductConsumer } from '../../context';

const CartOrder = (props) => {
    console.log(props.history.location.state)////////////////////////
    return ( 
        <>
            <Title title="Спасибо за ваш заказ" />
            <ProductConsumer>
                {values => {
                    const {cartTotal, cart} = values;
                    return (
                        <div className="container mt-5">
                            <h4 className="text-center">В ближайшее время мы свяжемся с вами, чтобы подтвердить ваш заказ</h4>
                            <table className="mx-auto">
                                <tr>
                                    <td><strong>Номер заказа</strong></td>
                                    <td>244</td>
                                </tr>
                                <tr>
                                    <td><strong>Вы заказали</strong></td>
                                    <td>{cart.map((product) => {
                                            return (
                                            <tr>
                                                <td>{product.title}</td>
                                                <td>{product.price} ₽ x {product.count}</td>
                                            </tr> 
                                            );
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Сумма заказа</strong></td>
                                    <td>{cartTotal} ₽</td>
                                </tr>
                            </table>
                        </div>
                    );
                }}
            </ProductConsumer>

        </>
     );
}
 
export default CartOrder;