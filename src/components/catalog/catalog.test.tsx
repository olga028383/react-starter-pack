import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Catalog from './catalog';
import {FakeStore} from '../../mock/test';

describe('Component: GuitarCard', () => {
  it('should display GuitarCard', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    render(<Provider store={store}><Router history={history}><Catalog/></Router></Provider>);

    screen.getAllByText(/Честер Bass/i).forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
