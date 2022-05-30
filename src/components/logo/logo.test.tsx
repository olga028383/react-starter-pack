import { render, screen } from '@testing-library/react';
import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Logo additionalClass={'test'}/>
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo additionalClass={'test'}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
