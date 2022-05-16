import {store} from '../index';
import {Guitar} from './guitar';

export type dataState = {
  guitars: Guitar[],
  isDataLoaded: boolean,
};

export type applicationState = {
  api: {},
  serverError: string,
  currentPage: number,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
