import React, { Component } from 'react';
import { ProductContext } from '../context';
import { Link } from 'react-router-dom';

class Details extends Component {

    handleSubmit = ev => {
        ev.preventDefault();
        const form = ev.target;
        const formData = new FormData(form);
        const formValues = this.formDataToObj(formData);
        const productId = this.context.detailsProduct.id;
        if (productId === undefined) {
            this.context.dbProductAdd(formValues);
        } else {
            this.context.dbProductEdit(productId, formValues);
        }
    }

    formDataToObj = formData  => {
        const entries = formData.entries();
        const dataObj = Array.from(entries).reduce((data, [key, value]) => {
            data[key] = value;
            return data;
        }, {});
        return dataObj;
    }

    render() { 
        const {id, title, img, price, company, info, inCart } = this.context.detailsProduct;
        return(
            <div>
                <div className="my-5 container">
                    <form 
                        onSubmit={this.handleSubmit}
                    >
                        <div className="row">
                            <div className="col col-9 col-md-6 my-3 mx-auto">
                                <img 
                                    src={img}
                                    alt="изображение_лота" 
                                    className="img-fluid" 
                                />
                                <input 
                                    className={this.context.adminMode ? "form-control" : "hidden"}
                                    name="img" 
                                    type="text" 
                                    id="img" 
                                    defaultValue={img} 
                                />
                            </div>
                            <div className="col col-9 col-md-6 my-3 mx-auto">
                                <h2>{!this.context.adminMode && title}</h2>
                                <p className={this.context.adminMode ? "m-0" : "hidden"}><strong>Заголовок:</strong></p>
                                <input 
                                    className={this.context.adminMode ? "form-control" : "hidden"}
                                    name="title" 
                                    type="text" 
                                    id="title" 
                                    defaultValue={title} 
                                />
                                <p className={this.context.adminMode && "m-0"}><strong>Производитель:</strong> {!this.context.adminMode && company}</p>
                                <input 
                                    className={this.context.adminMode ? "form-control" : "hidden"}
                                    name="company" 
                                    type="text" 
                                    id="company" 
                                    defaultValue={company} 
                                />
                                <p className={this.context.adminMode && "m-0"}><strong>Цена:</strong> {!this.context.adminMode && price} ₽</p>
                                <input 
                                    className={this.context.adminMode ? "form-control" : "hidden"}
                                    name="price" 
                                    type="number" 
                                    id="price" 
                                    defaultValue={price} 
                                />
                                <p className={this.context.adminMode && "m-0"}><strong>Информация:</strong> <br/> {!this.context.adminMode && info}</p>
                                <textarea 
                                    className={this.context.adminMode ? "form-control" : "hidden"}
                                    name="info" 
                                    id="info" 
                                    defaultValue={info} 
                                    rows="8"
                                    ></textarea>
                                <div className="mt-3">
                                    <Link to="/products">
                                        <button 
                                        className="btn btn-primary mx-2"
                                        type="button">
                                            Назад
                                        </button>
                                    </Link>
                                    <button className={this.context.adminMode ? "hidden" : "btn btn-success mx-2"}
                                        type="button"
                                        disabled={inCart}
                                        onClick={() => {
                                            this.context.openModal(id);
                                            this.context.addToCart(id);
                                            }}>
                                        {inCart ? "В корзине" : "Купить"}
                                    </button>
                                    <button 
                                        type="submit"
                                        className={this.context.adminMode ? "btn btn-success mx-2" : "hidden"}
                                        >
                                        Сохранить
                                    </button>
                                    <button 
                                        type="button"
                                        className={this.context.adminMode ? "btn btn-danger mx-2" : "hidden"}
                                        onClick={() => {
                                            this.context.dbProductDelete(id);
                                        }}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
        );
    }
}

Details.contextType = ProductContext;
 
export default Details;