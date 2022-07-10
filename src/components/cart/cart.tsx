import React from 'react';
import './cart.css';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import {Guitar} from '../../types/data';
import PageTitle from '../page-title/page-title';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {AppRoute, Message} from '../../constants/constants';
import CartItem from './cart-item/cart-item';
import {getCartGuitars, getCountGuitars, getSalePercent} from '../../store/cart/selectors';
import {State} from '../../types/state';
import {formatPrice, getSale, getSumInCart} from '../../utils/utils';
import Coupon from './coupon/coupon';

const mapStateToProps = (state: State) => ({
  guitars: getCartGuitars(state),
  countGuitars: getCountGuitars(state),
  percent: getSalePercent(state),
});

type Props = {
  guitars?: Guitar[],
  countGuitars?: number,
  percent?: number,
}

function Cart({guitars = [], countGuitars = 0, percent = 0}: Props): JSX.Element {
  const breadcrumbs = [{to: AppRoute.CATALOG, text: Message.Catalog}, {to: AppRoute.CART, text: Message.Cart}];
  const sum = getSumInCart(guitars);
  const sale = getSale(percent, sum);

  return (
    <>
      <PageTitle text={Message.Cart}/>

      <Breadcrumbs links={breadcrumbs}/>

      {
        countGuitars > 0 ?
          <div className="cart">

            {guitars.length > 0 && guitars.map((guitar) => <CartItem key={`${nanoid()}-guitar`} guitar={guitar}/>)}

            <div className="cart__footer">
              <Coupon/>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{formatPrice(sum)}</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  {percent ? <span className="cart__total-value cart__total-value--bonus">- {formatPrice(sale)}</span> : <span className="cart__total-value">{formatPrice(0)}</span>}
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{formatPrice(sum - sale)}</span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
          : Message.CartEmpty
      }
    </>
  );
}

export {Cart};
export default connect(mapStateToProps)(Cart);

