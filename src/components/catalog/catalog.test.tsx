import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Catalog from './catalog';
import {Guitar} from '../../mock/test';

let history = null;
let store = null;

describe('Component: GuitarCard', () => {

  it('should display GuitarCard', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore();
    store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 27},
    });

    render(<Provider store={store}>
      <Router history={history}>
        <Catalog/>
      </Router>
    </Provider>);

    screen.getAllByText(/Честер Bass/i).forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
