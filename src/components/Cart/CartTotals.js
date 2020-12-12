import React from 'react';
import { Link } from 'react-router-dom';

const CartTotals = (props) => {
    const { clearCart, clearOrder, cartTotal } = props.values;
    return ( 
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <h5>
                            <span className="text-title">Сумма: </span>
                            <strong>{cartTotal} ₽</strong>
                        </h5>
                        <div className="totals_button_container">
                            <Link 
                                to="/order"
                                className="d-block">
                                <button 
                                    className="btn btn-outline-success text-uppercase mt-2"
                                    onClick={() => {clearOrder()}}
                                >
                                    оформить заказ
                                </button>
                            </Link>
                            <Link to="/products" className="d-block">
                                <button 
                                    className="btn btn-outline-danger text-uppercase mt-2"
                                    onClick={() => {clearCart()}}
                                >
                                    очистить корзину
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}
 
export default CartTotals;