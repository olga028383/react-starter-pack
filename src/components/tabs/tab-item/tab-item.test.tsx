import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import TabItem from './tab-item';

describe('Component: TabItem', () => {
  it('should display TabItem active', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <TabItem title='Описание' url='test' currentTab='Описание' handleTabClick={jest.fn()}/>
      </Router>);

    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });

});
