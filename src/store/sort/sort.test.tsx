import {sort} from './sort';
import {ActionType} from '../action';

describe('Reducer: Sort', () => {

  it('must set sort', () => {
    const sortAction = {
      type: ActionType.SET_SORT,
      payload: 'price',
    };

    expect(sort({sort: '', order: ''}, sortAction))
      .toEqual({sort: 'price', order: ''});

  });

  it('must set order', () => {
    const orderAction = {
      type: ActionType.SET_ORDER,
      payload: 'asc',
    };

    expect(sort({sort: '', order: ''}, orderAction))
      .toEqual({sort: '', order: 'asc'});

  });

});
