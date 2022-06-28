import {data} from './data';
import {ActionType} from '../action';
import {Guitar} from '../../mock/test';
import {LoadStatus} from "../../constants/constants";

describe('Reducer: data', () => {

  it('should set up a list of guitars', () => {
    const questAction = {
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    };

    expect(data({loadData: LoadStatus.INIT, guitars: [], priceMin: 0, priceMax: 0}, questAction))
      .toEqual({loadData: true, guitars: [Guitar], priceMin: 0, priceMax: 0});

    expect(data({loadData: LoadStatus.SUCCESS, guitars: [], priceMin: 0, priceMax: 0}, questAction))
      .toEqual({loadData: LoadStatus.SUCCESS, guitars: [Guitar], priceMin: 0, priceMax: 0});

  });

  it('should set the data load flag', () => {
    const isLoadAction = {
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    };

    expect(data({loadData: LoadStatus.INIT, guitars: [], priceMin: 0, priceMax: 0}, isLoadAction))
      .toEqual({loadData: LoadStatus.SUCCESS, guitars: [Guitar], priceMin: 0, priceMax: 0});

    expect(data({loadData: LoadStatus.INIT, guitars: [Guitar], priceMin: 0, priceMax: 0}, isLoadAction))
      .toEqual({loadData: LoadStatus.SUCCESS, guitars: [Guitar], priceMin: 0, priceMax: 0});

  });
});
