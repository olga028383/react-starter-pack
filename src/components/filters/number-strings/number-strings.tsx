import React, {ChangeEvent, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {getNumberStrings, getAvailableNumberString} from '../../../store/filter/selectors';
import {setNumberStrings} from '../../../store/action';
import {addElementFilter, getActiveValueFilter, removeElementFilter} from '../../../utils/utils';
import {ONE_PAGE} from '../../../constants/constants';
import {fetchGuitars, fetchPrice} from '../../../store/api-actions';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetNumberStrings: (numberStrings: number[]) => {
    dispatch(setNumberStrings(numberStrings));
  },
  onFetchGuitars: (isSetPrice: boolean) => {
    dispatch(fetchGuitars(ONE_PAGE, () => {
      if(isSetPrice) {
        dispatch(fetchPrice(true));
        dispatch(fetchPrice(false));
      }
    }));
  },
});

const mapStateToProps = (state: State) => ({
  numberStrings: getNumberStrings(state),
  availableStrings: getAvailableNumberString(state),
});

type Props = {
  name: number,
  numberStrings?: number[] | [],
  availableStrings?: number[],
  onSetNumberStrings?: (numberStrings: number[]) => void;
  onFetchGuitars?: (isSetPrice: boolean) => void;
}

function NumberStrings({name, numberStrings = [], availableStrings = [], onSetNumberStrings, onFetchGuitars}: Props): JSX.Element {
  const [isChecked, setIsChecked] = useState(numberStrings.length > 0 && getActiveValueFilter(numberStrings, name));
  const code = `${name}-strings`;
  const disabled = availableStrings && availableStrings.length > 0 && !availableStrings.includes(name);

  const handleNumberStringsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setIsChecked(target.checked);

    if (onSetNumberStrings && numberStrings && onFetchGuitars) {
      const current = (target.checked) ? addElementFilter(numberStrings, name) : removeElementFilter(numberStrings, name);
      onSetNumberStrings(current);
      onFetchGuitars(true);
    }
  };

  useEffect(() => {
    setIsChecked(numberStrings.length > 0 && getActiveValueFilter(numberStrings, name));
  }, [numberStrings.length]);


  useEffect(() => {
    if(!onSetNumberStrings || !onFetchGuitars){
      return;
    }

    if (disabled && isChecked) {
      setIsChecked(false);
      onSetNumberStrings(removeElementFilter(numberStrings, name));
      onFetchGuitars(false);
    }
  }, [availableStrings.length]);


  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input className="visually-hidden" type="checkbox" id={code} name={code} disabled={disabled} checked={isChecked} onChange={handleNumberStringsChange}/>
      <label htmlFor={code}>{name}</label>
    </div>
  );
}

export {NumberStrings};
export default connect(mapStateToProps, mapDispatchToProps)(NumberStrings);
