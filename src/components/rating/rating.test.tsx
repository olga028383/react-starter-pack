import React from 'react';
import {render, screen} from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {

  it('should display Rating all fives', () => {

    render(<Rating rate={5} widthIcon={'14'} heightIcon={'14'}/>);

    expect(screen.queryAllByTestId('icon-full-star').length).toBe(5);
  });

  it('should display Rating all 2.5', () => {

    render(<Rating rate={2.5} widthIcon={'14'} heightIcon={'14'}/>);

    expect(screen.queryAllByTestId('icon-full-star').length).toBe(2);
    expect(screen.queryAllByTestId('icon-star-half').length).toBe(1);
    expect(screen.queryAllByTestId('icon-star').length).toBe(2);
  });
});
