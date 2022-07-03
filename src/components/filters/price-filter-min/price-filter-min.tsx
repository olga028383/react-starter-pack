import React from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {getFilterPriceMin} from '../../../store/filter/selectors';
import {setPriceMin} from '../../../store/action';
import {getPriceMax, getPriceMin} from '../../../store/data/selectors';
import {usePriceFilter} from '../../../hooks/use-price-filter/use-price-filter';
import {ONE_PAGE} from '../../../constants/constants';
import {fetchGuitars} from '../../../store/api-actions';
import {checkPrice, getPriceParam} from '../../../utils/utils';

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

type Props = {
  priceMin?: number,
  priceMax?: number,
  filterPriceMin?: number,
  onPriceMin?: (price: number) => void,
}

function PriceFilterMin({priceMin = 0, priceMax = 0, filterPriceMin = 0, onPriceMin}: Props): JSX.Element {

  const {price, handlePriceBlur, handlePriceInput} = usePriceFilter(priceMin, filterPriceMin, onPriceMin,()=>checkPrice(price, priceMin, priceMax), () => getPriceParam('price_gte'));

  return (
    <div className="form-input">
      <label className="visually-hidden">Минимальная цена</label>
      <input type="number" placeholder={`${priceMin}`} data-testid="priceMin" defaultValue={price === 0 ? '' : price} id="priceMin" name="от" onBlur={handlePriceBlur} onInput={handlePriceInput}/>
    </div>
  );
}

export {PriceFilterMin};
export default connect(mapStateToProps, mapDispatchToProps)(PriceFilterMin);
