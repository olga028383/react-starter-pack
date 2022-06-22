import React from 'react';
import ReactDOM from 'react-dom';
import {Router as BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import browserHistory from './browser-history';
import {createApi} from './api';
import reducer from './store/reducer';
import thunk from 'redux-thunk';
import {fetchGuitars} from './store/api-actions';
import App from './components/app/app';
import {setApi} from './store/action';
import {ONE_PAGE} from './constants/constants';

const api = createApi();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

store.dispatch(setApi(api));
store.dispatch(fetchGuitars(ONE_PAGE));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));


export {store};
