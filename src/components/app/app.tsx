import React from 'react';
import './app.css';
import {connect} from 'react-redux';
import {Redirect, Switch, Route} from 'react-router-dom';
import NotFound from '../not-found/not-found';
import Error from '../error/error';
import Catalog from '../catalog/catalog';
import {AppRoute} from '../../constants/constants';
import {State} from '../../types/state';
import {getServerError} from '../../store/application/selectors';
import GuitarDetail from '../guitar-detail/guitar-detail';
import Header from '../header/header';
import Footer from '../footer/footer';

const mapStateToProps = (state: State) => ({
  serverError: getServerError(state),
});

type appActionType = {
  serverError?: string,
}

function App({serverError}: appActionType): JSX.Element {
  if (serverError) {
    return (
      <Error textError={serverError}/>
    );
  }

  return (
    <>
      <Header/>

      <main className="page-content">
        <div className="container">
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <Redirect to={AppRoute.CATALOG}/>
            </Route>
            <Route exact path={[AppRoute.CATALOG, AppRoute.CATALOG_PAGE, AppRoute.ROOT]}>
              <Catalog/>
            </Route>
            <Route exact path={[AppRoute.CATALOG_DETAIL, AppRoute.CATALOG_DETAIL_TAB]}>
              <GuitarDetail/>
            </Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </main>

      <Footer/>
    </>
  );
}

export {App};
export default connect(mapStateToProps, null)(App);
