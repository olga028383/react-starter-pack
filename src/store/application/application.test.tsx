import {application} from './application';
import {ActionType} from '../action';

const stateApplicationTest = {
  serverError: '',
  currentPage: 1,
  totalPages: 0,
  api: null,
};

describe('Reducer: application', () => {
  it('should add api', () => {
    const apiAction = {
      type: ActionType.SET_API,
      payload: 'something',
    };

    expect(application(stateApplicationTest, apiAction))
      .toEqual({
        ...stateApplicationTest,
        api: 'something',
      });
  });

  it('should add current page', () => {
    const apiAction = {
      type: ActionType.SET_CURRENT_PAGE,
      payload: 3,
    };

    expect(application(stateApplicationTest, apiAction))
      .toEqual({
        ...stateApplicationTest,
        currentPage: 3,
      });
  });

  it('should add total pages', () => {
    const apiAction = {
      type: ActionType.SET_TOTAL_PAGES,
      payload: 3,
    };

    expect(application(stateApplicationTest, apiAction))
      .toEqual({
        ...stateApplicationTest,
        totalPages: 3,
      });
  });

  it('should add server error message', () => {
    const apiAction = {
      type: ActionType.SET_SERVER_ERROR,
      payload: 'Ошибка',
    };

    expect(application(stateApplicationTest, apiAction))
      .toEqual({
        ...stateApplicationTest,
        serverError: 'Ошибка',
      });
  });
});
