import React, {useState, useEffect} from 'react';
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
import {AppRoute, Message} from '../../constants/constants';
import {QueryPageTypes} from '../../types/params';
import NotFound from '../not-found/not-found';
import PageTitle from '../page-title/page-title';
import Loading from '../loading/loading';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  pagesTotal: getTotalPages(state),
  isDataLoading: getIsLoadData(state),
});

type Props = {
  guitars?: Guitar[],
  pagesTotal?: number,
  isDataLoading?: boolean,
}

function Catalog({guitars, pagesTotal = 0, isDataLoading}: Props): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [pageError, setPageError] = useState(false);
  const breadcrumbs = [{to: AppRoute.CATALOG, text: Message.Catalog}];

  useEffect(() => {
    const id = Number(params.id);
    if (Object.keys(params).length > 0 && (isNaN(id) || (id > pagesTotal))) {
      setPageError(true);
    }
  }, [params.id, pagesTotal]);

  if (pageError) {
    return <NotFound/>;
  }

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

