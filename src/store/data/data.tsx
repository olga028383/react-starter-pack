import {ActionType} from '../action';
import {dataState} from '../../types/state';
import {guitarsActionType} from '../../types/action';

const initialState: dataState = {
  guitars: [],
  isDataLoaded: false,
};

type dataStateActionType = guitarsActionType;

const data = (state = initialState, action: dataStateActionType): dataState => {
  switch (action.type) {
    case ActionType.LOAD_GUITARS:
      return {
        ...state,
        guitars: action.payload,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export {data};
