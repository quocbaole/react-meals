import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { Switch, Route, Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to='/'><h1>ReactMeals</h1></Link>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <Switch>
        <Route path='/' exact>
          <div className={classes['main-image']}>
            <img src={mealsImage} alt='A table full of delicious food!' />
          </div>
        </Route>
      </Switch>

    </Fragment>
  );
};

export default Header;
