import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {FakeStore} from '../../mock/test';
import CatalogCards from './catalog-cards';

describe('Component: CatalogCards', () => {

  it('should display CatalogCards', () => {

    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <CatalogCards />
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getAllByText(/Честер Bass/i)).toHaveLength(3);
  });
});
