import React, { useImperativeHandle } from 'react';
import Title from '../Title';
import { ProductContext } from '../../context';

class OrderMake extends React.Component {
    constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
      this.state = {
        status: ""
      };
    }

    submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            form.reset();
            this.setState({ status: "SUCCESS" });
            this.context.handleOrder();
          } else {
            this.setState({ status: "ERROR" });
          }
        };
        console.log(data);
        xhr.send(data);
    }
  
    render() {
        console.log(process.env.REACT_APP_FORMIO_URL);
        return(
            <>
                <div className="container">
                    <Title title="Оформление заказа" />         
                    {/* <ul>
                        {this.context.cart.map((product) => {
                                return (
                                <li key={product.id}>
                                    <span>{product.title}</span> // <span>{product.price} ₽ x {product.count}</span>
                                </li> 
                                );
                            })}
                        <li>Сумма: {this.context.cartTotal} ₽</li>
                    </ul>     */}
                    <form 
                        onSubmit={this.submitForm}
                        action={process.env.REACT_APP_FORMIO_URL}
                        method="POST" 
                        className="form_order"
                    >
                        <div class="form-group">
                            <label htmlFor="inputOrder">Вы заказываете</label>
                            <textarea name="Order" class="form-control" id="inputOrder" rows="4" disabled>
                                Здесь будет заказ
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputName">Имя</label>
                            <input name="Name" type="text" className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="Введите ваше имя" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Ваш email</label>
                            <input name="Email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Введите email для связи с вами" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPhone">Телефон</label>
                            <input name="Phone" type="text" className="form-control" id="inputPhone" aria-describedby="emailHelp" placeholder="Введите телефон для связи с вами" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="inputAddress">Адрес</label>
                            <textarea name="Address" class="form-control" id="inputAddress" rows="2" placeholder="Введите ваш адрес"></textarea>
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

// const OrderMake = () => {
//     return ( 
//         <>
//             <ProductConsumer>
//                 {values => {
//                     return (
//                         <>
//                             <div className="container">
//                                 <Title title="Оформление заказа" />
//                                 <form 
//                                     action="https://formspree.io/f/mvovwwnd" 
//                                     method="post" 
//                                     className="form_order"
//                                 >
//                                     <div className="form-group">
//                                         <label htmlFor="inputName">Имя</label>
//                                         <input name="Name" type="text" className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="Введите ваше имя" />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="inputEmail">Ваш email</label>
//                                         <input name="Email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Введите email для связи с вами" />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="inputPhone">Телефон</label>
//                                         <input name="Phone" type="text" className="form-control" id="inputPhone" aria-describedby="emailHelp" placeholder="Введите телефон для связи с вами" />
//                                     </div>
//                                     <div class="form-group">
//                                         <label htmlFor="inputAddress">Адрес</label>
//                                         <textarea name="Address" class="form-control" id="inputAddress" rows="2" placeholder="Введите ваш адрес"></textarea>
//                                     </div>
//                                     <button 
//                                         type="submit"
//                                         className="btn d-block btn-outline-success text-uppercase mt-4 mx-auto" 
//                                         onClick={() => values.handleOrder()}>
//                                             Оформить заказ
//                                     </button>
//                                 </form>
//                             </div>
//                         </>
//                     );
//                 }}
//             </ProductConsumer>
//         </>
//      );
// }
 
OrderMake.contextType = ProductContext;

export default OrderMake;