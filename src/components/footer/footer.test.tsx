import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should display Footer', () => {
    const history = createMemoryHistory();
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
