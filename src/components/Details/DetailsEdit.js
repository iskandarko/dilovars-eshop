import React, { Component } from 'react';
import { ProductContext } from '../../context';
import { Link } from 'react-router-dom';

class DetailsEdit extends Component {

    state = { selectedFile: null }
    
    handleSubmit = ev => {
        ev.preventDefault();
        this.fileUpload()
        .then((response) => {
                console.log('response:')
                console.log(response.filename);
                let imgSrc = document.getElementById('img');
                imgSrc.value = '../img/' + response.filename;
                const form = ev.target;
                const formData = new FormData(form);
                const formValues = this.formDataToObj(formData);
                const productId = this.context.detailsProduct.id;
                let isNewProduct = productId === undefined;
                if (isNewProduct) {
                    this.dbProductAdd(formValues);
                } else {
                    this.dbProductEdit(productId, formValues);
                }
            }
        );
    }

    handleFileChange = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
        this.readURL(event.target);
    }

    fileUpload = () => {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            data.append('file', this.state.selectedFile);
            console.log(data);
            fetch('/upload', {
                method: 'POST',
                body: data
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                resolve(response.json());
            })
            .catch(error => {
                alert('Произошла ошибка во время добавления изображения. Пожалуйста, проверьте подключение к интернету и повторите операцию.');
                console.error('There has been a problem with the fetch operation: ', error);
                throw error;
            });
        })
    }

    readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
          
            reader.onload = function(e) {
                document.getElementById('imgPreview').setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    dbProductAdd = product => {
        if (this.context.isAdminMode) {
            console.log('adding new product', JSON.stringify(product));
            fetch('/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                alert('Новый продукт успешно добавлен!');
                return response.blob();
            })
            .catch(error => {
                alert('Произошла ошибка при взаимодействии с базой данных!');
                console.error('There has been a problem with the fetch operation: ', error);
            });
        }
    }

    dbProductEdit = (id, product) => {
        if (this.context.isAdminMode) {
            console.log('editting the product', JSON.stringify(product));
            fetch('/products/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                alert('Продукт успешно обновлен!');
                return response.blob();
            })
            .catch(error => {
                alert('Произошла ошибка подключения к базе данных! Пожалуйста, проверьте подключение к интернету и повторите операцию.');
                console.error('There has been a problem with the fetch operation: ', error);
            });
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
        const { id, title, img, price, company, info } = this.context.detailsProduct;
        return(
            <div>
                <div className="my-5 container">
                    <p className="m-0"><strong>Загрузите изображение:</strong></p>
                    <input type="file" name="file" onChange={this.handleFileChange}/>
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <div className="row">
                            <div className="col col-9 col-md-6 my-3 mx-auto">
                                <img 
                                    src={img}
                                    alt="изображение_лота" 
                                    className="img-fluid" 
                                    id="imgPreview"
                                />
                                <input 
                                    className="form-control"
                                    name="img" 
                                    type="text" 
                                    id="img" 
                                    defaultValue={img} 
                                    readOnly
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
                                        type="button"
                                        >
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

DetailsEdit.contextType = ProductContext;
 
export default DetailsEdit;