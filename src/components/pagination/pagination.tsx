import React, {useEffect, MouseEvent} from 'react';
import './pagination.css';
import {connect} from 'react-redux';
import {useParams, Link, useHistory} from 'react-router-dom';
import {AppDispatch, State} from '../../types/state';
import {AppRoute, OFFSET_ONE, ONE_PAGE} from '../../constants/constants';
import {getGuitars} from '../../store/data/selectors';
import {setCurrentPage} from '../../store/action';
import {QueryPageTypes} from '../../types/params';
import {getCurrentPage, getTotalPages} from '../../store/application/selectors';
import {fetchGuitars} from '../../store/api-actions';

const FIRST_PAGE = 1;

const Button = {
  Next: 'next',
  Prev: 'prev',
};

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  totalPages: getTotalPages(state),
  currentPage: getCurrentPage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetCurrentPage(page: number) {
    dispatch(setCurrentPage(page));
    dispatch(fetchGuitars(page));
  },
});

const createPathLink = (link: number): string => link !== FIRST_PAGE ? `${AppRoute.CATALOG}/page/${link}` : AppRoute.CATALOG;

type PaginationType = {
  totalPages?: number,
  currentPage?: number,
  onSetCurrentPage?: (page: number) => void,
}

function Pagination({totalPages, currentPage = FIRST_PAGE, onSetCurrentPage}: PaginationType): JSX.Element {
  const links = new Array(totalPages).fill(null).map((item, id) => id + OFFSET_ONE);
  const firstPage = FIRST_PAGE === currentPage;
  const lastPage = totalPages === currentPage;
  const params = useParams<QueryPageTypes>();
  const history = useHistory();

  useEffect(() => {
    const pageNum = Number(params.id);
    if (pageNum && pageNum !== currentPage) {

      if (pageNum > FIRST_PAGE && onSetCurrentPage) {
        onSetCurrentPage(pageNum);
      }
    }
  }, [params.id]);

  useEffect(() => {
    if(onSetCurrentPage && totalPages && currentPage > totalPages){
      onSetCurrentPage(ONE_PAGE);
    }
  }, []);

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;
    const idButton = target.id;

    if (idButton && onSetCurrentPage) {
      switch (idButton) {
        case Button.Next:
          onSetCurrentPage(++currentPage);
          break;
        case Button.Prev:
          onSetCurrentPage(--currentPage);
          break;
      }
    }
    history.push(createPathLink(currentPage));
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          firstPage ||
          <li className="pagination__page pagination__page--prev">
            <Link className="link pagination__page-link" to={createPathLink(currentPage)} id="prev" onClick={handleButtonClick}>??????????</Link>
          </li>
        }

        {
          links.map((link) => {
            const activeLink = currentPage === link ? 'pagination__page--active' : '';
            return (
              <li key={`${link}-page`} className={`pagination__page ${activeLink}`}>
                <Link className="link pagination__page-link"
                  to={createPathLink(link)}
                  onClick={() => {
                    if (onSetCurrentPage) {
                      onSetCurrentPage(link);
                    }
                  }}
                >
                  {link}
                </Link>
              </li>
            );
          })
        }

        {
          lastPage ||
          <li className="pagination__page pagination__page--next">
            <Link className="link pagination__page-link" id="next" to={createPathLink(currentPage)} onClick={handleButtonClick}>??????????</Link>
          </li>
        }
      </ul>
    </div>
  );
}

export {Pagination};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
