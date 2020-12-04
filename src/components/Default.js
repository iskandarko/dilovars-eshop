import React from 'react';

function Default(props) {
    return (
        <div className="text-center pt-5">
            <h1>Ошибка 404</h1>
            <h2>Введенный вами адрес <strong>{props.location.pathname}</strong> не существует</h2>
        </div>

    )
}

 
export default Default;