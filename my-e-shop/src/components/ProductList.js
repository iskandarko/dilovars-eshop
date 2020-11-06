import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h2>Hello from ProductList</h2>
                <Product />
            </div>
         );
    }
}
 
export default ProductList;