import React from 'react';
import { Link } from 'react-router-dom';

const AddProductBtn = () => {
    return ( 
        <>
            <div className="col-10 col-sm-6 col-lg-4 col-xl-3 my-3 mx-auto mx-sm-0">
                <Link to="/products/new" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <div className="add_new_product">
                        <i class="far fa-plus-square fa-5x"></i>
                    </div>
                </Link>    
            </div>
        </>
     );
}
 
export default AddProductBtn;