import {ActionType} from '../action';
import {sortState} from '../../types/state';
import {orderActionType, sortActionType} from '../../types/action';

const initialState: sortState = {
  sort: '',
  order: '',
};

type actionProp = sortActionType | orderActionType;

const sort = (state = initialState, action: actionProp): sortState => {
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
