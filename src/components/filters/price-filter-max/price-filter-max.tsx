import React from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {getFilterPriceMax} from '../../../store/filter/selectors';
import {setPriceMax} from '../../../store/action';
import {getPriceMax, getPriceMin} from '../../../store/data/selectors';
import useDebounce from '../../../hooks/use-debounce/use-debounce';
import {usePriceFilter} from '../../../hooks/use-price-filter/use-price-filter';
import {DELAY, ONE_PAGE} from '../../../constants/constants';
import {fetchGuitars} from '../../../store/api-actions';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onPriceMax: (price: number) => {
    dispatch(setPriceMax(price));
    dispatch(fetchGuitars(ONE_PAGE));
  },
});

const mapStateToProps = (state: State) => ({
  priceMin: getPriceMin(state),
  priceMax: getPriceMax(state),
  filterPriceMax: getFilterPriceMax(state),
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
  filterPriceMax?: number,
  onPriceMax?: (price: number) => void,
}

function PriceFilterMin({priceMin = 0, priceMax = 0, filterPriceMax = 0, onPriceMax}: Props): JSX.Element {

  const {price, handlePriceChange} = usePriceFilter(priceMax, filterPriceMax, onPriceMax, (currentPrice: number) => checkCurrentValue(currentPrice, priceMin, priceMax));

  return (
    <div className="form-input">
      <label className="visually-hidden">Максимальная цена</label>
      <input type="number" placeholder={`${priceMax}`} defaultValue={price === 0 ? '' : price} id="priceMax" name="до" onInput={useDebounce(handlePriceChange, DELAY)}/>
    </div>
  );
}

export {PriceFilterMin};
export default connect(mapStateToProps, mapDispatchToProps)(PriceFilterMin);
