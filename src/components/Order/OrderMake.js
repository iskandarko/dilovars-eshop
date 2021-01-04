import React from 'react';
import Title from '../Title';
import { ProductContext } from '../../context';

class OrderMake extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: "",
        detailsText: "Произошла ошибка. Пожалуйста, очистите корзину и оформите заказ заново.",
        requiredInputsIds: ["inputEmail", "inputPhone"]
      }
    }

    componentDidMount() {
        this.orderDetailsInString();
    }

    handleSubmit = ev => {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
            
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
              body: this.formDataToJson(data) 
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
                alert('Произошла ошибка! Пожалуйста, проверьте подключение к интернету и повторите операцию. Если ошибка повторяется, позвоните по номеру телефона на главной странице.');
                console.error('There has been a problem with the fetch operation: ', error);
                this.setState({ status: "ERROR" });
            });
    }

    handleChange = (ev) => {
        const {id, value} = ev.target;
        const anotherId = this.getAnotherRequriedInputId(id);

        const inputElement_this = document.getElementById(id);
        const inputElement_another = document.getElementById(anotherId);
        const contactsAlert = document.getElementById("contactsAlert");

        if (value) {
            inputElement_another.required = false;
        } else {
            inputElement_another.required = true;
        }

        if (inputElement_this.validity.valid) {
            contactsAlert.classList.add("hidden");
        } else {
            contactsAlert.classList.remove("hidden");
        }
    }

    orderDetailsInString = () => {
        let text = "";
        this.context.cart.forEach(product => {
             let tempText = product.title + " // " + product.price + " ₽ // " + product.count + " шт\n\n";
             text += tempText;
        });
        text += "Сумма: " + this.context.cartTotal + "₽";
        this.setState({ detailsText: text });
    }

    formDataToJson = formData  => {
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

    getAnotherRequriedInputId = id => {
        const inputsIds = this.state.requiredInputsIds;
        return (id === inputsIds[0]) ? inputsIds[1] : inputsIds[0];
    }

    render() {
        return(
            <>
                <div className="container">
                    <Title title="Оформление заказа" />         
                    <form 
                        onSubmit={this.handleSubmit}
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
                                placeholder="Укажите ваше имя" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input 
                                name="Email" 
                                type="email" 
                                className="form-control" 
                                id="inputEmail" 
                                aria-describedby="emailHelp"
                                placeholder="Укажите email"
                                onChange={this.handleChange}
                                required
                            /> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPhone">Телефон (моб.)</label>
                            <input 
                                name="Phone" 
                                type="text" 
                                className="form-control" 
                                id="inputPhone" 
                                aria-describedby="emailHelp" 
                                placeholder="Укажите телефон" 
                                onChange={this.handleChange}
                                required pattern = "^([-\s\(\)]*)(8|\+?7)?([-\s\(\)]*)([0-7]|9)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)(\d)([-\s\(\)]*)$"
                                onInvalid={ev => {ev.target.setCustomValidity('Пожалуйста, укажите корректный номер телефона. Допускается любой формат ввода, кроме ввода добавочного номера. Его вы можете указать в примечаниях.')}}
                                onInput={ev => {ev.target.setCustomValidity('')}}
                            />
                        </div>
                        <div id="contactsAlert" class="alert alert-warning" role="alert">
                            Необходимо указать хотя бы один способ для связи с вами
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Примечания</label>
                            <textarea 
                                name="Notes" 
                                className="form-control" 
                                id="inputAddress" 
                                rows="2" 
                                placeholder="Например, укажите удобное время для звонка или добавочный номер.">
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