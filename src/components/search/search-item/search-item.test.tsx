import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Guitar} from '../../../mock/test';
import SearchItem from './search-item';

describe('Component: SearchItem', () => {

  it('should display SearchItem', () => {
    const history = createMemoryHistory();

    render(<Router history={history}><SearchItem guitar={Guitar} handleLinkClick={jest.fn()}/></Router>);
    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
  });

  it('should call handleLinkClick', () => {
    const history = createMemoryHistory();
    const handleLinkClick = jest.fn();

    render(<Router history={history}><SearchItem guitar={Guitar} handleLinkClick={handleLinkClick}/></Router>);

    const link = screen.getByText(/Честер Bass/);
    userEvent.click(link);
    expect(handleLinkClick).toBeCalled();
  });
});
