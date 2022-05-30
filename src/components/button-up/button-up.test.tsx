import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import ButtonUp from './button-up';

window.scrollTo = jest.fn();

const renderButtonUpComponent = () => {
  const history = createMemoryHistory();
  const fakeApp = (
    <Router history={history}><ButtonUp/></Router>
  );

  render(fakeApp);
};

describe('Component: ButtonUp', () => {
  it('should render correctly', () => {
    renderButtonUpComponent();
    expect(screen.getByText('Наверх')).toBeInTheDocument();
  });

  it('should scroll the page to the top on click', () => {
    renderButtonUpComponent();
    userEvent.click(screen.getByText(/Наверх/i));
    expect(window.scrollTo).toBeCalledTimes(1);
  });

});
