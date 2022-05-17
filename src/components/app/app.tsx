import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {getIsLoadData} from '../../store/data/selectors';
import NotFound from '../not-found/not-found';
import Error from '../error/error';
import Catalog from '../catalog/catalog';
import Loading from '../loading/loading';
import {AppRoute} from '../../constants/constants';
import {State} from '../../types/state';
import {getServerError} from '../../store/application/selectors';
import GuitarDetail from '../guitar-detail/guitar-detail';

const mapStateToProps = (state: State) => ({
  isDataLoaded: getIsLoadData(state),
  serverError: getServerError(state),
});

type appActionType = {
  isDataLoaded?: boolean,
  serverError?: string,
}

function App({isDataLoaded, serverError}: appActionType): JSX.Element {
  if (serverError) {
    return (
      <Error textError={serverError}/>
    );
  }

  if (!isDataLoaded) {
    return (
      <Loading/>
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.CATALOG}>
        <Catalog/>
      </Route>
      <Route path={AppRoute.CATALOG_PAGE}>
        <Catalog/>
      </Route>
      <Route path={AppRoute.CATALOG_DETAIL}>
        <GuitarDetail/>
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
}

export {App};
export default connect(mapStateToProps, null)(App);
