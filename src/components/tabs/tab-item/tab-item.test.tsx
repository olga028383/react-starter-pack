import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import TabItem from './tab-item';

let history:any;

describe('Component: TabItem', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should display TabItem active', () => {

    const {container} = render(
      <Router history={history}>
        <TabItem title='Описание' url='test' currentTab='Описание' handleTabClick={jest.fn()}/>
      </Router>);

    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(container.querySelector('.button--black-border')).toBe(null);
  });

  it('should display TabItem not active', () => {

    const {container} = render(
      <Router history={history}>
        <TabItem title='Описание' url='test' currentTab='Характеристки' handleTabClick={jest.fn()}/>
      </Router>);

    //expect(container.querySelector('.button--black-border').className).toBe('button button--medium tabs__button button button--black-border');
  });

});
