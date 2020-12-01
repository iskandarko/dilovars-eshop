import React from 'react';
import { Link } from 'react-router-dom';

const CartTotals = (props) => {
    const {clearCart, cartTotal} = props.values;
    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <Link to="/products">
                            <button 
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                onClick={() => {clearCart()}}
                            >
                                очистить корзину
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">Сумма: </span>
                            <strong>{cartTotal} ₽</strong>
                        </h5>
                    </div>
                </div>
            </div>
        </> 
    );
}
 
export default CartTotals;