import {ActionType} from '../store/action';
import {Guitar} from './data';
import {AxiosInstance} from "axios";

export type guitarsActionType = {
  type: typeof ActionType.LOAD_GUITARS,
  payload: Guitar[],
};

export type currentPageActionType = {
  type: typeof ActionType.SET_CURRENT_PAGE,
  payload: number,
};

export type totalPagesActionType = {
  type: typeof ActionType.SET_TOTAL_PAGES,
  payload: number,
};

export type serverErrorActionType = {
  type: typeof ActionType.SET_SERVER_ERROR,
  payload: string,
};

export type apiActionType = {
  type: typeof ActionType.SET_API,
  payload: AxiosInstance,
};

