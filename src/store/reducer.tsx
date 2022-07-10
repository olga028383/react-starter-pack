import {combineReducers} from 'redux';
import {application} from './application/application';
import {data} from './data/data';
import {sort} from './sort/sort';
import {filter} from './filter/filter';
import {search} from './search/search';
import {cart} from './cart/cart';

export const NameSpace = {
  DATA: 'DATA',
  APPLICATION: 'APPLICATION',
  SORT: 'SORT',
  FILTER: 'FILTER',
  SEARCH: 'SEARCH',
  CART: 'CART',
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APPLICATION]: application,
  [NameSpace.SORT]: sort,
  [NameSpace.FILTER]: filter,
  [NameSpace.SEARCH]: search,
  [NameSpace.CART]: cart,
});


