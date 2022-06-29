import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar} from '../../../mock/test';
import {fetchGuitars} from '../../../store/api-actions';
import NumberStrings from './number-strings';
import {ActionType, setNumberStrings} from '../../../store/action';

jest.mock('../../../store/api-actions');
jest.mock('../../../store/action');

const mockSetNumberStrings = setNumberStrings as jest.MockedFunction<typeof setNumberStrings>;
const mockFetchGuitars = fetchGuitars as jest.MockedFunction<typeof fetchGuitars>;

describe('Component: NumberStrings', () => {

  it('should display NumberStrings', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <NumberStrings name={4}/>;
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });

  it('should call onChange callbacks', async () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    mockSetNumberStrings.mockReturnValue({
      type: ActionType.SET_NUMBER_STRINGS,
      payload: [4],
    });

    mockFetchGuitars.mockReturnValue({
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <NumberStrings name={4}/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.click(screen.getByText(/4/i));
    expect(setNumberStrings).toBeCalled();
    expect(fetchGuitars).toBeCalled();
  });
});
