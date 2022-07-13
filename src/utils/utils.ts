import queryString from 'query-string';
import browserHistory from '../browser-history';
import {
  LANGUAGE, SHOW_PAGE, SortKey, FilterKey, SortName, OrderName, STRINGS_DATA,
  TYPE_DATA
} from '../constants/constants';
import {filterState, sortState} from '../types/state';
import {QueryParamsTypeFilter, QueryParamsTypeSort} from '../constants/adapters';
import {setNumberStrings, setOrder, setPriceMax, setPriceMin, setSort, setType} from '../store/action';
import {Guitar} from '../types/data';

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
  convertedData.filter((item) => (typeof item[1] === 'number' && item[1] > 0) || item[1].length > 0).forEach((item) => {
    if (item[1]) {
      params[adapter[item[0]]] = item[1];
    }
  });
  return params;
};

export const swapParam = () => Object.fromEntries(Object.entries({...QueryParamsTypeFilter, ...QueryParamsTypeSort}).map(([key, value]) => [value, key]));

export const checkPrice = (price: number, priceMin: number, priceMax: number): boolean => price > priceMin && price < priceMax;

export const getPriceParam = (keyParam: string): any => {
  const param = queryString.parse(browserHistory.location.search);
  if (param[keyParam] === undefined || isNaN(Number(param[keyParam]))) {
    return null;
  }
  return param[keyParam];
};

export const checkSort = (param: any) => param === SortName.Price || param === SortName.Rating;

export const checkOrder = (param: any) => param === OrderName.Asc || param === OrderName.Desc;

export const checkPriceParam = (param: any) => isNaN(Number(param));

export const checkType = (param: any) => {
  if (typeof param === 'string' && TYPE_DATA.includes(param)) {
    return true;
  }
  if(Array.isArray(param)) {
    const data = param.filter((value: any) => TYPE_DATA.includes(value));
    return data.length === param.length;
  }

  return false;
};

export const checkNumberStrings = (param: any) => {
  if (typeof Number(param) === 'number' && STRINGS_DATA.includes(Number(param))) {
    return true;
  }
  if(Array.isArray(param)) {
    const data = param.filter((value: any) => STRINGS_DATA.includes(Number(value)));
    return data.length === param.length;
  }

  return false;
};

export const getLengthObject = (data: any): number => Array.from(Object.keys(data)).length;

export const setStoreFromQuery = (search: string, store: any) => {
  const defaultParam = swapParam();
  const locationParam = queryString.parse(browserHistory.location.search);
  const filterParam: any = {};
  Object.entries(locationParam).forEach((param) => {
    switch (defaultParam[param[0]]) {
      case SortKey.Order:
        if (checkOrder(param[1])) {
          filterParam[SortKey.Order] = setOrder(`${param[1]}`);
        }
        break;
      case SortKey.Sort:
        if (checkSort(param[1])) {
          filterParam[SortKey.Sort] = setSort(`${param[1]}`);
        }
        break;
      case FilterKey.NumberStrings:
        if (checkNumberStrings(param[1])) {
          filterParam[FilterKey.NumberStrings] = setNumberStrings(typeof param[1] !== 'string' && param[1] !== null ? param[1].map((item) => Number(item)) : [Number(param[1])]);
        }
        break;
      case FilterKey.Types:
        if (checkType(param[1])) {
          filterParam[FilterKey.Types] = setType(typeof param[1] !== 'string' ? param[1] : [param[1]]);
        }
        break;
      case FilterKey.PriceMin:
        if (!checkPriceParam(param[1])) {
          filterParam[FilterKey.PriceMin] = setPriceMin(Number(param[1]));
        }
        break;
      case FilterKey.PriceMax:
        if (!checkPriceParam(param[1])) {
          filterParam[FilterKey.PriceMax] = setPriceMax(Number(param[1]));
        }
        break;
    }
  });
  if (getLengthObject(filterParam) === getLengthObject(locationParam)) {
    Object.values(filterParam).forEach((data: any) => {
      store.dispatch(data);
    });
  }
};

export const changeCountProductInCart = (guitars: Guitar[], guitar: Guitar, count = 0): Guitar[] => {
  const guitarsInCart = guitars;
  const index = guitarsInCart.findIndex((item) => item.id === guitar.id);
  const guitarInCart = guitarsInCart[index];

  if (count === -1) {
    guitarsInCart.splice(index, 1);
    return guitarsInCart;
  }

  if (!count && guitarInCart !== undefined && guitarInCart.countInCart) {
    guitarInCart.countInCart = guitarInCart.countInCart + 1;
    return guitarsInCart;
  }

  if (count > 0 && guitarInCart !== undefined) {
    guitarInCart.countInCart = count;
    return guitarsInCart;
  }

  if (!count) {
    guitarsInCart.push(Object.assign(guitar, {countInCart: 1}));
  }

  return guitarsInCart;
};

export const checkGuitarInCart = (cartGuitars: Guitar[], guitar: Guitar): boolean => cartGuitars.filter((itemCart: Guitar) => guitar.id === itemCart.id).length > 0;

export const getCountInCart = (guitars: Guitar[]): number => guitars.map((item) => item.countInCart).reduce((previousValue: any, currentValue: any) => previousValue + currentValue, 0);

export const getSumInCart = (guitars: Guitar[]): number => guitars.map((item: Guitar) => item.price * ((item !== undefined && item.countInCart) ? item.countInCart : 1)).reduce((previousValue: any, currentValue: any) => previousValue + currentValue, 0);

export const getSale = (percent: number, price: number): number => percent ? price / 100 * percent : 0;
