import React from 'react';
import {render} from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {

  it('should display Rating all fives', () => {

    const {container} = render(<Rating rate={5} widthIcon={'14'} heightIcon={'14'}/>);

    expect(container.querySelectorAll('[xlink:href="#icon-full-star"]').length).toBe(5);
  });

  it('should display Rating all 2.5', () => {

    const {container} = render(<Rating rate={2.5} widthIcon={'14'} heightIcon={'14'}/>);

    expect(container.querySelectorAll('[xlink:href="#icon-full-star"]').length).toBe(2);
    expect(container.querySelectorAll('[xlink:href="#icon-star-half"]').length).toBe(1);
    expect(container.querySelectorAll('[xlink:href="#icon-star"]').length).toBe(2);
  });
});
