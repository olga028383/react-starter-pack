import {
  formatPrice,
  getAdaptedValue,
  getPagesCount,
  replaceImagePath,
  getActiveValueFilter,
  addElementFilter,
  removeElementFilter,
  getQueryParam,
  swapParam, checkPrice, getPriceParam, checkSort, checkOrder, checkPriceParam, checkType, checkNumberStrings,
  getLengthObject, changeCountProductInCart, checkGuitarInCart, getCountInCart, getSumInCart, getSale
} from './utils';
import {Guitar, GuitarCart} from '../mock/test';
import {GuitarType, QueryParamsTypeSort} from '../constants/adapters';

describe('tests utility functions', () => {
  it('must return a valid path', () => {
    expect(JSON.stringify(replaceImagePath(Guitar.previewImg))).toBe(JSON.stringify({
      winPath: '/img/content/catalog-product-1.jpg',
      macPath: '/img/content/catalog-product-1@2x.jpg',
    }));
  });

  it('should return the formatted price', () => {
    expect(formatPrice(Guitar.price)).toBe('17 500 ₽');
  });

  it('should return the number of directory pages', () => {
    expect(getPagesCount(27)).toBe(3);
    expect(getPagesCount(0)).toBe(0);
  });

  it('should return a value from Map', () => {
    expect(getAdaptedValue('electric', GuitarType)).toBe('Электрогитара');
    expect(getAdaptedValue('test', GuitarType)).toBe('');
    expect(getAdaptedValue('electric', '')).toBe('');
  });

  it('should return active filter', () => {
    expect(getActiveValueFilter([], 'test')).toBe(false);
    expect(getActiveValueFilter(['test'], '')).toBe(false);
    expect(getActiveValueFilter(['test'], 'test')).toBe(true);
  });

  it('should add value to filter array', () => {
    expect(JSON.stringify(addElementFilter([], 'test'))).toBe(JSON.stringify(['test']));
    expect(JSON.stringify(addElementFilter(['test'], 'test'))).toBe(JSON.stringify(['test']));
  });

  it('should remove value to filter array', () => {
    expect(JSON.stringify(removeElementFilter([], 'test'))).toBe(JSON.stringify([]));
    expect(JSON.stringify(removeElementFilter(['test'], 'test'))).toBe(JSON.stringify([]));
  });

  it('should get parameters from the state', () => {
    expect(JSON.stringify(getQueryParam({
      sort: 'asc',
      order: ''
    }, QueryParamsTypeSort))).toBe(JSON.stringify({_sort: 'asc'}));
  });

  it('should swap key and value', () => {
    expect(JSON.stringify(swapParam())).toBe(JSON.stringify({
      'price_gte': 'priceMin',
      'price_lte': 'priceMax',
      stringCount: 'numberStrings',
      type: 'types',
      _sort: 'sort',
      _order: 'order'
    }));
  });

  it('method checkPrice', () => {
    expect(checkPrice(25, 20, 30)).toBe(true);
    expect(checkPrice(10, 10, 30)).toBe(false);
    expect(checkPrice(35, 10, 30)).toBe(false);
  });

  it('method getPriceParam', () => {
    expect(getPriceParam('test')).toBe(null);
  });

  it('method checkSort', () => {
    expect(checkSort('test')).toBe(false);
    expect(checkSort('price')).toBe(true);
  });

  it('method checkOrder', () => {
    expect(checkOrder('test')).toBe(false);
    expect(checkOrder('asc')).toBe(true);
  });

  it('method checkPriceParam', () => {
    expect(checkPriceParam('test')).toBe(true);
    expect(checkPriceParam('22')).toBe(false);
    expect(checkPriceParam(100)).toBe(false);
  });

  it('method checkType', () => {
    expect(checkType('test')).toBe(false);
    expect(checkType('acoustic')).toBe(true);
  });

  it('method checkNumberStrings', () => {
    expect(checkNumberStrings('test')).toBe(false);
    expect(checkNumberStrings('33')).toBe(false);
    expect(checkNumberStrings(25)).toBe(false);
    expect(checkNumberStrings(7)).toBe(true);
  });

  it('method getLengthObject', () => {
    expect(getLengthObject('test')).toBe(4);
    expect(getLengthObject({'test': 1})).toBe(1);
  });

  it('method changeCountProductInCart', () => {
    expect(JSON.stringify(changeCountProductInCart([Guitar], GuitarCart, -1))).toBe(JSON.stringify([]));
    expect(JSON.stringify(changeCountProductInCart([Guitar], GuitarCart, 10)[0].countInCart)).toBe('10');
    expect(JSON.stringify(changeCountProductInCart([GuitarCart], GuitarCart, 0)[0].countInCart)).toBe('2');
    expect(JSON.stringify(changeCountProductInCart([GuitarCart], GuitarCart, 1)[0].countInCart)).toBe('1');
  });

  it('method checkGuitarInCart', () => {
    expect(checkGuitarInCart([Guitar], Guitar)).toBe(true);
    expect(checkGuitarInCart([], Guitar)).toBe(false);
  });

  it('method getCountInCart', () => {
    expect(getCountInCart([GuitarCart, GuitarCart])).toBe(2);
    expect(getCountInCart([])).toBe(0);
  });

  it('method getSumInCart', () => {
    expect(getSumInCart([GuitarCart, GuitarCart])).toBe(35000);
    expect(getSumInCart([])).toBe(0);
  });

  it('method getSale', () => {
    expect(getSale(10, 100)).toBe(10);
    expect(getSale(0, 100)).toBe(0);
    expect(getSale(10, 0)).toBe(0);
  });
});
