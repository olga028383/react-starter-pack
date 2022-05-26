import React from 'react';
import {render, screen} from '@testing-library/react';
import Filters from './filters';

describe('Component: Filters', () => {

  it('should display Filters', () => {

    render(<Filters />);

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
  });
});
