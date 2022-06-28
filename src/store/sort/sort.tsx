import {ActionType} from '../action';
import {sortState} from '../../types/state';

const initialState: sortState = {
  sort: '',
  order: '',
};

const sort = (state = initialState, action: any): sortState => {
  switch (action.type) {
    case ActionType.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case ActionType.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export {sort};
