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

    render(
      <Router history={history}>
        <TabItem title='Описание' url='test' currentTab='Описание' handleTabClick={jest.fn()}/>
      </Router>);

    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });

});
