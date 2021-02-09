import React, { Component } from 'react';
import Title from '../Title';
import { ProductContext } from '../../context';

class SiteAdmin extends Component {

    handleAdminModeTurnON() {
        const inputPwd = document.getElementById('pwd').value;
        if (inputPwd === process.env.REACT_APP_ADMIN_PWD) {
            this.context.turnAdminModeOn();
            alert('Режим администратора включен');
            this.props.history.push("/products");
        } else {
            alert('Введен неверный пароль');
        }
    }

    handleAdminModeTurnOFF() {
        this.context.turnAdminModeOff();
        this.props.history.push("/products");
    }

    render() { 
        return ( 
            <>
                <div className="container text-center">
                    <Title title="Режим Администратора" />
                    <div className="w-50 mx-auto">
                        <input 
                            className="form-control"
                            name="pwd" 
                            type="text" 
                            id="pwd" 
                            placeholder="Введите пароль"
                            onKeyPress={(e) => {
                                if (e.code === "Enter") {
                                    this.handleAdminModeTurnON();
                                }
                            }}
                        />
                    </div>
                    <div>
                        <button 
                            className="btn btn-success m-2"
                            onClick={() => {
                                this.handleAdminModeTurnON();
                            }}>
                            Включить
                        </button>
                        <button 
                            className="btn btn-primary m-2"
                            onClick={() => {
                                this.handleAdminModeTurnOFF();
                            }}>
                            Выключить
                        </button>
                    </div>    
                </div>
            </>
         );
    }
}

SiteAdmin.contextType = ProductContext;
 
export default SiteAdmin;


