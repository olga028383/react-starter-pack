import React from 'react';
import {render, screen} from '@testing-library/react';
import Modal from './modal';
import ReviewSuccess from '../form-review/review-success/review-success';

jest.mock('../form-review/form-review', () => {
  function FormReview() {
    return <>FormReview</>;
  }

  return {
    __esModule: true,
    default: FormReview,
  };
});

describe('Component: Modal', () => {

  it('there must be a correct render Modal', async () => {
    render(
      <Modal active setActive={jest.fn()} additionalClass={'test'}>
        <ReviewSuccess setCurrentModalActive={jest.fn()} setFormReviewModal={jest.fn()}/>
      </Modal>);

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
  });

});
