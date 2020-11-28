import React from 'react';

const CartColumns = () => {
    return ( 
        <>
            <div className="container-fluid text-center d-none d-lg-block my-3">
                <div className="row">
                    <div className="col-10 col-lg-2 mx-auto">
                        <p className="text-uppercase">фото</p>
                    </div>
                    <div className="col-10 col-lg-2 mx-auto">
                        <p className="text-uppercase">название</p>
                    </div>
                    <div className="col-10 col-lg-2 mx-auto">
                        <p className="text-uppercase">цена</p>
                    </div>
                    <div className="col-10 col-lg-2 mx-auto">
                        <p className="text-uppercase">количество</p>
                    </div>
                    <div className="col-10 col-lg-2 mx-auto">
                        <p className="text-uppercase">удалить</p>
                    </div>
                    <div className="col-10 col-lg-2 mx-auto">
                        <p className="text-uppercase">итог</p>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default CartColumns;