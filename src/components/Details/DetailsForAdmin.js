import React, { Component } from 'react';
import { ProductContext } from '../../context';
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
        const {id, title, img, price, company, info } = this.context.detailsProduct;
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
                                    className="form-control"
                                    name="img" 
                                    type="text" 
                                    id="img" 
                                    defaultValue={img} 
                                />
                            </div>
                            <div className="col col-9 col-md-6 my-3 mx-auto">
                                <p className="m-0"><strong>Заголовок:</strong></p>
                                <input 
                                    className="form-control"
                                    name="title" 
                                    type="text" 
                                    id="title" 
                                    defaultValue={title} 
                                />
                                <p className="m-0"><strong>Производитель:</strong></p>
                                <input 
                                    className="form-control"
                                    name="company" 
                                    type="text" 
                                    id="company" 
                                    defaultValue={company} 
                                />
                                <p className="m-0"><strong>Цена:</strong></p>
                                <input 
                                    className="form-control"
                                    name="price" 
                                    type="number" 
                                    id="price" 
                                    defaultValue={price} 
                                />
                                <p className="m-0"><strong>Информация:</strong></p>
                                <textarea 
                                    className="form-control"
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
                                    <button 
                                        type="submit"
                                        className="btn btn-success mx-2"
                                        >
                                        Сохранить
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn btn-danger mx-2"
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