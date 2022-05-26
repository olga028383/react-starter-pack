import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import BreadcrumbsLink from './breadcrumbs-link';

let history = null;

describe('Component: BreadcrumbsLink', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <BreadcrumbsLink link='catalog/1' text='Тестовая страница'/>
      </Router>,
    );

    expect(screen.getByText('Тестовая страница')).toBeInTheDocument();
  });
});
