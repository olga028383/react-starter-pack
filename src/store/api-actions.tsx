import browserHistory from '../browser-history';
import queryString from 'query-string';
import {
  ApiRoute, LoadStatus, OrderName, SHOW_PAGE, SortName
} from '../constants/constants';
import {
  loadGuitars, setServerError, setTotalPages, initPriceMax, initPriceMin, loadData, setSearchGuitars, setSale, setCoupon
} from './action';
import {AxiosInstance} from 'axios';
import {AppDispatch} from '../types/state';
import {Guitar, Review, ReviewPost} from '../types/data';
import {getPagesCount, getQueryParam} from '../utils/utils';
import {QueryParamsTypeFilter, QueryParamsTypeSort} from '../constants/adapters';

export const fetchGuitars = (page: number, callback?: any): any => (dispatch: AppDispatch, getState: any, api: AxiosInstance) => {
  dispatch(loadData(LoadStatus.START));

  const queryDefaultParams = {'_start': SHOW_PAGE * page - SHOW_PAGE, '_limit': SHOW_PAGE, '_embed': 'comments'};
  const queryParamOrder = getQueryParam(getState().SORT, QueryParamsTypeSort);
  const queryParamFilter = getQueryParam(getState().FILTER, QueryParamsTypeFilter);
  const history = queryString.stringify({...queryParamOrder, ...queryParamFilter});
  const url = `${ApiRoute.Guitars}?${queryString.stringify({...queryDefaultParams, ...queryParamOrder, ...queryParamFilter})}`;
  return api.get(url)
    .then(({data, headers}) => {
      browserHistory.push(`?${history}`);
      dispatch(setTotalPages(getPagesCount(Number(headers['x-total-count']))));
      dispatch(loadGuitars(data.filter((item: Guitar) => Object.keys(item).includes('name'))));
      dispatch(loadData(LoadStatus.SUCCESS));

      if (callback) {
        callback();
      }
    })
    .catch((err) => dispatch(setServerError(err.message)));
};

export const searchGuitars = (name: string): any => (dispatch: AppDispatch, getState: any, api: AxiosInstance) => {
  api.get(`${ApiRoute.Guitars}?name_like=${name}`)
    .then(({data}) => {
      if (getState().SEARCH.searchKey === '') {
        dispatch(setSearchGuitars([]));
        return;
      }
      dispatch(setSearchGuitars(data));
    })
    .catch((err) => dispatch(setServerError(err.message)));
};

export const fetchPrice = (isPriceMin: boolean): any => (dispatch: AppDispatch, getState: any, api: AxiosInstance) => {
  const order = isPriceMin ? OrderName.Asc : OrderName.Desc;
  const queryDefaultParams = {'_order': order, '_sort': SortName.Price, '_limit': 1};
  const queryParamFilter = getQueryParam(getState().FILTER, {numberStrings: 'stringCount', types: 'type'});
  const url = `${ApiRoute.Guitars}?${queryString.stringify({...queryDefaultParams, ...queryParamFilter})}`;
  return api.get(url)
    .then(({data}) => {
      dispatch((isPriceMin) ? initPriceMin(data[0].price) : initPriceMax(data[0].price));
    })
    .catch((err) => dispatch(setServerError(err.message)));
};

export const fetchGuitar = (id: string, api: AxiosInstance): Promise<Guitar> => (
  api.get(`${ApiRoute.Guitars}/${id}?_embed=comments`)
    .then(({data}) => data)
);

export const fetchComments = (guitarId: string, api: AxiosInstance): Promise<Review[]> => (
  api.get(`${ApiRoute.Guitars}/${guitarId}/${ApiRoute.Comments}`)
    .then(({data}) => data)
);

export const sendComment = (comment: ReviewPost, api: AxiosInstance): Promise<Review> => (
  api.post(ApiRoute.Comments, comment)
    .then(({data}) => data)
);

export const sendCoupon = (coupon: string): any => (dispatch: AppDispatch, getState: any, api: AxiosInstance) => (
  api.post(ApiRoute.Coupons, {coupon: coupon})
    .then(({data}) => {
      dispatch(setSale(data));
      dispatch(setCoupon(coupon));
    })
    .catch((err) => dispatch(setServerError(err.message)))
);
