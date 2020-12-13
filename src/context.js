import React, { Component } from 'react';
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailsProduct: {},
        modalProduct: detailProduct,
        modalOpen: false,
        cart: [],
        cartTotal: 0,
        order: [],
        orderTotal: 0
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

    updateTotals = () => { 
        console.log("hello from updateTotals");
        this.setState((prevState) => {
            let totals = 0;
            prevState.cart.forEach(item => 
                {
                    totals += item.total
                });
                console.log("totals is: " + totals);
            return {
                cartTotal: totals
            }
        })
    }

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1; 
        const price = product.price;
        product.total = price; 
        this.setState(() => {
            return (
                {
                    products: tempProducts,
                    cart: [...this.state.cart, product]
                } 
            );
        }, () => {
            console.log(this.state);
            this.updateTotals();
        });
    }

    removeItem = id => {
        this.setState((prevState) => {
            const index = prevState.products.indexOf(this.getItem(id));
            const tempCart = prevState.cart.filter(item => item.id !== id);
            let removedProduct = prevState.products[index];
            removedProduct.inCart = false;
            removedProduct.total = 0;
            removedProduct.count = 0;
            return (
                {
                    cart: tempCart,
                    products: prevState.products
                }
            );
        }, () => {this.updateTotals()});
    }

    clearCart = () => {
        this.setState(() => {
            return({
                cart: []
            });
        }, () => {
            this.setProducts();
            this.updateTotals();
        });
    }

    clearOrder = () => {
        this.setState(() => {
            return({
                order: [],
                orderTotal: 0
            });
        });
    }

    handleOrder = () => {
        console.log('Hi from HandleOrder!');
        this.setState((prevState) => {
            return(
                {
                    order: prevState.cart,
                    orderTotal: prevState.cartTotal
                }
            );
        }, () => {this.clearCart()});
    }

    increment = id => {
        console.log("Hi from increment!");
        this.setState((prevState) => {
            const index = prevState.cart.indexOf(this.getItem(id));
            prevState.cart[index].count += 1 ;
            prevState.cart[index].total = prevState.cart[index].price * prevState.cart[index].count;
            return(
                {
                    cart: prevState.cart
                }
            );
        }, () => {this.updateTotals()});
    }

    decrement = id => {
        console.log("Hi from decrement!");
        this.setState((prevState) => {
            const index = prevState.cart.indexOf(this.getItem(id));
            if (prevState.cart[index].count > 1) {
                prevState.cart[index].count -= 1;
                prevState.cart[index].total = prevState.cart[index].price * prevState.cart[index].count;
            }
            return(
                {
                    cart: prevState.cart
                }
            );
        }, () => {this.updateTotals()});
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
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    handleOrder: this.handleOrder,
                    clearOrder: this.clearOrder
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
         );
    }
}

const ProductConsumer = ProductContext.Consumer;
 
export {ProductProvider, ProductConsumer, ProductContext};