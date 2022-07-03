import {ActionType} from '../action';
import {searchState} from '../../types/state';

const initialState: searchState = {
  searchWord: '',
  guitars: [],
};

const search = (state = initialState, action: any): searchState => {
  switch (action.type) {
    case ActionType.SET_SEARCH_WORD:
      return {
        ...state,
        searchWord: action.payload,
      };
    case ActionType.SET_SEARCH_GUITARS:
      return {
        ...state,
        guitars: action.payload,
      };
    case ActionType.CLEAR_SEARCH_GUITARS:
      return initialState;
    default:
      return state;
  }
};

export {search};
