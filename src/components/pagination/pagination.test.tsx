import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Pagination} from './pagination';
import {Guitar} from '../../mock/test';

jest.mock('../../store/api-actions');

describe('Component: Pagination', () => {
  it('should show initial state of pagination', async () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 3, api: jest.fn()},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

});
