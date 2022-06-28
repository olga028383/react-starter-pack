import queryString from 'query-string';
import browserHistory from '../browser-history';
import {LANGUAGE, SHOW_PAGE, SortKey, FilterKey} from '../constants/constants';
import {filterState, sortState} from '../types/state';
import {QueryParamsTypeFilter, QueryParamsTypeSort} from '../constants/adapters';
import {setNumberStrings, setOrder, setPriceMax, setPriceMin, setSort, setType} from '../store/action';

export const replaceImagePath = (src: string): { winPath: string, macPath: string } => {
  const DataForReplace = {
    Server: 'guitar',
    Local: 'content/catalog-product',
    WinExtension: '.jpg',
    MacExtension: '@2x.jpg',
  };

  const frontPath = `/${src.replace(DataForReplace.Server, DataForReplace.Local)}`;
  return {winPath: frontPath, macPath: frontPath.replace(DataForReplace.WinExtension, DataForReplace.MacExtension)};
};

export const formatPrice = (price: number): string => `${price.toLocaleString(LANGUAGE).replace(',', ' ')} ₽`;

export const getPagesCount = (countProducts: number): number => Math.ceil(countProducts / SHOW_PAGE);

export const getAdaptedValue = (name: string | number, data: any): string => {
  if (data === '') {
    return '';
  }
  return data.has(name) ? data.get(name) : '';
};

export const getActiveValueFilter = (data: Array<number | string>, name: number | string): boolean => data.includes(name);

export const addElementFilter = (data: Array<any>, value: string | number): Array<any> => {
  const currentData = data;
  currentData.push(value);
  return [...new Set(currentData)];
};

export const removeElementFilter = (data: Array<string | number>, value: string | number): Array<any> => {
  const position = data.indexOf(value);
  if (position === -1) {
    return data;
  }
  data.splice(position, 1);
  return data;
};

export const getQueryParam = (data: filterState | sortState, adapter: any) => {
  const params: any = {};
  const convertedData = Object.entries(data);
  convertedData.forEach((item) => {
    if(item[1] || item[1].length > 0) {
      params[adapter[item[0]]] = item[1];
    }
  });
  return params;
};

export const swapParam = () => Object.fromEntries(Object.entries({...QueryParamsTypeFilter, ...QueryParamsTypeSort}).map(([key,value])=>[value,key]));

export const setStoreFromQuery = (search: string, store: any) => {
  const defaultParam = swapParam();
  Object.entries(queryString.parse(browserHistory.location.search)).forEach((param) => {
    switch (defaultParam[param[0]]) {
      case SortKey.Order:
        store.dispatch(setOrder(`${param[1]}`));
        break;
      case SortKey.Sort:
        store.dispatch(setSort(`${param[1]}`));
        break;
      case FilterKey.NumberStrings:
        store.dispatch(setNumberStrings(param[1]));
        break;
      case FilterKey.Types:
        if(param[1]) {
          store.dispatch(setType(param[1]));
        }
        break;
      case FilterKey.PriceMin:
        store.dispatch(setPriceMin(Number(param[1])));
        break;
      case FilterKey.PriceMax:
        store.dispatch(setPriceMax(Number(param[1])));
        break;
    }
  });
};
