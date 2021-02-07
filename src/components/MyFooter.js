import React from 'react';
import { Link } from 'react-router-dom';

const MyFooter = () => {
    return (
    <>
        <footer className="text-muted py-4 my-md-5 pt-md-5 border-top">
            <div className="container text-center">
                <div className="row">
                    <div className="col col-sm-2">
                        <p><Link to="/products">Все товары</Link></p>
                    </div>
                    <div className="col col-sm-8">
                        <p>Вы можете оформить заказ по телефону +7-999-99-99 
                            <br/>
                            или написать нам на <a href="mailto:email@email.com">email@domain.ru</a>
                        </p>
                    </div>
                    <div className="col col-sm-2">
                        <a href="#">Вверх</a>
                    </div>
                </div>
            </div>
        </footer>
    </> 
    );
}
 
export default MyFooter;

