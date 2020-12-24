import React from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';

const OrderError = () => {
    return (
        <>
            <Title title="Произошла ошибка" />
            <p className="text-center">Пожалуйста, вернитесь <Link to="/products">на главную страницу</Link></p>
        </>
     );
}
 
export default OrderError;