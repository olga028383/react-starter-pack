import React from 'react';
import {render, screen} from '@testing-library/react';
import ReviewSuccess from './review-success';

describe('Component: ReviewSuccess', () => {

  it('should display ReviewSuccess', () => {

    render(<ReviewSuccess setFormReviewModal={jest.fn()} setCurrentModalActive={jest.fn()}/>);

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
  });
});
