import {ActionType} from '../action';
import {applicationState} from '../../types/state';
import {apiActionType, currentPageActionType, serverErrorActionType, totalPagesActionType} from '../../types/action';

const initialState: applicationState = {
  serverError: '',
  currentPage: 1,
  totalPages: 0,
  api: null,
};

type dataApplicationActionType = serverErrorActionType | currentPageActionType | apiActionType | totalPagesActionType;

const application = (state = initialState, action: dataApplicationActionType) => {
  switch (action.type) {
    case ActionType.SET_SERVER_ERROR:
      return {
        ...state,
        serverError: action.payload,
      };
    case ActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ActionType.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case ActionType.SET_API:
      return {
        ...state,
        api: action.payload,
      };
    default:
      return state;
  }
};

export {application};
