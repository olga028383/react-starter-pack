import React, {useEffect} from 'react';
import browserHistory from '../../browser-history';
import './catalog.css';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {nanoid} from 'nanoid';
import Filters from '../filters/filters';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import {State} from '../../types/state';
import {getGuitars, getIsLoadData} from '../../store/data/selectors';
import GuitarCard from '../guitar-card/guitar-card';
import {Guitar} from '../../types/data';
import {getTotalPages} from '../../store/application/selectors';
import {AppRoute, Message, ONE_PAGE} from '../../constants/constants';
import {QueryPageTypes} from '../../types/params';
import PageTitle from '../page-title/page-title';
import Loading from '../loading/loading';
import {getIsActiveFilter} from '../../store/filter/selectors';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  pagesTotal: getTotalPages(state),
  isDataLoading: getIsLoadData(state),
  isActiveFilter: getIsActiveFilter(state),
});

type Props = {
  guitars?: Guitar[],
  pagesTotal?: number,
  isDataLoading?: boolean,
  isActiveFilter?: boolean,
}

function Catalog({guitars, pagesTotal = 0, isDataLoading, isActiveFilter}: Props): JSX.Element {
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
            <div className='cards catalog__cards'>
              {guitars && guitars.length > 0 ? (guitars as Guitar[]).map((guitar) => <GuitarCard key={`${nanoid()}-guitar`} guitar={guitar}/>): Message.NotGuitars}
            </div>
            {pagesTotal > 0 && <Pagination/>}
          </>}

      </div>

    </>
  );
}

export {Catalog};
export default connect(mapStateToProps)(Catalog);

