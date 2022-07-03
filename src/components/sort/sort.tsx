import React, {MouseEvent, useEffect} from 'react';
import {connect} from 'react-redux';
import './sort.css';
import {AppDispatch, State} from '../../types/state';
import {fetchGuitars} from '../../store/api-actions';
import {ONE_PAGE, SortName, OrderName} from '../../constants/constants';
import {setSort, setOrder} from '../../store/action';
import {getOrder, getSort} from '../../store/sort/selectors';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetSort: (sort: string) => {
    dispatch(setSort(sort));
  },
  onSetOrder: (order: string) => {
    dispatch(setOrder(order));

  },
  onFetchGuitars: () => {
    dispatch(fetchGuitars(ONE_PAGE));
  },
});

const mapStateToProps = (state: State) => ({
  sort: getSort(state),
  order: getOrder(state),
});

const getActiveClass = (param: string | undefined, value: string, activeClass: string): string => param === value ? activeClass : '';

type SortType = {
  onSetSort?: (sort: string) => void,
  onSetOrder?: (order: string) => void,
  onFetchGuitars?: () => void,
  sort?: string,
  order?: string,
}

function Sort({sort, order, onSetSort, onSetOrder, onFetchGuitars}: SortType): JSX.Element {
  const handleButtonClickSort = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    if (target && target.dataset.sort && onSetSort) {
      onSetSort(target.dataset.sort);
    }
    if(!order && onSetOrder){
      onSetOrder(OrderName.Asc);
    }
  };

  const handleButtonClickOrder = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    if (target && target.dataset.order && onSetOrder) {
      onSetOrder(target.dataset.order);
    }
  };

  useEffect(() => {
    if(!onSetOrder || !onSetSort || !onFetchGuitars){
      return;
    }

    if(order && !sort){
      onSetSort(SortName.Price);
    }

    if(sort && order){
      onFetchGuitars();
    }

  }, [sort, order]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button ${getActiveClass(sort, SortName.Price, 'catalog-sort__type-button--active')}`} aria-label="по цене" data-sort={SortName.Price} onClick={handleButtonClickSort}>по цене</button>
        <button className={`catalog-sort__type-button ${getActiveClass(sort, SortName.Rating, 'catalog-sort__type-button--active')}`} aria-label="по популярности" data-sort={SortName.Rating} onClick={handleButtonClickSort}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button ${getActiveClass(order, OrderName.Asc, 'catalog-sort__order-button--active')} catalog-sort__order-button--up`} data-order={OrderName.Asc} aria-label="По возрастанию" onClick={handleButtonClickOrder}></button>
        <button className={`catalog-sort__order-button ${getActiveClass(order, OrderName.Desc, 'catalog-sort__order-button--active')} catalog-sort__order-button--down`} data-order={OrderName.Desc} aria-label="По убыванию" onClick={handleButtonClickOrder}></button>
      </div>
    </div>
  );
}

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
