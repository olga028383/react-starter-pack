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
import {getGuitars} from '../../store/data/selectors';
import GuitarCard from '../guitar-card/guitar-card';
import {Guitar} from '../../types/data';
import {getTotalPages} from '../../store/application/selectors';
import {AppRoute, Title} from '../../constants/constants';
import {QueryPageTypes} from '../../types/params';
import NotFound from '../not-found/not-found';
import PageTitle from '../page-title/page-title';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  pagesTotal: getTotalPages(state),
});

type catalogTypeProps = {
  guitars?: Guitar[],
  pagesTotal?: number,
}

function Catalog({guitars, pagesTotal = 0}: catalogTypeProps): JSX.Element {
  const params = useParams<QueryPageTypes>();
  const [pageError, setPageError] = useState(false);
  const breadcrumbs = [{to: AppRoute.CATALOG, text: Title.CATALOG}];

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

        <div className='cards catalog__cards'>
          {(guitars as Guitar[]).map((guitar) => {
            const keyValue = `${nanoid()}-guitar`;
            return (<GuitarCard key={keyValue} guitar={guitar}/>);
          })}
        </div>

        {pagesTotal > 0 && <Pagination/>}

      </div>

    </>
  );
}

export {Catalog};
export default connect(mapStateToProps, null)(Catalog);

