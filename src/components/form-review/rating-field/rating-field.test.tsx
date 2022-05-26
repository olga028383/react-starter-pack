import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingField from './rating-field';

const KEY = 5;
describe('Component: RatingField', () => {
  it('there must be a correct renderer', () => {
    const handleRatingChange = jest.fn();
    render(<RatingField index={KEY} value={4} handleRatingChange={handleRatingChange} key={KEY}/>);

    expect(screen.getByDisplayValue(KEY)).toBeInTheDocument();

  });

  it('should call the change handler', () => {
    const handleRatingChange = jest.fn();
    render(<RatingField index={KEY} value={4} handleRatingChange={handleRatingChange} key={KEY}/>);

    expect(handleRatingChange).not.toBeCalled();

    userEvent.click(screen.getByRole('radio'));

    expect(handleRatingChange).toBeCalled();
  });

  it('checked should change', () => {
    const handleRatingChange = jest.fn();
    const {rerender} = render(<RatingField index={KEY} value={4} handleRatingChange={handleRatingChange} key={KEY}/>);

    expect(screen.getByRole('radio')).not.toBeChecked();

    userEvent.click(screen.getByRole('radio'));

    rerender(<RatingField index={KEY} value={KEY} handleRatingChange={jest.fn()} key={KEY}/>);
    expect(screen.getByRole('radio')).toBeChecked();
  });
});

