import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCartSuccess from './add-cart-success';

describe('Component: AddCartSuccess', () => {

  it('should display AddCartSuccess', () => {

    render(<AddCartSuccess setModalActive={jest.fn()} setModalSuccessActive={jest.fn()}/>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });

  it('should call onClick callbacks setModalSuccessActive', () => {
    const setModalSuccessActive = jest.fn();
    render(<AddCartSuccess setModalActive={jest.fn()} setModalSuccessActive={setModalSuccessActive}/>);
    userEvent.click(screen.getByText(/Продолжить покупки/i));
    expect(setModalSuccessActive).toBeCalled();
  });

});
