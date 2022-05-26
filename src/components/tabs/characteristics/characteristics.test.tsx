import React from 'react';
import {render, screen} from '@testing-library/react';
import Characteristics from './characteristics';
import {Guitar} from '../../../mock/test';

describe('Component: characteristics', () => {

  it('should display Characteristics', () => {

    render(<Characteristics guitar={Guitar}/>);

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/SO757575/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип:/i)).toBeInTheDocument();
    expect(screen.getByText(/7 струнная/i)).toBeInTheDocument();
  });
});
