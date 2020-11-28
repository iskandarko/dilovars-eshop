import React from 'react';

const CartItem = (props) => {
    const {id,title,img,price,count,total} = props.item;
    const {increment, decrement, removeItem} = props.values;
    return ( 
        <>
            <div className="row my-lg-3 my-5 text-capitalize text-center">
                <div className="col-10 col-lg-2 mx-auto">
                    <img 
                        src={img} 
                        style={{height:"5rem", width:"5rem"}}
                        className="img-fluid"
                    />
                </div>
                <div className="col-10 col-lg-2 mx-auto">
                    <span className="d-lg-none">название: </span>
                    {title}
                </div>
                <div className="col-10 col-lg-2 mx-auto">
                    <span className="d-lg-none">цена: </span>
                    {price}
                </div>
                <div className="col-10 col-lg-2 mx-auto">
                    <span className="d-lg-none">количество: </span>
                    <span className="btn btn-outline-dark mx-2" onClick={() => {decrement(id)}}>-</span>
                    {count}
                    <span className="btn btn-outline-dark mx-2" onClick={() => {increment(id)}}>+</span>
                </div>
                <div className="col-10 col-lg-2 mx-auto">
                    <span className="btn btn-outline-danger" onClick={() => {removeItem(id)}}>удалить</span>
                </div>
                <div className="col-10 col-lg-2 mx-auto">
                    <span className="d-lg-none">итог: </span>
                    {total}
                </div>
            </div>  
        </>
     );
}
export default CartItem;