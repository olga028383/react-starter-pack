import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {FakeStore} from '../../../mock/test';
import PriceFilterMin from './price-filter-min';

describe('Component: PriceFilterMin', () => {

  it('should display PriceFilterMin', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PriceFilterMin/>;
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(FakeStore.DATA.priceMin.toString())).toBeInTheDocument();
  });
});
