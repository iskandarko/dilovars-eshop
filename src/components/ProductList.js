import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductContext } from '../context';
import AddProductBtn from './AddProductBtn';

class ProductList extends Component {
    render() { 
        return ( 
            <>
                <Title name="Все" title="товары" />
                <div className="mb-5">
                    <div className="container"> 
                        <div className="row">
                            {this.context.products.map(product => {
                                return (
                                    <Product 
                                        key={this.context.products.indexOf(product)} 
                                        product={product} 
                                        handleDetails={this.context.handleDetails}
                                        openModal={this.context.openModal}
                                        addToCart={this.context.addToCart}
                                        isAdminMode={this.context.isAdminMode}
                                        dbProductDelete={this.context.dbProductDelete}
                                    />
                                );
                            })}
                            {this.context.isAdminMode && <AddProductBtn />}
                        </div>
                    </div>
                </div>
            </>
         );
    }
}
 
ProductList.contextType = ProductContext;

export default ProductList;