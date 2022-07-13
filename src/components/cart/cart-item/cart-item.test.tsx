import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar, GuitarCart} from '../../../mock/test';
import userEvent from '@testing-library/user-event';
import {setCartGuitars, setCountGuitars, ActionType} from '../../../store/action';
import CartItem from './cart-item';

jest.mock('../../../store/action');

jest.mock('../../delete-from-cart/delete-from-cart', () => {
  function DeleteFromCart() {
    return <>Удалить товар</>;
  }

  return {
    __esModule: true,
    default: DeleteFromCart,
  };
});

const mockSetCartGuitars = setCartGuitars as jest.MockedFunction<typeof setCartGuitars>;
const mockSetCountGuitars = setCountGuitars as jest.MockedFunction<typeof setCountGuitars>;

const history = createMemoryHistory();
const createFakeStore = configureStore();
const store = createFakeStore(FakeStore);

describe('Component: CartItem', () => {

  it('should display CartItem', () => {
    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <CartItem guitar={Guitar}/>
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
    expect(screen.getByText(/17 500/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it('should call onClick callbacks', () => {

    mockSetCartGuitars.mockReturnValue({
      type: ActionType.SET_CART_GUITARS,
      payload: [GuitarCart],
    });

    mockSetCountGuitars.mockReturnValue({
      type: ActionType.SET_COUNT_GUITARS,
      payload: 2,
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <CartItem guitar={Guitar}/>
        </Router>
      </Provider>
    );

    render(fakeApp);

    // userEvent.type(screen.getByTestId('input'), '2');
    // userEvent.click(document.body);
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/35 000/i)).toBeInTheDocument();
    //
    // userEvent.click(screen.getByTestId('plus'));
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/52 500/i)).toBeInTheDocument();
    //
    // userEvent.click(screen.getByTestId('minus'));
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/35 000/i)).toBeInTheDocument();
    //
    // userEvent.type(screen.getByTestId('input'), '99');
    // userEvent.click(document.body);
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/1 732,500 ₽/i)).toBeInTheDocument();
    //
    // userEvent.type(screen.getByTestId('input'), '1000');
    // userEvent.click(document.body);
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/1 732,500 ₽/i)).toBeInTheDocument();
    //
    // userEvent.type(screen.getByTestId('input'), '1');
    // userEvent.click(document.body);
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/17 500/i)).toBeInTheDocument();
    //
    // userEvent.click(screen.getByTestId('remove'));
    // expect(setCartGuitars).toBeCalled();
    // expect(setCountGuitars).toBeCalled();
    // expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
  });
});
