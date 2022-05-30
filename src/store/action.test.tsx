import {
  loadGuitars,
  setApi,
  setCurrentPage,
  setTotalPages,
  setServerError,
  ActionType
} from './action';
import {Guitar} from '../mock/test';
import {createApi} from '../api';

const api = createApi();
describe('Actions', () => {

  it('Action creator for getting a list.', () => {

    const expectedAction = {
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    };

    expect(loadGuitars([Guitar])).toEqual(expectedAction);
  });

  it('Action creator for to get the api method.', () => {
    const expectedAction = {
      type: ActionType.SET_API,
      payload: api,
    };

    expect(setApi(api)).toEqual(expectedAction);
  });

  it('Action creator for adding a page number.', () => {

    const expectedAction = {
      type: ActionType.SET_CURRENT_PAGE,
      payload: 1,
    };

    expect(setCurrentPage(1)).toEqual(expectedAction);
  });

  it('Action creator to add the number of pages', () => {

    const expectedAction = {
      type: ActionType.SET_TOTAL_PAGES,
      payload: 30,
    };

    expect(setTotalPages(30)).toEqual(expectedAction);
  });

  it('Action creator for server error', () => {

    const expectedAction = {
      type: ActionType.SET_SERVER_ERROR,
      payload: 'Ошибка',
    };

    expect(setServerError('Ошибка')).toEqual(expectedAction);
  });
});
