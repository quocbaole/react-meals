import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import MealsSummary from './components/Meals/MealsSummary';
import { Route, Switch, Redirect } from 'react-router-dom';
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Switch>
        <Route path='/' exact>
          <MealsSummary />
        </Route>
        <Route path='/meals' exact>
          <Meals />
        </Route>
      </Switch>
    </CartProvider>
  );
}

export default App;
