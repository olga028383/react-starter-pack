import {ActionType} from '../action';
import {searchState} from '../../types/state';
import {clearSearchActionType, searchGuitarsActionType, searchWordActionType} from '../../types/action';

const initialState: searchState = {
  searchWord: '',
  guitars: [],
};

type actionProp = searchWordActionType | searchGuitarsActionType | clearSearchActionType;

const search = (state = initialState, action: actionProp) => {
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
