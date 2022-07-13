import {Guitar} from '../types/data';
import {
  apiActionType, cartGuitarsActionType, clearFilterActionType, clearSearchActionType, countGuitarsActionType,
  couponActionType,
  currentPageActionType,
  guitarsActionType,
  loadDataActionType,
  numberStringsActionType,
  orderActionType,
  priceFilterMaxActionType,
  priceFilterMinActionType,
  priceInitMaxActionType,
  priceInitMinActionType, saleActionType, searchGuitarsActionType, searchWordActionType,
  serverErrorActionType, sortActionType,
  totalPagesActionType, typeActionType
} from '../types/action';
import {AxiosInstance} from 'axios';

export const ActionType = {
  LOAD_GUITARS: 'data/loadGuitars',
  SET_LOAD_DATA: 'data/loadData',
  INIT_PRICE_MIN: 'data/initPriceMin',
  INIT_PRICE_MAX: 'data/initPriceMax',
  SET_CURRENT_PAGE: 'application/setCurrentPage',
  SET_TOTAL_PAGES: 'application/setTotalPages',
  SET_SERVER_ERROR: 'application/setServerError',
  SET_API: 'application/setApi',
  SET_SORT: 'order/setSort',
  SET_ORDER: 'order/setOrder',
  SET_PRICE_MIN: 'filter/setPriceMin',
  SET_PRICE_MAX: 'filter/setPriceMax',
  SET_TYPE: 'filter/setType',
  SET_NUMBER_STRINGS: 'filter/setNumberStrings',
  CLEAR_FILTER: 'filter/clearFilter',
  SET_SEARCH_WORD: 'search/setSearchWord',
  SET_SEARCH_GUITARS: 'search/setGuitars',
  CLEAR_SEARCH_GUITARS: 'search/clearSearchGuitars',
  SET_COUPON: 'search/setCoupon',
  SET_CART_GUITARS: 'cart/setGuitars',
  SET_COUNT_GUITARS: 'cart/setCountGuitars',
  SET_SALE: 'cart/setSale',
};

export const loadGuitars = (guitars: Guitar[]): guitarsActionType => ({
  type: ActionType.LOAD_GUITARS,
  payload: guitars,
});

export const initPriceMin = (priceMin: number): priceInitMinActionType => ({
  type: ActionType.INIT_PRICE_MIN,
  payload: priceMin,
});

export const initPriceMax = (priceMax: number): priceInitMaxActionType => ({
  type: ActionType.INIT_PRICE_MAX,
  payload: priceMax,
});

export const setCurrentPage = (page: number): currentPageActionType => ({
  type: ActionType.SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalPages = (pages: number): totalPagesActionType => ({
  type: ActionType.SET_TOTAL_PAGES,
  payload: pages,
});

export const setServerError = (error: string): serverErrorActionType => ({
  type: ActionType.SET_SERVER_ERROR,
  payload: error,
});

export const setApi = (api: AxiosInstance): apiActionType => ({
  type: ActionType.SET_API,
  payload: api,
});

export const setSort = (sort: string): sortActionType => ({
  type: ActionType.SET_SORT,
  payload: sort,
});

export const setOrder = (order: string): orderActionType => ({
  type: ActionType.SET_ORDER,
  payload: order,
});

export const setPriceMin = (priceMin: number): priceFilterMinActionType => ({
  type: ActionType.SET_PRICE_MIN,
  payload: priceMin,
});

export const setPriceMax = (priceMax: number): priceFilterMaxActionType => ({
  type: ActionType.SET_PRICE_MAX,
  payload: priceMax,
});

export const setType = (type: any): typeActionType => ({
  type: ActionType.SET_TYPE,
  payload: type,
});

export const setNumberStrings = (numberStrings: any): numberStringsActionType => ({
  type: ActionType.SET_NUMBER_STRINGS,
  payload: numberStrings,
});

export const clearFilter = (): clearFilterActionType => ({
  type: ActionType.CLEAR_FILTER,
});

export const loadData = (status: string): loadDataActionType => ({
  type: ActionType.SET_LOAD_DATA,
  payload: status,
});

export const setSearchWord = (word: string): searchWordActionType => ({
  type: ActionType.SET_SEARCH_WORD,
  payload: word,
});

export const setSearchGuitars = (guitars: Guitar[]): searchGuitarsActionType => ({
  type: ActionType.SET_SEARCH_GUITARS,
  payload: guitars,
});

export const clearSearchGuitars = (): clearSearchActionType => ({
  type: ActionType.CLEAR_SEARCH_GUITARS,
});

export const setCoupon = (coupon: null | string): couponActionType => ({
  type: ActionType.SET_COUPON,
  payload: coupon,
});

export const setCartGuitars = (guitars: Guitar[]): cartGuitarsActionType => ({
  type: ActionType.SET_CART_GUITARS,
  payload: guitars,
});

export const setCountGuitars = (countGuitars: number): countGuitarsActionType => ({
  type: ActionType.SET_COUNT_GUITARS,
  payload: countGuitars,
});

export const setSale = (sale: number): saleActionType => ({
  type: ActionType.SET_SALE,
  payload: sale,
});
