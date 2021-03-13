import React, { Component } from 'react';
import { ProductContext } from '../../context';
import { Link } from 'react-router-dom';

class Details extends Component {

    render() { 
        const {id, title, img, price, company, info, inCart } = this.context.detailsProduct;
        return(
            <div>
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
                                <p><strong>Информация:</strong> <br/> {info}</p>
                                <div className="mt-3">
                                    <Link to="/products">
                                        <button 
                                        className="btn btn-primary mx-2"
                                        type="button">
                                            Назад
                                        </button>
                                    </Link>
                                    <button className="btn btn-success mx-2"
                                        type="button"
                                        disabled={inCart}
                                        onClick={() => {
                                            this.context.openModal(id);
                                            this.context.addToCart(id);
                                            }}>
                                        {inCart ? "В корзине" : "Купить"}
                                    </button>
                                </div>
                            </div>
                        </div> 
                </div>
            </div>
        );
    }
}

Details.contextType = ProductContext;
 
export default Details;