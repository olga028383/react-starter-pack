import React from 'react';
import './header.css';
import Logo from '../logo/logo';
import Search from '../search/search';
import {Link, NavLink} from 'react-router-dom';
import {AppRoute} from '../../constants/constants';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">

        <Logo additionalClass='header__logo '/>

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <NavLink
                to={AppRoute.CATALOG}
                activeClassName="link--current"
                className='link main-nav__link'
              >
                Каталог
              </NavLink>
            </li>
            <li>
              <NavLink
                to={AppRoute.ROOT}
                className='link main-nav__link'
              >
                Где купить?
              </NavLink>
            </li>
            <li>
              <NavLink
                to={AppRoute.ROOT}
                className='link main-nav__link'
              >
                О компании
              </NavLink>
            </li>
          </ul>
        </nav>

        <Search/>

        <Link className="header__cart-link" to="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
