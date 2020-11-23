import React, { Component } from 'react';
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        cart: [],
        detailsProduct: {},
        modalProduct: detailProduct,
        modalOpen: false
    }

    componentDidMount() {
        this.setProducts();
    }
    
    //method to avoid passing of refferences to storeProducts items but instead passing the values to the state
    setProducts() { 
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts.push(singleItem);
        });
        this.setState(() => {
            return {products: tempProducts}
        });
    }

    getItem = id => {
        // const product;
        // this.state.products.forEach( item => {
        //     if (item.id === id) {
        //         product = {...item};
        //     }
        // });
        const product = this.state.products.find(item => item.id === id);
        return product;
    }


    handleDetails = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailsProduct: product}
        });
    }

    addToCart = id => {
        console.log('Hello from addToCart!');
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1; 
        const price = product.price; //???
        product.total = price; //???
        this.setState(() => {
            return (
                {
                    products: tempProducts,
                    cart: [...this.state.cart, product]
                } 
            );
        }, () => {
            console.log(this.state);
        });
    }

    openModal = id => {
        console.log('hello from openModal');
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen: true};
        });
    }

    closeModal = () => {
        console.log('hello from closeModal');
        this.setState(() => {
            return {modalOpen: false}
        });
    }

    render() { 
        return ( 
            <ProductContext.Provider 
                value={{
                    ...this.state, 
                    setProducts: this.setProducts,
                    handleDetails: this.handleDetails,
                    addToCart: this.addToCart,
                    getItem: this.getItem,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
         );
    }
}

const ProductConsumer = ProductContext.Consumer;
 
export {ProductProvider, ProductConsumer};