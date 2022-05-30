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

let history = null;
let store = null;
let fakeApp: any = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore();
    store = createFakeStore({
      DATA: {isDataLoaded: true, guitars: [Guitar, Guitar]},
      APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 27, api: jest.fn()},
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>
    );

  });

  it('should redirect to directory "/catalog"', () => {
    history.push(AppRoute.ROOT);
    render(fakeApp);
    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Честер Bass/i)).toHaveLength(2);
  });

  it('should render "Catalog" when user navigate to "/catalog"', () => {
    history.push(AppRoute.CATALOG);
    render(fakeApp);
    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Честер Bass/i)).toHaveLength(2);
  });

  it('Catalog page 2 should render "/catalog/page/id"', () => {
    history.push('/catalog/page/2');
    render(fakeApp);
    expect(screen.getByText(/Каталог товаров/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Честер Bass/i)).toHaveLength(2);
  });

  it('should display the description in tabs when the user navigates "/catalog/1/description"', async() => {
    mockFetchGuitar.mockReturnValue(Promise.resolve(Guitar));
    history.push('/catalog/1/description');
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/Описание/i)).toBeInTheDocument();
    expect(await screen.findByText(/Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям/i)).toBeInTheDocument();

  });

  it('should render "Guitar Detail" when user navigate to "/catalog/id"', async () => {
    mockFetchGuitar.mockReturnValue(Promise.resolve(Guitar));
    history.push('/catalog/1');
    render(fakeApp);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findAllByText(/Честер Bass/i)).toHaveLength(3);
    expect(await screen.findByText(/Характеристики/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);
    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

});
