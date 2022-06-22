import React, {useState, MouseEvent, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import browserHistory from '../../browser-history';
import './sort.css';
import {AppDispatch} from '../../types/state';
import {fetchGuitars} from '../../store/api-actions';
import {ONE_PAGE, SortName, OrderName, SortKey} from '../../constants/constants';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onChangeGuitarsList(sort: string | '', order: string | '') {
    dispatch(fetchGuitars(ONE_PAGE, sort, order));
  },
});

const getActiveClass = (param: string, value: string, activeClass: string): string => param === value ? activeClass : '';

const replaceParam = (state: { sort: string, order: string }, name: string, value: string): { sort: string, order: string } => {
  switch (name) {
    case SortKey.Sort:
      return {...state, sort: value};
    case SortKey.Order:
      if (!state.sort) {
        return {sort: SortName.Price, order: value};
      }
      return {...state, order: value};
  }

  return state;
};

type SortType = {
  onChangeGuitarsList: (sort: string | '', order: string | '') => void,
}

function Sort({onChangeGuitarsList}: SortType): JSX.Element {
  const [queryParam, setQueryParam] = useState({sort: '', order: ''});
  const location = useLocation();

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;
    const name = target.dataset.name;
    const value = target.dataset.value;

    if (name && value) {
      setQueryParam(
        replaceParam(queryParam, name, value),
      );
    }
  };

  useEffect(() => {
    onChangeGuitarsList(queryParam.sort, queryParam.order);

    const paramUri = Object.entries(queryParam).filter((item) => !!item[1]).map((item) => `${item[0]}=${item[1]}`).join('&');
    if (paramUri) {
      browserHistory.replace(`?${paramUri}`);
    }
  }, [queryParam]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortParam = searchParams.get(SortKey.Sort);
    const orderParam = searchParams.get(SortKey.Order);

    if (orderParam && !sortParam) {
      setQueryParam({
        sort: SortName.Price,
        order: orderParam ? orderParam : '',
      });

      return;
    }

    setQueryParam({
      sort: sortParam ? sortParam : '',
      order: orderParam ? orderParam : '',
    });

  }, [location.search]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${getActiveClass(queryParam.sort, SortName.Price, 'catalog-sort__type-button--active')}`} aria-label="по цене" data-name="sort" data-value={SortName.Price} onClick={handleButtonClick}>по цене</button>
        <button className={`catalog-sort__type-button ${getActiveClass(queryParam.sort, SortName.Rating, 'catalog-sort__type-button--active')}`} aria-label="по популярности" data-name="sort" data-value={SortName.Rating} onClick={handleButtonClick}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button ${getActiveClass(queryParam.order, OrderName.Asc, 'catalog-sort__order-button--active')} catalog-sort__order-button--up`} data-name="order" data-value={OrderName.Asc} aria-label="По возрастанию" onClick={handleButtonClick}></button>
        <button className={`catalog-sort__order-button ${getActiveClass(queryParam.order, OrderName.Desc, 'catalog-sort__order-button--active')} catalog-sort__order-button--down`} data-name="order" data-value={OrderName.Desc} aria-label="По убыванию" onClick={handleButtonClick}></button>
      </div>
    </div>
  );
}

export {Sort};
export default connect(null, mapDispatchToProps)(Sort);
