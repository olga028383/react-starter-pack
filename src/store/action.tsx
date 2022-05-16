import {Guitar} from '../types/guitar';
import {AxiosInstance} from 'axios';
import {currentPageActionType, guitarsActionType, apiActionType, serverErrorActionType} from '../types/action';

export const ActionType = {
  LOAD_GUITARS: 'data/loadGuitars',
  GET_API: 'application/getApi',
  SET_CURRENT_PAGE: 'application/setCurrentPage',
  SET_SERVER_ERROR: 'application/setServerError',
};

export const loadGuitars = (guitars: Guitar[]): guitarsActionType => ({
  type: ActionType.LOAD_GUITARS,
  payload: guitars,
});

export const setApi = (api: AxiosInstance): apiActionType => ({
  type: ActionType.GET_API,
  payload: api,
});

export const setCurrentPage = (page: number): currentPageActionType => ({
  type: ActionType.SET_CURRENT_PAGE,
  payload: page,
});

export const setServerError = (error: string): serverErrorActionType => ({
  type: ActionType.SET_SERVER_ERROR,
  payload: error,
});


