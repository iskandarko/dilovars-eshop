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

function App() {
  return (
    <React.Fragment>
      <MyNavbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/products' component={ProductList} />
        <Route path='/products/:id' component={Details} />
        <Route path='/cart' component={Cart} />
        <Route component={Default} />
      </Switch>
      <MyModal />
    </React.Fragment>
  );
}

export default App;
