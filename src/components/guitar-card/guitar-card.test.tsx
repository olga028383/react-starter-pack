import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import GuitarCard from './guitar-card';
import {Guitar, FakeStore} from '../../mock/test';

describe('Component: GuitarCard', () => {

  it('should display GuitarCard', () => {
    const history = createMemoryHistory();

    const createFakeStore = configureStore();
    const store = createFakeStore(FakeStore);

    render( <Provider store={store}><Router history={history}><GuitarCard guitar={Guitar} onBuyClick={jest.fn()} /></Router></Provider>);

    expect(screen.getByText(/Честер Bass/i)).toBeInTheDocument();
    expect(screen.getByText(/17 500/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });
});
