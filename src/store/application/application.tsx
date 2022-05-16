import {ActionType} from '../action';
import {applicationState} from '../../types/state';
import {apiActionType, currentPageActionType, serverErrorActionType} from '../../types/action';

const initialState: applicationState = {
  api: {},
  serverError: '',
  currentPage: 1,
};

type dataApplicationActionType = apiActionType | serverErrorActionType | currentPageActionType;

const application = (state = initialState, action: dataApplicationActionType) => {
  switch (action.type) {
    case ActionType.GET_API:
      return {
        ...state,
        api: action.payload,
      };
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
    default:
      return state;
  }
};

export {application};
