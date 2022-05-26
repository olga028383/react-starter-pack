import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Breadcrumbs from './breadcrumbs';

let history = null;

describe('Component: BreadcrumbsLink', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <Breadcrumbs links={[]}/>
      </Router>,
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });
});
