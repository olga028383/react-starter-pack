import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import Reviews from './reviews';
import {ReviewTest, Guitar} from '../../mock/test';
import {fetchComments} from '../../store/api-actions';

jest.mock('../../store/api-actions');
jest.mock('../modal/modal', () => {
  function Modal() {
    return <>Modal</>;
  }

  return {
    __esModule: true,
    default: Modal,
  };
});

const mockFetchComments = fetchComments as jest.MockedFunction<typeof fetchComments>;

let fakeApp: any = null;
let history = null;
let store = null;

describe('Component: Reviews', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore();
    store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 27, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Reviews guitar={Guitar} handleSetReviewCount={jest.fn()}/>
        </Router>
      </Provider>
    );
  });

  it('there must be a correct render Reviews', async () => {
    mockFetchComments.mockReturnValue(Promise.resolve([ReviewTest, ReviewTest, ReviewTest, ReviewTest, ReviewTest]));
    render(fakeApp);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(await screen.findByText(/Показать еще отзывы/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Вася/i)).toHaveLength(3);
    expect(await screen.findAllByText(/Хорошая гитара/i)).toHaveLength(3);
  });

  it('clicking on the view button further increases the number of reviews displayed.', async () => {
    mockFetchComments.mockReturnValue(Promise.resolve([ReviewTest, ReviewTest, ReviewTest, ReviewTest, ReviewTest]));
    render(fakeApp);

    userEvent.click(await screen.findByText(/Показать еще отзывы/i));
    expect(await screen.findAllByText(/Вася/i)).toHaveLength(5);
    expect(await screen.findAllByText(/Хорошая гитара/i)).toHaveLength(5);
  });

  it('clicking on the button displays the feedback form review.', async () => {
    mockFetchComments.mockReturnValue(Promise.resolve([ReviewTest, ReviewTest, ReviewTest, ReviewTest, ReviewTest]));
    render(fakeApp);

    userEvent.click(await screen.findByText(/Оставить отзыв/i));
    expect(await screen.findByText(/Modal/i)).toBeInTheDocument();

  });
});
