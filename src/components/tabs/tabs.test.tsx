import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import Tabs from './tabs';
import {Guitar} from '../../mock/test';
import {AppRoute} from '../../constants/constants';

const renderTabsComponent = (path: string | null) => {
  const history = createMemoryHistory();
  if(path) {
    history.push(path);
  }
  render(<Router history={history}><Tabs content={Guitar}/></Router>);
};

describe('Component: Tabs', () => {

  it('the component should render correctly', () => {
    renderTabsComponent(null);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

  });

  it('should switch the reviews tab on click', () => {
    renderTabsComponent(`${AppRoute.CATALOG_PAGE}/1/description/`);

    userEvent.click(screen.getByText(/Описание/i));
    expect(screen.getByText(/Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям./i)).toBeInTheDocument();
    expect(screen.queryByText(/Артикул:/i)).not.toBeInTheDocument();
  });

});

