import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import ProductList from '../components/ProductList';
import Details from '../components/Details';
import Cart from '../components/Cart/Cart';
import MyModal from '../components/MyModal';
import Default from '../components/Default';
import LandingPage from '../components/LandingPage';
import Order from '../components/Order/Order';

function App() {
  return (
    <React.Fragment>
      <MyNavbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/products' component={ProductList} />
        <Route path='/products/:id' component={Details} />
        <Route exact path='/cart' component={Cart} />
        <Route path="/order" component={Order} />
        <Route component={Default} />
      </Switch>
      <MyModal />
      <MyFooter />
    </React.Fragment>
  );
}


export default App;
