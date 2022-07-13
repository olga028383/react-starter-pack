import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar} from '../../../mock/test';
import userEvent from '@testing-library/user-event';
import {sendCoupon} from '../../../store/api-actions';
import {ActionType} from '../../../store/action';
import Coupon from './coupon';

jest.mock('../../../store/api-actions');

const mockSendCoupon = sendCoupon as jest.MockedFunction<typeof sendCoupon>;

describe('Component: Coupon', () => {

  it('should display Coupon', () => {

    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Coupon />
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
  });

  it('will test the form submission fail', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore({CART: {sale: 15, coupon: 'light-333', countGuitars: 1, guitars: [Guitar]}});

    mockSendCoupon.mockReturnValue({
      type: ActionType.SET_COUPON,
      payload: 'light-333',
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Coupon />
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.type(screen.getByTestId('coupon'), 'ааа ');
    userEvent.click(screen.getByText(/Применить/i));
    expect(screen.getByText(/Неверный промокод/i)).toBeInTheDocument();
  });

  it('will test the form submission success', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore({CART: {sale: 0, coupon: '', countGuitars: 1, guitars: [Guitar]}});

    mockSendCoupon.mockReturnValue({
      type: ActionType.SET_COUPON,
      payload: 'light-333',
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Coupon />
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.type(screen.getByTestId('coupon'), 'light-333');
    userEvent.click(screen.getByText(/Применить/i));
    expect(sendCoupon).toBeCalled();
  });
});
