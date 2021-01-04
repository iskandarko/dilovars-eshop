import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';

class Details extends Component {

    render() { 
        return(
            <div>
            <ProductConsumer>
                    {value => {
                        const {id, title, img, price, company, info, inCart } = value.detailsProduct;
                        return (
                            <div className="my-5 container">
                                <div className="row">
                                    <div className="col col-9 col-md-6 my-3 mx-auto">
                                        <img 
                                            src={img}
                                            alt="изображение_лота" 
                                            className="img-fluid" 
                                        />
                                    </div>
                                    <div className="col col-9 col-md-6 my-3 mx-auto">
                                        <h2>{title}</h2>
                                        <p><strong>Производитель:</strong> {company}</p>
                                        <p><strong>Цена:</strong> {price} ₽</p>
                                        <p><strong>Информация о продукте:</strong> <br/> {info}</p>
                                        <Link to="/products">
                                            <button className="btn btn-primary mx-2">Назад</button>
                                        </Link>
                                        <button className="btn btn-success mx-2"
                                            disabled={inCart}
                                            onClick={() => {
                                                value.openModal(id);
                                                value.addToCart(id);
                                                }}>
                                            {inCart ? "В корзине" : "Купить"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
            </ProductConsumer>
            </div>
        );
    }
}
 
export default Details;