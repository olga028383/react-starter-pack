import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Guitar} from '../../mock/test';
import DeleteFromCart from './delete-from-cart';

describe('Component: DeleteFromCart', () => {

  it('should display DeleteFromCart', () => {

    render(<DeleteFromCart setActive={jest.fn()} onButtonClick={jest.fn()} guitar={Guitar}/>);

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });

  it('should call onClick callbacks onButtonClick', () => {
    const onButtonClick = jest.fn();
    render(<DeleteFromCart setActive={jest.fn()} onButtonClick={onButtonClick} guitar={Guitar}/>);
    userEvent.click(screen.getByText(/Удалить товар/i));
    expect(onButtonClick).toBeCalled();
  });

});
