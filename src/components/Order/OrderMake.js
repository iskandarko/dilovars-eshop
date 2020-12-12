import React from 'react';
import Title from '../Title';
import { ProductConsumer } from '../../context';

const OrderMake = () => {
    return ( 
        <>
            <ProductConsumer>
                {values => {
                    return (
                        <>
                            <div className="container">
                                <Title title="Оформление заказа" />
                                <form className="form_order">
                                    <div className="form-group">
                                        <label for="inputName">Имя</label>
                                        <input type="email" className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="Введите ваше имя" />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail">Ваш email</label>
                                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Введите email для связи с вами" />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputPhone">Телефон</label>
                                        <input type="email" className="form-control" id="inputPhone" aria-describedby="emailHelp" placeholder="Введите телефон для связи с вами" />
                                    </div>
                                    <div class="form-group">
                                        <label for="inputAddress">Адрес</label>
                                        <textarea class="form-control" id="inputAddress" rows="2" placeholder="Введите ваш адрес"></textarea>
                                    </div>
                                    <button 
                                    type="submit"
                                    className="btn d-block btn-outline-success text-uppercase mt-4 mx-auto" 
                                    onClick={() => values.handleOrder()}>
                                        Оформить заказ
                                </button>
                                </form>

                            </div>
                        </>
                    );
                }}
            </ProductConsumer>
        </>
     );
}
 
export default OrderMake;