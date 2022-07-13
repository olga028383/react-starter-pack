import {ActionType} from '../action';
import {cartState} from '../../types/state';
import {cartGuitarsActionType, countGuitarsActionType, couponActionType, saleActionType} from '../../types/action';

const initialState: cartState = {
  sale: 0,
  coupon: null,
  countGuitars: 0,
  guitars: [],
};

type actionProp = couponActionType | cartGuitarsActionType | countGuitarsActionType | saleActionType;

const cart = (state = initialState, action: actionProp) => {
  switch (action.type) {
    case ActionType.SET_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case ActionType.SET_CART_GUITARS:
      return {
        ...state,
        guitars: action.payload,
      };
    case ActionType.SET_COUNT_GUITARS:
      return {
        ...state,
        countGuitars: action.payload,
      };
    case ActionType.SET_SALE:
      return {
        ...state,
        sale: action.payload,
      };
    default:
      return state;
  }
};

export {cart};
