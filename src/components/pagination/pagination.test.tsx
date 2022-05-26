import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Pagination} from './pagination';
import {Guitar} from '../../mock/test';

let fakeApp: any = null;
let history = null;
let store = null;

jest.mock('../../store/api-actions');

describe('Component: Pagination', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore();
    store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 3, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />;
        </Router>
      </Provider>
    );
  });

  it('should show initial state of pagination', async() => {
    const {container} = render(fakeApp);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    //expect(container.querySelectorAll('.pagination__page')[0].classList.contains('.pagination__page--active')).toBe(true);
    //expect(screen.getByText(/2/i)).toBeInTheDocument();
    // expect(screen.getByText(/3/i)).toBeInTheDocument();
    // expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

});
