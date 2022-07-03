import React from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {getFilterPriceMax, getFilterPriceMin} from '../../../store/filter/selectors';
import {setPriceMax} from '../../../store/action';
import {getPriceMax, getPriceMin} from '../../../store/data/selectors';
import {usePriceFilter} from '../../../hooks/use-price-filter/use-price-filter';
import {ONE_PAGE} from '../../../constants/constants';
import {fetchGuitars} from '../../../store/api-actions';
import {checkPrice, getPriceParam} from '../../../utils/utils';

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
  filterPriceMin: getFilterPriceMin(state),
});

type Props = {
  priceMin?: number,
  priceMax?: number,
  filterPriceMax?: number,
  filterPriceMin?: number,
  onPriceMax?: (price: number) => void,
}

function PriceFilterMin({priceMin = 0, priceMax = 0, filterPriceMin = 0, filterPriceMax = 0, onPriceMax}: Props): JSX.Element {

  const {price, handlePriceBlur, handlePriceInput} = usePriceFilter(priceMax, filterPriceMax, onPriceMax, () => checkPrice(price, Math.max(priceMin, filterPriceMin), priceMax), () => getPriceParam('price_lte'));

  return (
    <div className="form-input">
      <label className="visually-hidden">Максимальная цена</label>
      <input type="number" data-testid="priceMax" placeholder={`${priceMax}`} value={price === 0 ? '' : price} id="priceMax" name="до" onBlur={handlePriceBlur} onInput={handlePriceInput}/>
    </div>
  );
}

export {PriceFilterMin};
export default connect(mapStateToProps, mapDispatchToProps)(PriceFilterMin);
