import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import {AppDispatch, State} from '../../types/state';
import {AppRoute, OFFSET_PAGE, PAGE_QUERY_SEPARATOR, SHOW_PAGE} from '../../constants/constants';
import {getGuitars} from '../../store/data/selectors';
import {setCurrentPage} from '../../store/action';

const FIRST_PAGE = 1;

const Button = {
  Next: 'next',
  Prev: 'prev',
};

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetCurrentPage(page: number) {
    dispatch(setCurrentPage(page));
  },
});

const createPathLink = (link: number): string => link !== FIRST_PAGE ? `${AppRoute.CATALOG}/page_${link}` : AppRoute.CATALOG;

type QueryPageTypes = {
  page: string;
};

function Pagination({guitars, currentPage, onSetCurrentPage}: any): JSX.Element {
  const guitarCount = guitars.length;
  const pagesCount = Math.ceil(guitarCount / SHOW_PAGE);
  const links = new Array(pagesCount).fill(null).map((item, id) => id + OFFSET_PAGE);
  const firstPage = FIRST_PAGE === currentPage;
  const lastPage = pagesCount === currentPage;
  const params = useParams<QueryPageTypes>();

  useEffect(() => {
    if (params.page) {
      const [, pageNum] = params.page.split(PAGE_QUERY_SEPARATOR);

      if (Number(pageNum) > FIRST_PAGE) {
        onSetCurrentPage(Number(pageNum));
      }
    }
  }, [params.page]);

  const handleButtonClick = (evt: any): void => {
    evt.preventDefault();

    const idButton = evt.target.id;
    if (idButton) {
      switch (idButton) {
        case Button.Next:
          onSetCurrentPage(++currentPage);
          break;
        case Button.Prev:
          onSetCurrentPage(--currentPage);
          break;
      }
    }
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          firstPage ||
          <li className="pagination__page pagination__page--prev">
            <Link className="link pagination__page-link" to={createPathLink(currentPage)} id="prev" onClick={handleButtonClick}>Назад</Link>
          </li>
        }

        {
          links.map((link) => {
            const activeLink = currentPage === link ? 'pagination__page--active' : '';
            return (
              <li key={`${link}-page`} className={`pagination__page ${activeLink}`}>
                <Link className="link pagination__page-link" to={createPathLink(link)} onClick={() => onSetCurrentPage(link)}>{link}</Link>
              </li>
            );
          })
        }

        {
          lastPage ||
          <li className="pagination__page pagination__page--next">
            <Link className="link pagination__page-link" id="next" to={createPathLink(currentPage)} onClick={handleButtonClick}>Далее</Link>
          </li>
        }
      </ul>
    </div>
  );
}

export {Pagination};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
