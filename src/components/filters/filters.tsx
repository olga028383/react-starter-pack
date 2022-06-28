import React from 'react';
import {connect} from 'react-redux';
import './filters.css';
import {nanoid} from 'nanoid';
import TypeGuitar from './type-guitar/type-guitar';
import NumberStrings from './number-strings/number-strings';
import {GuitarFilterType} from '../../constants/adapters';
import PriceFilterMin from './price-filter-min/price-filter-min';
import PriceFilterMax from './price-filter-max/price-filter-max';
import {fetchGuitars} from '../../store/api-actions';
import {clearFilter} from '../../store/action';
import {AppDispatch} from '../../types/state';
import {ONE_PAGE} from '../../constants/constants';

const numberStringsData = [4, 6, 7, 12];

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onClearFilter: () => {
    dispatch(clearFilter());
    dispatch(fetchGuitars(ONE_PAGE));
  },
});

type Props ={
  onClearFilter?: () => void
}
function Filters({onClearFilter}: Props): JSX.Element {
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
        {numberStringsData.map((item) => <NumberStrings key={`${nanoid()}-strings`} name={item}/>)}
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={onClearFilter}>Очистить</button>
    </form>

  );
}

export {Filters};
export default connect(null, mapDispatchToProps)(Filters);
