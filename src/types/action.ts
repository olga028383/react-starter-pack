import {ActionType} from '../store/action';
import {Guitar} from './data';
import {AxiosInstance} from 'axios';

export type guitarsActionType = {
  type: typeof ActionType.LOAD_GUITARS,
  payload: Guitar[],
};

export type currentPageActionType = {
  type: typeof ActionType.SET_CURRENT_PAGE,
  payload: number,
};

export type totalPagesActionType = {
  type: typeof ActionType.SET_TOTAL_PAGES,
  payload: number,
};

export type serverErrorActionType = {
  type: typeof ActionType.SET_SERVER_ERROR,
  payload: string,
};

export type apiActionType = {
  type: typeof ActionType.SET_API,
  payload: AxiosInstance,
};

export type priceInitMinActionType ={
  type: typeof ActionType.INIT_PRICE_MIN,
  payload: number,
}

export type priceInitMaxActionType ={
  type: typeof ActionType.INIT_PRICE_MAX,
  payload: number,
}

export type sortActionType = {
  type: typeof ActionType.SET_SORT,
  payload: string,
}

export type orderActionType = {
  type: typeof ActionType.SET_ORDER,
  payload: string,
}

export type priceFilterMinActionType = {
  type: typeof ActionType.SET_PRICE_MIN,
  payload: number,
}

export type priceFilterMaxActionType = {
  type: typeof ActionType.SET_PRICE_MAX,
  payload: number,
}

export type typeActionType = {
  type: typeof ActionType.SET_TYPE,
  payload: string[],
}

export type numberStringsActionType = {
  type: typeof ActionType.SET_NUMBER_STRINGS,
  payload: number[],
}

export type clearFilterActionType = {
  type: typeof ActionType.CLEAR_FILTER,
}

export type loadDataActionType = {
  type: typeof ActionType.SET_LOAD_DATA,
  payload: string,
}

export type searchWordActionType = {
  type: typeof ActionType.SET_SEARCH_WORD,
  payload: string,
}

export type searchGuitarsActionType = {
  type: typeof ActionType.SET_SEARCH_GUITARS,
  payload: Guitar[],
};

export type couponActionType = {
  type: typeof ActionType.SET_COUPON,
  payload: null | string,
}

export type cartGuitarsActionType = {
  type: typeof ActionType.SET_CART_GUITARS,
  payload: Guitar[],
};

export type countGuitarsActionType = {
  type: typeof ActionType.SET_COUNT_GUITARS,
  payload: number,
};

export type saleActionType = {
  type: typeof ActionType.SET_SALE,
  payload: number,
};
