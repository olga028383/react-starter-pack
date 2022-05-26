import {Guitar} from '../types/data';
import {
  apiActionType, currentPageActionType, guitarsActionType, serverErrorActionType,
  totalPagesActionType
} from '../types/action';
import {AxiosInstance} from 'axios';

export const ActionType = {
  LOAD_GUITARS: 'data/loadGuitars',
  SET_CURRENT_PAGE: 'application/setCurrentPage',
  SET_TOTAL_PAGES: 'application/setTotalPages',
  SET_SERVER_ERROR: 'application/setServerError',
  SET_API: 'application/setApi',
};

export const loadGuitars = (guitars: Guitar[]): guitarsActionType => ({
  type: ActionType.LOAD_GUITARS,
  payload: guitars,
});

export const setCurrentPage = (page: number): currentPageActionType => ({
  type: ActionType.SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalPages = (pages: number): totalPagesActionType => ({
  type: ActionType.SET_TOTAL_PAGES,
  payload: pages,
});

export const setServerError = (error: string): serverErrorActionType => ({
  type: ActionType.SET_SERVER_ERROR,
  payload: error,
});

export const setApi = (api: AxiosInstance): apiActionType => ({
  type: ActionType.SET_API,
  payload: api,
});


