import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import {
  fetchGuitars,
  fetchGuitar,
  fetchComments,
  sendComment,
  searchGuitars,
  fetchPrice, sendCoupon
} from './api-actions';
import {createApi} from '../api';
import {ApiRoute} from '../constants/constants';
import {Guitar, ReviewTest, ReviewPostTest} from '../mock/test';

jest.mock('../utils/utils');
const api = createApi();

describe('Async operations', () => {

  it('should make a correct API call to GET /guitars', () => {
    const apiMock = new MockAdapter(api);
    const mockStore = configureStore();
    const store = mockStore({SORT: {sort: '', order: ''}});
    store.getState = () => mockStore;
    const dispatch = jest.fn();
    const fetchGuitarsLoader = fetchGuitars(1);

    apiMock
      .onGet(`${ApiRoute.Guitars}?_embed=comments&_limit=9&_start=0`)
      .reply(200, [Guitar], {'x-total-count': '27'});

    fetchGuitarsLoader(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
      })
  });

  it('should make a correct API call to GET /guitars/id', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`${ApiRoute.Guitars}/1?_embed=comments`)
      .reply(200, Guitar);

    return fetchGuitar(1, api)
      .then((data) => {
        expect(data).toEqual(Guitar);
      });
  });

  it('should make a correct API call to GET /guitars/id/comments', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`${ApiRoute.Guitars}/1/${ApiRoute.Comments}`)
      .reply(200, ReviewTest);

    return fetchComments(1, api)
      .then((data) => {
        expect(data).toEqual(ReviewTest);
      });
  });

  it('should make a correct API call to POST /comment', () => {
    const apiMock = new MockAdapter(api);

    apiMock
      .onPost(`${ApiRoute.Comments}`)
      .reply(200, ReviewTest);


    return sendComment(ReviewPostTest, api)
      .then((data) => {
        expect(data).toEqual(ReviewTest);
      });
  });

  it('should make a correct API call to GET /guitars?_order=asc&_sort=price&_limit=1', () => {
    const apiMock = new MockAdapter(api);
    const mockStore = configureStore();
    const store = mockStore({FILTER: {types: [], numberStrings: [], priceMin: 0, priceMax: 0}});
    store.getState = () => mockStore;
    const dispatch = jest.fn();
    const fetchPriceLoader = fetchPrice(true);

    apiMock
      .onGet(`${ApiRoute.Guitars}?_order=asc&_sort=price&_limit=1`)
      .reply(200, [Guitar]);

    fetchPriceLoader(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it('should make a correct API call to GET GET price max', () => {
    const apiMock = new MockAdapter(api);
    const mockStore = configureStore();
    const store = mockStore({FILTER: {types: [], numberStrings: [], priceMin: 0, priceMax: 0}});
    store.getState = () => mockStore;
    const dispatch = jest.fn();
    const fetchPriceLoader = fetchPrice(false);

    apiMock
      .onGet(`${ApiRoute.Guitars}?_order=desc&_sort=price&_limit=1`)
      .reply(200, [Guitar]);

    fetchPriceLoader(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it('should make a correct API call to GET price min', () => {
    const apiMock = new MockAdapter(api);
    const mockStore = configureStore();
    const store = mockStore({FILTER: {types: [], numberStrings: [], priceMin: 0, priceMax: 0}});
    store.getState = () => mockStore;
    const dispatch = jest.fn();
    const fetchPriceLoader = fetchPrice(true);

    apiMock
      .onGet(`${ApiRoute.Guitars}?_order=asc&_sort=price&_limit=1`)
      .reply(200, [Guitar]);

    fetchPriceLoader(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it('should make a correct API call to GET search guitars', () => {
    const apiMock = new MockAdapter(api);
    const mockStore = configureStore();
    const store = mockStore({SEARCH: {searchWord: 'Че', guitars: [Guitar, Guitar, Guitar]}});
    store.getState = () => mockStore;
    const dispatch = jest.fn();
    const searchGuitarsLoader = searchGuitars('Че');

    apiMock
      .onGet(`${ApiRoute.Guitars}?name_like=Че`)
      .reply(200, [Guitar]);

    searchGuitarsLoader(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      })
  });

  it('should make a correct API call to POST /coupon', () => {
    const apiMock = new MockAdapter(api);
    const mockStore = configureStore();
    const store = mockStore({CART: {sale: 0, coupon: null, countGuitars: 0, guitars: []}});
    store.getState = () => mockStore;
    const dispatch = jest.fn();
    const sendCouponMock = sendCoupon('333');

    apiMock
      .onPost(ApiRoute.Coupons)
      .reply(200, '15');

    sendCouponMock(dispatch, store.getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      })
  });
});
