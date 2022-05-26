import React from 'react';
import {render, screen} from '@testing-library/react';
import Review from './review';
import {ReviewTest} from '../../../mock/test';

describe('Component: Review', () => {

  it('should display Review', () => {

    render(<Review review={ReviewTest}/>);

    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
  });
});
