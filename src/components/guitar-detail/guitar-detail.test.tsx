import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import GuitarDetail from './guitar-detail';
import {Guitar} from '../../mock/test';
import {fetchGuitar} from '../../store/api-actions';

jest.mock('../../store/api-actions');
jest.mock('../reviews/reviews', () => {
  function Reviews() {
    return <>Reviews</>;
  }

  return {
    __esModule: true,
    default: Reviews,
  };
});
const mockFetchGuitar = fetchGuitar as jest.MockedFunction<typeof fetchGuitar>;

let fakeApp: any = null;
let history = null;
let store = null;


describe('Component: GuitarDetail', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    history.push('/catalog/1');

    const createFakeStore = configureStore();
    store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1, totalPages: 3, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <GuitarDetail/>;
        </Router>
      </Provider>
    );
  });

  it('should display page guitar detail not found', async() => {
    mockFetchGuitar.mockReturnValue(Promise.reject());
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/Page not found/i)).toBeInTheDocument();
  });

  it('should display page guitar detail', async() => {

    mockFetchGuitar.mockReturnValue(Promise.resolve(Guitar));
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findAllByText(/Честер Bass/i)).toHaveLength(3);
    expect(await screen.findByText(/Описание/i)).toBeInTheDocument();
    expect(await screen.findByText(/Характеристики/i)).toBeInTheDocument();
    expect(await screen.findByText(/Reviews/i)).toBeInTheDocument();
  });
});
