import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import MyNavbar from './components/MyNavbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import MyModal from './components/MyModal';
import Default from './components/Default';
import LandingPage from './components/LandingPage';
import CartOrder from './components/Cart/CartOrder'

function App() {
  return (
    <React.Fragment>
      <MyNavbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/products' component={ProductList} />
        <Route path='/products/:id' component={Details} />
        <Route exact path='/cart' component={Cart} />
        <Route path="/cart/order" component={CartOrder} />
        <Route component={Default} />
      </Switch>
      <MyModal />
    </React.Fragment>
  );
}

export default App;
