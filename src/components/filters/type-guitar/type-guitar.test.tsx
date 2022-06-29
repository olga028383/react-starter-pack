import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {FakeStore, Guitar} from '../../../mock/test';
import {fetchGuitars} from '../../../store/api-actions';
import TypeGuitar from './type-guitar';
import {ActionType, setType} from '../../../store/action';

jest.mock('../../../store/api-actions');
jest.mock('../../../store/action');

const mockSetType= setType as jest.MockedFunction<typeof setType>;
const mockFetchGuitars = fetchGuitars as jest.MockedFunction<typeof fetchGuitars>;

describe('Component: TypeGuitar', () => {

  it('should display TypeGuitar', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <TypeGuitar name={'test'} code={'test'}/>;
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('should call onChange callbacks', async () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    mockSetType.mockReturnValue({
      type: ActionType.SET_NUMBER_STRINGS,
      payload: ['test'],
    });

    mockFetchGuitars.mockReturnValue({
      type: ActionType.LOAD_GUITARS,
      payload: [Guitar],
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <TypeGuitar name={'test'} code={'test'}/>;
        </Router>
      </Provider>
    );

    render(fakeApp);

    userEvent.click(screen.getByText(/test/i));
    expect(setType).toBeCalled();
    expect(fetchGuitars).toBeCalled();
  });
});
