import React, { Component } from 'react';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailsProduct: {},
        modalProduct: {},
        modalOpen: false,
        cart: [],
        cartTotal: 0,
        order: [],
        orderTotal: 0,
        adminMode: false
    }

    // fillingDb() { 
    //     fetch('/setAllProducts')
    //     .then((response) => response.json())
    //     .then(data => console.log(data));
    // }

    componentDidMount() {
        this.setProducts();
    }
    
    setProducts = () => { 
        fetch('/products/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is not OK');
            }
            return response.json();
        })
        .then((DbProducts) => {
            this.saveProductsToState(this.copyProducts(DbProducts));
        })
        .catch(error => {
            alert('Произошла ошибка подключения к базе данных! Пожалуйста, проверьте подключение к интернету и повторите операцию.');
            console.error('There has been a problem with the fetch operation: ', error);
        });
    }

    saveProductsToState = productsArr => {
        this.setState(() => {
            return {products: productsArr}
        });
    }

    // COULD BE REQUIRED FOR PROPER COPYING OF DATA BEFORE SETTING TO STATE
    copyProducts(productsArr) {
        let productsCopy = [];
        productsArr.forEach(item => {
            const singleItem = {...item};
            productsCopy.push(singleItem);
        });
        return productsCopy;
    }

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetails = id => {
        let product = {};
        if (id !== 'new') {
            product = this.getItem(id);
        }
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

////////////ADMIN MODE METHODS////////////////////

    turnAdminModeOn = () => {
        console.log('Turning on manager mode');
        this.setState({adminMode: true});
    }

    turnAdminModeOff = () => {
        console.log('Turning off manager mode');
        this.setState({adminMode: false});
    }

    dbProductAdd = product => {
        if (this.state.adminMode) {
            console.log('adding new product', JSON.stringify(product));
            fetch('/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                alert('Новый продукт успешно добавлен!');
                return response.blob();
            })
            .catch(error => {
                alert('Произошла ошибка при взаимодействии с базой данных!');
                console.error('There has been a problem with the fetch operation: ', error);
            });
        }
    }

    dbProductEdit = (id, product) => {
        if (this.state.adminMode) {
            console.log('editting the product', JSON.stringify(product));
            fetch('/products/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                alert('Продукт успешно обновлен!');
                return response.blob();
            })
            .catch(error => {
                alert('Произошла ошибка подключения к базе данных! Пожалуйста, проверьте подключение к интернету и повторите операцию.');
                console.error('There has been a problem with the fetch operation: ', error);
            });
        }
    }

    dbProductDelete = id => {
        if (this.state.adminMode) {
            console.log('deleting product');
            fetch('/products/' + id, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not OK');
                }
                alert('Продукт успешно удален!');
                return response.blob();
            })
            .catch(error => {
                alert('Произошла ошибка подключения к базе данных! Пожалуйста, проверьте подключение к интернету и повторите операцию.');
                console.error('There has been a problem with the fetch operation: ', error);
            });
        }
    }
//////////////////////////////////////////////////

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
                    clearOrder: this.clearOrder,
                    turnAdminModeOn: this.turnAdminModeOn,
                    turnAdminModeOff: this.turnAdminModeOff,
                    dbProductDelete: this.dbProductDelete,
                    dbProductEdit: this.dbProductEdit,
                    dbProductAdd: this.dbProductAdd
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
         );
    }
}

const ProductConsumer = ProductContext.Consumer;
 
export {ProductProvider, ProductConsumer, ProductContext};