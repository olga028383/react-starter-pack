import {formatPrice, getAdaptedValue, getPagesCount, replaceImagePath} from './utils';
import {Guitar} from '../mock/test';
import {GuitarType} from '../constants/adapters';

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
});
