import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Header from './header';

let history:any;

describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });
  it('should display Header', () => {

    render(
      <Router history={history}>
        <Header />
      </Router>);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
