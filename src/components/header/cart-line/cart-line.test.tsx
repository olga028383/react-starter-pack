import React from 'react';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import CartLine from './cart-line';
import {FakeStore} from '../../../mock/test';

jest.mock('../../../store/api-actions');

describe('Component: CartLine', () => {
  it('should display CartLine', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    render(<Provider store={store}><Router history={history}><CartLine/></Router></Provider>);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('quantity should be displayed', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore({CART: {sale: 0, coupon: null, countGuitars: 11, guitars: []}});

    render(<Provider store={store}><Router history={history}><CartLine/></Router></Provider>);

    expect(screen.getByText(/11/i)).toBeInTheDocument();
  });
});
