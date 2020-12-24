import React from 'react';
import Title from '../Title';
import { ProductContext } from '../../context';

class OrderMake extends React.Component {
    constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
      this.orderDetailsInString = this.orderDetailsInString.bind(this);
      this.state = {
        status: "",
        detailsText: "default"
      };
    }

    componentDidMount() {
        this.orderDetailsInString();
    }

    submitForm(ev) {

        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);

        const formDataToJson = formData => {
            const entries = formData.entries();
        
            const dataObj = Array.from(entries).reduce( (data, [key, value]) => {
                data[key] = value;
                if (key === 'email') {
                data._replyTo = value;
                }
                return data;
            }, {});
            return JSON.stringify(dataObj);
        };

            
         fetch(form.action, {
              method: form.method, 
              mode: 'cors', 
              cache: 'no-cache', 
              credentials: 'same-origin', 
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow', 
              referrerPolicy: 'no-referrer', 
              body: formDataToJson(data) 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                return response.blob();
            })
            .then( resp => {
                console.log(resp);
                form.reset();
                this.setState({ status: "SUCCESS" });
                this.context.handleOrder();
            })
            .catch(error => {
                alert('Произошла ошибка! Пожалуйста, проверьте подключение к интернету и повторите операцию. Если ошибка повторилась, позвоните по номеру телефона на главной странице.');
                console.error('There has been a problem with the fetch operation: ', error);
                this.setState({ status: "ERROR" });
            });
    }

    orderDetailsInString() {
        let text = "";
        this.context.cart.forEach(product => {
             let tempText = product.title + " // " + product.price + " ₽ // " + product.count + " шт\n\n";
             text += tempText;
        });
        text += "Сумма: " + this.context.cartTotal + "₽";
        this.setState({ detailsText: text });
    }

    render() {
        return(
            <>
                <div className="container">
                    <Title title="Оформление заказа" />         
                    <form 
                        onSubmit={this.submitForm}
                        action={process.env.REACT_APP_FORMIO_URL}
                        method="POST" 
                        className="form_order"
                    >
                        <div className="form-group">
                            <label htmlFor="inputOrder">Детали заказа</label>
                            <textarea 
                                name="Order" 
                                className="form-control" 
                                id="inputOrder" 
                                rows="4" 
                                value={this.state.detailsText} 
                                readOnly="readOnly">
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputName">Имя</label>
                            <input 
                                name="Name" 
                                type="text" 
                                className="form-control" 
                                id="inputName" 
                                aria-describedby="emailHelp" 
                                placeholder="Введите ваше имя" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Ваш email</label>
                            <input 
                                name="Email" 
                                type="email" 
                                className="form-control" 
                                id="inputEmail" 
                                aria-describedby="emailHelp" 
                                placeholder="Введите email для связи с вами" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPhone">Телефон</label>
                            <input 
                                name="Phone" 
                                type="text" 
                                className="form-control" 
                                id="inputPhone" 
                                aria-describedby="emailHelp" 
                                placeholder="Введите телефон для связи с вами" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Примечания</label>
                            <textarea 
                                name="Notes" 
                                className="form-control" 
                                id="inputAddress" 
                                rows="2" 
                                placeholder="Например, укажите удобное время для звонка">
                            </textarea>
                        </div> 
                        <button 
                            type="submit"
                            className="btn d-block btn-outline-success text-uppercase mt-4 mx-auto" 
                            >
                                Оформить заказ
                        </button>
                    </form>
                </div>
            </>
        );
    }
  }

 
OrderMake.contextType = ProductContext;

export default OrderMake;