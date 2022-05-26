import React from 'react';
import {render, screen} from '@testing-library/react';
import RequiredError from './required-error';

describe('Component: RequiredError', () => {

  it('should display RequiredError', () => {

    render(<RequiredError/>);

    expect(screen.getByText(/Заполните поле/i)).toBeInTheDocument();
  });
});
