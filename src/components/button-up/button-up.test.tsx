import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import ButtonUp from './button-up';

let history = null;
let fakeApp:any = null;
window.scrollTo = jest.fn();

describe('Component: ButtonUp', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    fakeApp = (
      <Router history={history}><ButtonUp/></Router>
    );
  });


  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Наверх')).toBeInTheDocument();
  });

  it('should scroll the page to the top on click', () => {
    render(fakeApp);
    userEvent.click(screen.getByText(/Наверх/i));
    expect(window.scrollTo).toBeCalledTimes(1);
  });

});
