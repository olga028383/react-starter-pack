import {store} from '../index';
import {Guitar} from './data';

export type dataState = {
  guitars: Guitar[],
  isDataLoaded: boolean,
};

export type applicationState = {
  serverError: string,
  currentPage: number,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
