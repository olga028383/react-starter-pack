import React, {useEffect} from 'react';
import browserHistory from '../../browser-history';
import './catalog.css';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import Filters from '../filters/filters';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {State} from '../../types/state';
import {getTotalPages} from '../../store/application/selectors';
import {AppRoute, Message, ONE_PAGE} from '../../constants/constants';
import {QueryPageTypes} from '../../types/params';
import PageTitle from '../page-title/page-title';
import Loading from '../loading/loading';
import CatalogCards from '../catalog-cards/catalog-cards';
import {getIsLoadData} from '../../store/data/selectors';

const mapStateToProps = (state: State) => ({
  pagesTotal: getTotalPages(state),
  isDataLoading: getIsLoadData(state),
});

type Props = {
  pagesTotal?: number,
  isDataLoading?: boolean,
}

function Catalog({pagesTotal = 0, isDataLoading}: Props): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const breadcrumbs = [{to: AppRoute.CATALOG, text: Message.Catalog}];

  useEffect(() => {
    const id = Number(params.id);

    if(Object.keys(params).length > 0 && isNaN(id)){
      browserHistory.replace(AppRoute.CATALOG);
      return;
    }

    if (pagesTotal >= ONE_PAGE && id > pagesTotal) {
      browserHistory.replace(AppRoute.CATALOG);
    }
  }, [params.id, pagesTotal]);

  return (
    <>

      <PageTitle text='Каталог товаров'/>

      <Breadcrumbs links={breadcrumbs}/>

      <div className='catalog'>
        <Filters/>
        <Sort/>

        {!isDataLoading ? <Loading/> :
          <>
            <CatalogCards />
            {pagesTotal > 0 && <Pagination/>}
          </>}

      </div>

    </>
  );
}

export {Catalog};
export default connect(mapStateToProps)(Catalog);

