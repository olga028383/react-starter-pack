import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';

let history:any;

describe('Component: Footer', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should display Footer', () => {

    render(
      <Router history={history}>
        <Footer/>
      </Router>);

    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });
});
