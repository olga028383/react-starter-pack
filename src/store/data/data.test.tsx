import {data} from './data';
import {ActionType} from '../action';
import {Guitar} from "../../mock/test";

describe('Reducer: data', () => {

  it('should set up a list of guitars', () => {
    const questAction = {
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    };

    expect(data({isDataLoaded: false, guitars: []}, questAction))
      .toEqual({isDataLoaded: true, guitars: [Guitar]});

    expect(data({isDataLoaded: true, guitars: []}, questAction))
      .toEqual({isDataLoaded: true, guitars: [Guitar]});

  });

  it('should set the data load flag', () => {
    const isLoadAction = {
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    };

    expect(data({isDataLoaded: false, guitars: []}, isLoadAction))
      .toEqual({isDataLoaded: true, guitars: [Guitar]});

    expect(data({isDataLoaded: false, guitars: [Guitar]}, isLoadAction))
      .toEqual({isDataLoaded: true, guitars: [Guitar]});

  });
});
