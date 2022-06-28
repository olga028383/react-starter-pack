import {data} from './data';
import {ActionType} from '../action';
import {Guitar} from '../../mock/test';
import {LoadStatus} from '../../constants/constants';

describe('Reducer: data', () => {

  it('should set up a list of guitars', () => {
    const guitarAction = {
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    };

    expect(data({loadData: LoadStatus.INIT, guitars: [], priceMin: 0, priceMax: 0}, guitarAction))
      .toEqual({loadData: LoadStatus.INIT, guitars: [Guitar], priceMin: 0, priceMax: 0});

    expect(data({loadData: LoadStatus.SUCCESS, guitars: [Guitar], priceMin: 0, priceMax: 0}, guitarAction))
      .toEqual({loadData: LoadStatus.SUCCESS, guitars: [Guitar], priceMin: 0, priceMax: 0});

  });

  it('should set the data load status', () => {
    const isLoadAction = {
      type: ActionType.SET_LOAD_DATA,
      payload: LoadStatus.SUCCESS,
    };

    expect(data({loadData: LoadStatus.INIT, guitars: [Guitar], priceMin: 0, priceMax: 0}, isLoadAction))
      .toEqual({loadData: LoadStatus.SUCCESS, guitars: [Guitar], priceMin: 0, priceMax: 0});

  });
});
