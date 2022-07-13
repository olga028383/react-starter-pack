import {cart} from './cart';
import {ActionType} from '../action';
import {Guitar} from '../../mock/test';

const stateCartTest = {
  sale: 0,
  coupon: null,
  countGuitars: 0,
  guitars: [],
};

describe('Reducer: cart', () => {
  it('should add coupon', () => {
    const couponAction = {
      type: ActionType.SET_COUPON,
      payload: 'test-111',
    };

    expect(cart(stateCartTest, couponAction))
      .toEqual({
        ...stateCartTest,
        coupon: 'test-111',
      });
  });

  it('should add sale', () => {
    const saleAction = {
      type: ActionType.SET_SALE,
      payload: 15,
    };

    expect(cart(stateCartTest, saleAction))
      .toEqual({
        ...stateCartTest,
        sale: 15,
      });
  });

  it('should add count guitars', () => {
    const countGuitarsAction = {
      type: ActionType.SET_COUNT_GUITARS,
      payload: 1,
    };

    expect(cart(stateCartTest, countGuitarsAction))
      .toEqual({
        ...stateCartTest,
        countGuitars: 1,
      });
  });

  it('should add cart guitars', () => {
    const cartGuitarsAction = {
      type: ActionType.SET_CART_GUITARS,
      payload: [Guitar],
    };

    expect(cart(stateCartTest, cartGuitarsAction))
      .toEqual({
        ...stateCartTest,
        guitars: [Guitar],
      });
  });
});
