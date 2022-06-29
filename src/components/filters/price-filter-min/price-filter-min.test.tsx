import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar} from '../../../mock/test';
import PriceFilterMin from './price-filter-min';
import {fetchGuitars} from '../../../store/api-actions';
import {ActionType, setPriceMin} from '../../../store/action';

jest.mock('../../../store/api-actions');
jest.mock('../../../store/action');

jest.useFakeTimers();

const mockSetPriceMin = setPriceMin as jest.MockedFunction<typeof setPriceMin>;
const mockFetchGuitars = fetchGuitars as jest.MockedFunction<typeof fetchGuitars>;

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

  it('should call onChange callbacks', async () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    mockSetPriceMin.mockReturnValue({
      type: ActionType.SET_PRICE_MIN,
      payload: 300,
    });

    mockFetchGuitars.mockReturnValue({
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PriceFilterMin/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.type(screen.getByTestId('priceMin'), '3000');
    jest.advanceTimersByTime(1000);
    expect(setPriceMin).toBeCalled();
    expect(fetchGuitars).toBeCalled();
  });
});
