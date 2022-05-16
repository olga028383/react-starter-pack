import React from 'react';
import {connect} from 'react-redux';
import Filters from '../filters/filters';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';
import Footer from '../footer/footer';
import {State} from '../../types/state';
import {getGuitarsForCurrentPage, getTotalPages} from '../../store/data/selectors';
import GuitarCard from '../guitar-card/guitar-card';
import {Guitar} from '../../types/guitar';
import {getCurrentPage} from '../../store/application/selectors';
import {SHOW_PAGE} from '../../constants/constants';

const mapStateToProps = (state: State) => ({
  guitars: getGuitarsForCurrentPage(state),
  pagesTotal: getTotalPages(state),
  currentPage: getCurrentPage(state),
});

type catalogTypeProps = {
  guitars?: any,
  pagesTotal?: any,
  currentPage?: number,
}

function Catalog({guitars, pagesTotal, currentPage}: catalogTypeProps): JSX.Element {
  return (
    <>
      <Header/>
      <main className='page-content'>
        <div className='container'>
          <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>

          <Breadcrumbs/>

          <div className='catalog'>
            <Filters/>
            <Sort/>

            <div className='cards catalog__cards'>
              {(guitars as Guitar[]).map((guitar) => {
                const keyValue = `${guitar.id}-${guitar.previewImg}`;
                return (<GuitarCard key={keyValue} guitar={guitar}/>);
              })}
            </div>

            {pagesTotal > SHOW_PAGE && <Pagination currentPage={currentPage}/>}

          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export {Catalog};
export default connect(mapStateToProps, null)(Catalog);

