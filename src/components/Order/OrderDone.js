import React from 'react';
import Title from '../Title';
import { ProductConsumer, ProductProvider } from '../../context';

const OrderDone = () => {
    return ( 
        <>
            <ProductConsumer>
                {values => {
                    const {order, orderTotal} = values;
                    return(
                        <>
                            <Title title="Заказ оформлен" />
                            <div className="container mt-5">
                                <h4 className="text-center">В ближайшее время мы свяжемся с вами, чтобы подтвердить ваш заказ</h4>
                                <table className="mx-auto">
                                    <tbody>
                                        <tr>
                                            <td><strong>Номер заказа</strong></td>
                                            <td>244</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Вы заказали</strong></td>
                                            <td>
                                                <table>
                                                    <tbody>
                                                        {order.map((product) => {
                                                                return (
                                                                <tr key={product.id}>
                                                                    <td>{product.title}</td>
                                                                    <td>{product.price} ₽ x {product.count}</td>
                                                                </tr> 
                                                                );
                                                            })}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Сумма заказа</strong></td>
                                            <td>{orderTotal} ₽</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                }}
            </ProductConsumer>
        </>
     );
}
 
export default OrderDone;