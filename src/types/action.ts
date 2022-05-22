import {ActionType} from '../store/action';
import {Guitar} from './data';

export type guitarsActionType = {
  type: typeof ActionType.LOAD_GUITARS,
  payload: Guitar[],
};

export type currentPageActionType = {
  type: typeof ActionType.SET_CURRENT_PAGE,
  payload: number,
};

export type serverErrorActionType = {
  type: typeof ActionType.SET_SERVER_ERROR,
  payload: string,
};
