import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import Sort from './sort';
import configureStore from 'redux-mock-store';
import {FakeStore} from '../../mock/test';
jest.mock('../../store/api-actions');

describe('Component: Sort', () => {

  it('should display Sort', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Sort/>;
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/По цене/i)).toBeInTheDocument();
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
  });
});
