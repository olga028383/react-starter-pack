import React from 'react';
import {render, screen} from '@testing-library/react';
import PageTitle from './page-title';

describe('Component: PageTitle', () => {

  it('should display PageTitle', () => {

    render(<PageTitle text='Заголовок'/>);

    expect(screen.getByText(/Заголовок/i)).toBeInTheDocument();
  });
});
