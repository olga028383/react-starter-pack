import {ActionType} from '../action';
import {filterState} from '../../types/state';
import {
  clearFilterActionType,
  numberStringsActionType, priceFilterMaxActionType, priceFilterMinActionType,
  typeActionType
} from '../../types/action';

const initialState: filterState = {
  priceMin: 0,
  priceMax: 0,
  types: [],
  numberStrings: [],
};

type actionProp = priceFilterMinActionType | priceFilterMaxActionType | typeActionType | numberStringsActionType | clearFilterActionType;

const filter = (state = initialState, action: actionProp) => {
  switch (action.type) {
    case ActionType.SET_PRICE_MIN:
      return {
        ...state,
        priceMin: action.payload,
      };
    case ActionType.SET_PRICE_MAX:
      return {
        ...state,
        priceMax: action.payload,
      };
    case ActionType.SET_TYPE:
      return {
        ...state,
        types: action.payload,
      };
    case ActionType.SET_NUMBER_STRINGS:
      return {
        ...state,
        numberStrings: action.payload,
      };
    case ActionType.CLEAR_FILTER:
      return {
        priceMin: 0,
        priceMax: 0,
        types: [],
        numberStrings: [],
      };
    default:
      return state;
  }
};

export {filter};
