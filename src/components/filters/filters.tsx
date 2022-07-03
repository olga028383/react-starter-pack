import React from 'react';
import {connect} from 'react-redux';
import browserHistory from '../../browser-history';
import './filters.css';
import {nanoid} from 'nanoid';
import TypeGuitar from './type-guitar/type-guitar';
import NumberStrings from './number-strings/number-strings';
import {GuitarFilterType} from '../../constants/adapters';
import PriceFilterMin from './price-filter-min/price-filter-min';
import PriceFilterMax from './price-filter-max/price-filter-max';
import {fetchGuitars, fetchPrice} from '../../store/api-actions';
import {clearFilter, setCurrentPage} from '../../store/action';
import {AppDispatch, State} from '../../types/state';
import {ONE_PAGE, STRINGS_DATA, AppRoute} from '../../constants/constants';
import {getIsActiveFilter} from '../../store/filter/selectors';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClearFilter: () => {
    dispatch(clearFilter());
    setCurrentPage(ONE_PAGE);
    browserHistory.replace(AppRoute.CATALOG);
    dispatch(fetchGuitars(ONE_PAGE, () => {
      dispatch(fetchPrice(true));
      dispatch(fetchPrice(false));
    }));
  },
});

const mapStateToProps = (state: State) => ({
  isActiveFilter: getIsActiveFilter(state),
});

type Props ={
  onClearFilter?: () => void,
  isActiveFilter?: boolean,
}
function Filters({onClearFilter, isActiveFilter = false}: Props): JSX.Element {
  const handleClearFilterClick = () => {
    if(isActiveFilter && onClearFilter) {
      onClearFilter();
    }
  };
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <PriceFilterMin/>
          <PriceFilterMax/>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Array.from(GuitarFilterType).map((item) =>
          <TypeGuitar key={`${nanoid()}-type`} name={item[1]} code={item[0]}/>)}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {STRINGS_DATA.map((item) => <NumberStrings key={`${nanoid()}-strings`} name={item} />)}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleClearFilterClick}>Очистить</button>
    </form>

  );
}

export {Filters};
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
