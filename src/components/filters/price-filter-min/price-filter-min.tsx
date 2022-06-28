import React from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {getFilterPriceMin} from '../../../store/filter/selectors';
import {setPriceMin} from '../../../store/action';
import {getPriceMax, getPriceMin} from '../../../store/data/selectors';
import useDebounce from '../../../hooks/use-debounce/use-debounce';
import {usePriceFilter} from '../../../hooks/use-price-filter/use-price-filter';
import {DELAY, ONE_PAGE} from '../../../constants/constants';
import {fetchGuitars} from '../../../store/api-actions';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onPriceMin: (price: number) => {
    dispatch(setPriceMin(price));
    dispatch(fetchGuitars(ONE_PAGE));
  },
});

const mapStateToProps = (state: State) => ({
  priceMin: getPriceMin(state),
  priceMax: getPriceMax(state),
  filterPriceMin: getFilterPriceMin(state),
});

const checkCurrentValue = (currentPrice: number, min: number | undefined, max: number | undefined) => {
  if (!min || !max) {
    return false;
  }
  return currentPrice < min || currentPrice > max;
};

type Props = {
  priceMin?: number,
  priceMax?: number,
  filterPriceMin?: number,
  onPriceMin?: (price: number) => void,
}

function PriceFilterMin({priceMin = 0, priceMax = 0, filterPriceMin = 0, onPriceMin}: Props): JSX.Element {

  const {price, handlePriceChange} = usePriceFilter(priceMin, filterPriceMin, onPriceMin, (currentPrice: number) => checkCurrentValue(currentPrice, priceMin, priceMax));

  return (
    <div className="form-input">
      <label className="visually-hidden">Минимальная цена</label>
      <input type="number" placeholder={`${priceMin}`} defaultValue={price === 0 ? '' : price} id="priceMin" name="от" onInput={useDebounce(handlePriceChange, DELAY)}/>
    </div>
  );
}

export {PriceFilterMin};
export default connect(mapStateToProps, mapDispatchToProps)(PriceFilterMin);
