import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import GuitarCard from './guitar-card';
import {Guitar} from '../../mock/test';

let history = null;
let store = null;

describe('Component: GuitarCard', () => {

  it('should display GuitarCard', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore();
    store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1},
    });

    render( <Provider store={store}>
      <Router history={history}>
        <GuitarCard guitar={Guitar}/>
      </Router>
    </Provider>);

    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
    expect(screen.getByText(/17 500/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });
});
