import React, { Component } from 'react';
import Title from '../Title';
import { ProductContext } from '../../context';

class SiteAdmin extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <div className="container text-center">
                    <Title title="Администрирование сайта" />
                    <div>
                        <button 
                            className="btn btn-success m-2"
                            onClick={() => {
                                this.context.turnAdminModeOn();
                                alert('Режим администратора включен');
                            }}>
                            Включить
                        </button>

                    </div>
                    <div>
                        <button 
                            className="btn btn-primary m-2"
                            onClick={() => {
                                this.context.turnAdminModeOff();
                                alert('Режим администратора выключен');
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


