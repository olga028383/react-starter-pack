import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './search';
import {createApi} from '../../api';
import {FakeStore, Guitar} from '../../mock/test';
import {searchGuitars} from '../../store/api-actions';
import {setSearchWord, ActionType} from '../../store/action';


jest.mock('../../store/api-actions');
jest.mock('../../store/action');

const mockSearchGuitars = searchGuitars as jest.MockedFunction<typeof searchGuitars>;
const mockSetSearchWord = setSearchWord as jest.MockedFunction<typeof setSearchWord>;

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

describe('Component: Search', () => {

  it('should display Search', () => {
    const history = createMemoryHistory();
    const store = mockStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Search/>;
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что вы ищите?/)).toBeInTheDocument();
  });

  it('should call onChange', async() => {
    mockSearchGuitars.mockReturnValue(Promise.resolve([Guitar, Guitar]));
    mockSetSearchWord.mockReturnValue({
      type: ActionType.SET_SEARCH_WORD,
      payload: 'Че',
    });

    const history = createMemoryHistory();
    const store = mockStore(FakeStore);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Search/>;
        </Router>
      </Provider>
    );
    render(fakeApp);

    const searchInput = screen.getByPlaceholderText(/что вы ищите/);
    userEvent.type(searchInput, 'Че');
    expect(await screen.findAllByText(/Честер Bass/i)).toHaveLength(3);
  });
});
