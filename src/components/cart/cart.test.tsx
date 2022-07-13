import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {FakeStore,Guitar} from '../../mock/test';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

describe('Component: Cart', () => {

  it('should display Cart empty', () => {

    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Cart/>
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Пока что в корзине ничего нет/i)).toBeInTheDocument();
  });

  it('should display Cart', () => {

    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore({CART: {sale: 15, coupon: null, countGuitars: 1, guitars: [Guitar]}});

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Cart/>
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
    expect(screen.getAllByText(/17 500/i)).toHaveLength(2);
    expect(screen.getAllByText(/14 875/i)).toHaveLength(1);
    expect(screen.getAllByText(/- 2 625/i)).toHaveLength(1);
  });

});
