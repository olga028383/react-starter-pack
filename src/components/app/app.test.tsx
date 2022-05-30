import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {AppRoute} from '../../constants/constants';
import {Guitar} from '../../mock/test';
import {fetchGuitar} from '../../store/api-actions';

jest.mock('../../store/api-actions');
jest.mock('../reviews/reviews', () => {
  function Reviews() {
    return <>Reviews</>;
  }

  return {
    __esModule: true,
    default: Reviews,
  };
});

const mockFetchGuitar = fetchGuitar as jest.MockedFunction<typeof fetchGuitar>;

const renderAppComponent = (path: string) => {
  const history = createMemoryHistory();

  const createFakeStore = configureStore();
  const store = createFakeStore({
    DATA: {isDataLoaded: true, guitars: [Guitar, Guitar]},
    APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 3, api: jest.fn()},
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  );

  history.push(path);
  render(fakeApp);
};
describe('Application Routing', () => {

  it('should redirect to directory "/catalog"', () => {
    renderAppComponent(AppRoute.ROOT);

    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Честер Bass/i)).toHaveLength(2);
  });

  it('should render "Catalog" when user navigate to "/catalog"', () => {
    renderAppComponent(AppRoute.CATALOG);
    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Честер Bass/i)).toHaveLength(2);
  });

  it('should display the description in tabs when the user navigates "/catalog/1/description"', async () => {
    mockFetchGuitar.mockReturnValue(Promise.resolve(Guitar));
    renderAppComponent('/catalog/1/description');
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/Описание/i)).toBeInTheDocument();
    expect(await screen.findByText(/Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям/i)).toBeInTheDocument();

  });

  it('should render "Guitar Detail" when user navigate to "/catalog/id"', async () => {
    mockFetchGuitar.mockReturnValue(Promise.resolve(Guitar));
    renderAppComponent('/catalog/1');

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findAllByText(/Честер Bass/i)).toHaveLength(3);
    expect(await screen.findByText(/Характеристики/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    renderAppComponent('/non-existent-route');

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

});
