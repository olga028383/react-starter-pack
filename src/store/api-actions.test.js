import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import {
  fetchGuitars,
  fetchGuitar,
  fetchComments,
  sendComment,
  fetchPrice
} from './api-actions';
import {createApi} from '../api';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {ApiRoute} from '../constants/constants';
import {Guitar, ReviewTest, ReviewPostTest, FakeStore} from '../mock/test';

const api = createApi();
const store = createStore(() => [], {}, applyMiddleware());
describe('Async operations', () => {

  it('should make a correct API call to GET /guitars', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchGuitarsLoader = fetchGuitars();

    apiMock
      .onGet(ApiRoute.Guitars)
      .reply(200, [Guitar]);


    fetchGuitarsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
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
    const dispatch = jest.fn();
    const fetchPriceLoader = fetchPrice(true);

    apiMock
      .onGet(`${ApiRoute.Guitars}?_order=asc&_sort=price&_limit=1`)
      .reply(200, [Guitar]);

    fetchPriceLoader(dispatch, () => {
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it('should make a correct API call to GET /guitars?_order=desc&_sort=price&_limit=1', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchPriceLoader = fetchPrice(false);

    apiMock
      .onGet(`${ApiRoute.Guitars}?_order=desc&_sort=price&_limit=1`)
      .reply(200, [Guitar]);

    fetchPriceLoader(dispatch, () => {
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });
});
