import React from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context';

class AddProductBtn extends React.Component {

    render() { 
        return ( 
            <>
                <div className="col-10 col-sm-6 col-lg-4 col-xl-3 my-3 mx-auto mx-sm-0">
                    <Link 
                        to="/products/new" 
                        style={{ color: 'inherit', textDecoration: 'inherit'}}
                        onClick={() => {this.context.handleDetails("new")}}
                        >
                        <div className="add_new_product">
                            <i class="far fa-plus-square fa-5x"></i>
                        </div>
                    </Link>
                </div>
            </>
         );
    }
}

AddProductBtn.contextType = ProductContext;

export default AddProductBtn;