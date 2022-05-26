import {store} from '../index';
import {Guitar} from './data';
import {AxiosInstance} from 'axios';

export type dataState = {
  guitars: Guitar[],
  isDataLoaded: boolean,
};

export type applicationState = {
  serverError: string,
  currentPage: number,
  totalPages: number,
  api: null | AxiosInstance,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
