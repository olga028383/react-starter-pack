import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../constants/constants';
import {getCountGuitars} from '../../../store/cart/selectors';
import {State} from '../../../types/state';

const mapStateToProps = (state: State) => ({
  count: getCountGuitars(state),
});

type Props = {
  count?: number,
}

function CartLine({count = 0}: Props): JSX.Element {
  return (
    <Link className="header__cart-link" to={AppRoute.CART} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>{count > 0 && <span className="header__cart-count">{count}</span>}
    </Link>
  );
}

export {CartLine};
export default connect(mapStateToProps)(CartLine);
