import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import Tabs from './tabs';
import {Guitar} from '../../mock/test';
import {AppRoute} from '../../constants/constants';

let history:any = null;

describe('Component: Tabs', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('the component should render correctly', () => {
    render(<Router history={history}><Tabs content={Guitar}/></Router>);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

  });

  it('should switch the reviews tab on click', () => {
    history.push(`${AppRoute.CATALOG_PAGE}/1/description/`);
    render(<Router history={history}><Tabs content={Guitar}/></Router>);

    userEvent.click(screen.getByText(/Описание/i));
    expect(screen.getByText(/Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям./i)).toBeInTheDocument();
    expect(screen.queryByText(/Артикул:/i)).not.toBeInTheDocument();
  });

});

