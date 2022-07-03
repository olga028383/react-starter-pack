import {store} from '../index';
import {Guitar} from './data';
import {AxiosInstance} from 'axios';

export type dataState = {
  guitars: Guitar[],
  priceMin: number,
  priceMax: number,
  loadData: string,
};

export type applicationState = {
  serverError: string,
  currentPage: number,
  totalPages: number,
  api: null | AxiosInstance,
};

export type sortState = {
  sort: string,
  order: string,
};

export type searchState = {
  searchWord: string,
  guitars: Guitar[],
};

export type filterState = {
  priceMin: number,
  priceMax: number,
  types: string[] | [],
  numberStrings: Array<number | string> | [],
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
