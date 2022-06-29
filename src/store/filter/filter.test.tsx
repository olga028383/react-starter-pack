import {filter} from './filter';
import {ActionType} from '../action';

describe('Reducer: filter', () => {

  it('must set a minimum price', () => {
    const setPriceMinAction = {
      type: ActionType.SET_PRICE_MIN,
      payload: 3000,
    };

    expect(filter({types: ['electric'], numberStrings: [4], priceMin: 300, priceMax: 0}, setPriceMinAction))
      .toEqual({types: ['electric'], numberStrings: [4], priceMin: 3000, priceMax: 0});

  });

  it('must set a maximum price', () => {
    const setPriceMaxAction = {
      type: ActionType.SET_PRICE_MAX,
      payload: 20000,
    };

    expect(filter({types: ['electric'], numberStrings: [4], priceMin: 300, priceMax: 0}, setPriceMaxAction))
      .toEqual({types: ['electric'], numberStrings: [4], priceMin: 300, priceMax: 20000});
  });

  it('must set types', () => {
    const typeAction = {
      type: ActionType.SET_TYPE,
      payload: ['electric', 'test'],
    };

    expect(filter({types: ['electric'], numberStrings: [4], priceMin: 300, priceMax: 0}, typeAction))
      .toEqual({types: ['electric', 'test'], numberStrings: [4], priceMin: 300, priceMax: 0});
  });

  it('must set number strings', () => {
    const numberStringsAction = {
      type: ActionType.SET_NUMBER_STRINGS,
      payload: [4,5],
    };

    expect(filter({types: ['electric'], numberStrings: [4], priceMin: 300, priceMax: 0}, numberStringsAction))
      .toEqual({types: ['electric'], numberStrings: [4,5], priceMin: 300, priceMax: 0});
  });
});
