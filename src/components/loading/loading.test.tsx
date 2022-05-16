import React from 'react';
import {render, screen} from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {

  it('should display Loading', () => {

    render(<Loading/>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

