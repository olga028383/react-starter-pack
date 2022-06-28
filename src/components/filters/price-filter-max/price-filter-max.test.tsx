import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {FakeStore} from '../../../mock/test';
import PriceFilterMax from './price-filter-max';
import {setPriceMax} from '../../../store/action';

jest.mock('../../../store/api-actions');

jest.useFakeTimers();
const mockSetPriceMax = setPriceMax as jest.Mock<any>;
const middlewares = [thunk];

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

  it('should call onChange callbacks', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore(middlewares);
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <PriceFilterMax/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.type(screen.getByTestId('priceMax'), 25000);
    expect(mockSetPriceMax).toBeCalled();
  });
});
