import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import FormReview from './form-review';
import {Guitar} from '../../mock/test';

describe('Component: FormReview', () => {
  it('should display FormReview', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <FormReview guitar={Guitar} setReviewData={jest.fn()} showSuccessModal={jest.fn()}/>
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });
});
