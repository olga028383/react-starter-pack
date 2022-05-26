import React from 'react';
import {render, screen} from '@testing-library/react';
import Sort from './sort';

describe('Component: Sort', () => {

  it('should display Sort', () => {

    render(<Sort/>);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/По цене/i)).toBeInTheDocument();
    expect(screen.getByText(/По популярности/i)).toBeInTheDocument();
  });
});
