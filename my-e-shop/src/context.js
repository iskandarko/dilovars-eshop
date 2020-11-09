import React, { Component } from 'react';
import { storeProducts } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = { products: storeProducts }
    handleDetails() {
        console.log('hello from handleDetails');
    }
    addToCart() {
        console.log('hello from addToCart');
    }
    render() { 
        return ( 
            <ProductContext.Provider value={{
                ...this.state, //pass the whole state to this object
                handleDetails: this.handleDetails,
                addToCart: this.addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
         );
    }
}

const ProductConsumer = ProductContext.Consumer;
 
export {ProductProvider, ProductConsumer};