import MockAdapter from 'axios-mock-adapter';
import {
  fetchGuitars,
  fetchGuitar,
  fetchComments,
  sendComment
} from './api-actions';
import {createApi} from '../api';
import {ApiRoute} from '../constants/constants';
import {Guitar, ReviewTest, ReviewPostTest} from '../mock/test';

let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createApi();
  });

  it('should make a correct API call to GET /guitars', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchGuitarsLoader = fetchGuitars();

    apiMock
      .onGet(ApiRoute.Guitars)
      .reply(200, [Guitar]);

    fetchGuitarsLoader(dispatch, () => {
    }, api)
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
});
