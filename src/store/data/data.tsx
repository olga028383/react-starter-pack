import {ActionType} from '../action';
import {dataState} from '../../types/state';
import {LoadStatus} from '../../constants/constants';
import {
  guitarsActionType, loadDataActionType, priceInitMaxActionType,
  priceInitMinActionType
} from '../../types/action';

const initialState: dataState = {
  guitars: [],
  priceMin: 0,
  priceMax: 0,
  loadData: LoadStatus.INIT,
};

type actionProp = loadDataActionType | guitarsActionType | priceInitMaxActionType | priceInitMinActionType;

const data = (state = initialState, action: actionProp) => {
  switch (action.type) {
    case ActionType.LOAD_GUITARS:
      return {
        ...state,
        guitars: action.payload,
      };
    case ActionType.INIT_PRICE_MIN:
      return {
        ...state,
        priceMin: action.payload,
      };
    case ActionType.INIT_PRICE_MAX:
      return {
        ...state,
        priceMax: action.payload,
      };
    case ActionType.SET_LOAD_DATA:
      return {
        ...state,
        loadData: action.payload,
      };
    default:
      return state;
  }
};

export {data};
