import React from 'react';
import {render, screen} from '@testing-library/react';
import Error from './error';

describe('Component: Error', () => {

  it('should display Error', () => {

    render(<Error textError='Ошибка'/>);

    expect(screen.getByText(/Ошибка/i)).toBeInTheDocument();
  });
});
