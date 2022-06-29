import {
  formatPrice,
  getAdaptedValue,
  getPagesCount,
  replaceImagePath,
  getActiveValueFilter,
  addElementFilter,
  removeElementFilter,
  getQueryParam,
  swapParam
} from './utils';
import {Guitar} from '../mock/test';
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
    expect(JSON.stringify(getQueryParam ({sort: 'asc', order: ''}, QueryParamsTypeSort))).toBe(JSON.stringify({_sort: 'asc'}));
  });

  it('should swap key and value', () => {
    expect(JSON.stringify(swapParam())).toBe(JSON.stringify({'price_gte': 'priceMin', 'price_lte': 'priceMax', stringCount: 'numberStrings', type: 'types', _sort: 'sort', _order: 'order'}));
  });

});
