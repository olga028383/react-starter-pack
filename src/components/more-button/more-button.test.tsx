import React from 'react';
import {render, screen} from '@testing-library/react';
import MoreButton from './more-button';
import userEvent from '@testing-library/user-event';

const handleClickButton = jest.fn();

describe('Component: MoreButton', () => {

  it('should display MoreButton', () => {

    render(<MoreButton handleClickButton={handleClickButton}/>);

    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
  });

  it('the click handler should be called', () => {
    render(<MoreButton handleClickButton={handleClickButton}/>);

    userEvent.click(screen.getByText(/Показать еще отзывы/i));
    expect(handleClickButton).toHaveBeenCalled();
  });
});
