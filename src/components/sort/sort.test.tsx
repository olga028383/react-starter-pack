import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sort from './sort';
import {createApi} from '../../api';
import {FakeStore, Guitar} from '../../mock/test';
import {fetchGuitars} from '../../store/api-actions';
import {setSort, setOrder, ActionType} from '../../store/action';

jest.mock('../../store/api-actions');
jest.mock('../../store/action');

const mockSetSort = setSort as jest.MockedFunction<typeof setSort>;
const mockSetOrder = setOrder as jest.MockedFunction<typeof setOrder>;
const mockFetchGuitars = fetchGuitars as jest.MockedFunction<typeof fetchGuitars>;

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

describe('Component: Sort', () => {

  it('should display Sort', () => {
    const history = createMemoryHistory();
    const store = mockStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Sort/>;
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/По цене/i)).toBeInTheDocument();
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
  });

  it('should change global state and send api request', async () => {
    const history = createMemoryHistory();
    const store = mockStore(FakeStore);

    mockSetSort.mockReturnValue({
      type: ActionType.SET_SORT,
      payload: 'price',
    });

    mockSetOrder.mockReturnValue({
      type: ActionType.SET_ORDER,
      payload: 'asc',
    });

    mockFetchGuitars.mockReturnValue({
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Sort/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.click(screen.getByText(/по цене/i));
    expect(setSort).toBeCalled();

    userEvent.click(screen.getByText(/по популярности/i));
    expect(setSort).toBeCalled();

    userEvent.click(screen.getByLabelText(/по убыванию/i));
    expect(setOrder).toBeCalled();

    userEvent.click(screen.getByLabelText(/по возрастанию/i));
    expect(setOrder).toBeCalled();

  });

});
