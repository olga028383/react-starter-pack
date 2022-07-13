import {
  loadGuitars,
  setApi,
  setCurrentPage,
  setTotalPages,
  setServerError,
  ActionType, initPriceMin, initPriceMax, setPriceMin, setPriceMax, setOrder, setSort, setNumberStrings, setType,
  loadData, clearFilter, setSearchWord, setSearchGuitars, setCoupon, setCartGuitars, setCountGuitars, setSale
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

  it('Action creator to add minimum price', () => {

    const expectedAction = {
      type: ActionType.INIT_PRICE_MIN,
      payload: 300,
    };

    expect(initPriceMin(300)).toEqual(expectedAction);
  });

  it('Action creator to add maxmum price', () => {

    const expectedAction = {
      type: ActionType.INIT_PRICE_MAX,
      payload: 1000,
    };

    expect(initPriceMax(1000)).toEqual(expectedAction);
  });

  it('Action creator to add minimum price for filter', () => {

    const expectedAction = {
      type: ActionType.SET_PRICE_MIN,
      payload: 300,
    };

    expect(setPriceMin(300)).toEqual(expectedAction);
  });

  it('Action creator to add maximum price for filter', () => {

    const expectedAction = {
      type: ActionType.SET_PRICE_MAX,
      payload: 1000,
    };

    expect(setPriceMax(1000)).toEqual(expectedAction);
  });

  it('Action creator to add sort', () => {

    const expectedAction = {
      type: ActionType.SET_SORT,
      payload: 'test',
    };

    expect(setSort('test')).toEqual(expectedAction);
  });

  it('Action creator to add order', () => {

    const expectedAction = {
      type: ActionType.SET_ORDER,
      payload: 'test',
    };

    expect(setOrder('test')).toEqual(expectedAction);
  });

  it('Action creator to add types', () => {

    const expectedAction = {
      type: ActionType.SET_TYPE,
      payload: ['test'],
    };

    expect(setType(['test'])).toEqual(expectedAction);
  });

  it('Action creator to add numberStrings', () => {

    const expectedAction = {
      type: ActionType.SET_NUMBER_STRINGS,
      payload: [5],
    };

    expect(setNumberStrings([5])).toEqual(expectedAction);
  });

  it('Action creator to clear filter', () => {

    const expectedAction = {
      type: ActionType.CLEAR_FILTER,
    };

    expect(clearFilter()).toEqual(expectedAction);
  });

  it('Action creator to add load status ', () => {

    const expectedAction = {
      type: ActionType.SET_LOAD_DATA,
      payload: 'test',
    };

    expect(loadData('test')).toEqual(expectedAction);
  });

  it('Action creator to add search word ', () => {

    const expectedAction = {
      type: ActionType.SET_SEARCH_WORD,
      payload: 'test',
    };

    expect(setSearchWord('test')).toEqual(expectedAction);
  });

  it('Action creator to add search guitars ', () => {

    const expectedAction = {
      type: ActionType.SET_SEARCH_GUITARS,
      payload: [Guitar],
    };

    expect(setSearchGuitars([Guitar])).toEqual(expectedAction);
  });

  it('Action creator to add coupon ', () => {

    const expectedAction = {
      type: ActionType.SET_COUPON,
      payload: '33',
    };

    expect(setCoupon('33')).toEqual(expectedAction);
  });

  it('Action creator to add cart guitars ', () => {

    const expectedAction = {
      type: ActionType.SET_CART_GUITARS,
      payload: [Guitar],
    };

    expect(setCartGuitars([Guitar])).toEqual(expectedAction);
  });

  it('Action creator to add count guitars', () => {

    const expectedAction = {
      type: ActionType.SET_COUNT_GUITARS,
      payload: 5,
    };

    expect(setCountGuitars(5)).toEqual(expectedAction);
  });

  it('Action creator to add sale', () => {

    const expectedAction = {
      type: ActionType.SET_SALE,
      payload: 5,
    };

    expect(setSale(5)).toEqual(expectedAction);
  });
});
