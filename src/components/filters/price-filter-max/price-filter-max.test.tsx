import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar} from '../../../mock/test';
import {fetchGuitars} from '../../../store/api-actions';
import PriceFilterMax from './price-filter-max';
import {ActionType, setPriceMax} from '../../../store/action';

jest.mock('../../../store/api-actions');
jest.mock('../../../store/action');

jest.useFakeTimers();

const mockSetPriceMax = setPriceMax as jest.MockedFunction<typeof setPriceMax>;
const mockFetchGuitars = fetchGuitars as jest.MockedFunction<typeof fetchGuitars>;

describe('Component: PriceFilterMax', () => {

  it('should display PriceFilterMax', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PriceFilterMax/>;
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(FakeStore.DATA.priceMax.toString())).toBeInTheDocument();
  });

  it('should call onChange callbacks', async () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    mockSetPriceMax.mockReturnValue({
      type: ActionType.SET_PRICE_MAX,
      payload: 30000,
    });

    mockFetchGuitars.mockReturnValue({
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PriceFilterMax/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.type(screen.getByTestId('priceMax'), '25000');
    jest.advanceTimersByTime(1000);
    expect(setPriceMax).toBeCalled();
    expect(fetchGuitars).toBeCalled();
  });
});
