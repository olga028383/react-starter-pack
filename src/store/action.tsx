import {Guitar} from '../types/data';
import {currentPageActionType, guitarsActionType, serverErrorActionType} from '../types/action';

export const ActionType = {
  LOAD_GUITARS: 'data/loadGuitars',
  SET_CURRENT_PAGE: 'application/setCurrentPage',
  SET_SERVER_ERROR: 'application/setServerError',
};

export const loadGuitars = (guitars: Guitar[]): guitarsActionType => ({
  type: ActionType.LOAD_GUITARS,
  payload: guitars,
});

export const setCurrentPage = (page: number): currentPageActionType => ({
  type: ActionType.SET_CURRENT_PAGE,
  payload: page,
});

export const setServerError = (error: string): serverErrorActionType => ({
  type: ActionType.SET_SERVER_ERROR,
  payload: error,
});


