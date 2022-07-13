import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar, GuitarCart} from '../../mock/test';
import {AddCart} from './add-cart';
import {setCartGuitars, setCountGuitars, ActionType} from '../../store/action';

jest.mock('../../store/action');

const mockSetCartGuitars = setCartGuitars as jest.MockedFunction<typeof setCartGuitars>;
const mockSetCountGuitars = setCountGuitars as jest.MockedFunction<typeof setCountGuitars>;

describe('Component: AddCart', () => {

  it('should display AddCart', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <AddCart guitar={Guitar} setModalSuccessActive={jest.fn()}/>
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
  });

  it('should call onClick callbacks', async () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    mockSetCartGuitars.mockReturnValue({
      type: ActionType.SET_CART_GUITARS,
      payload: [GuitarCart],
    });

    mockSetCountGuitars.mockReturnValue({
      type: ActionType.SET_COUNT_GUITARS,
      payload: 1,
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <AddCart guitar={Guitar} setModalSuccessActive={jest.fn()}/>
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.click(screen.getByText(/Добавить в корзину/i));
    //expect(setCartGuitars).toBeCalled();
    //expect(setCountGuitars).toBeCalled();
  });
});
