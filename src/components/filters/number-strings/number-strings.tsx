import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {getNumberStrings, getAvailableNumberString} from '../../../store/filter/selectors';
import {setNumberStrings} from '../../../store/action';
import {addElementFilter, getActiveValueFilter, removeElementFilter} from '../../../utils/utils';
import {ONE_PAGE} from '../../../constants/constants';
import {fetchGuitars} from '../../../store/api-actions';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetNumberStrings: (numberStrings: number[]) => {
    dispatch(setNumberStrings(numberStrings));
    dispatch(fetchGuitars(ONE_PAGE));
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
}

function NumberStrings({name, numberStrings, availableStrings, onSetNumberStrings}: Props): JSX.Element {
  const code = `${name}-strings`;
  const checked = numberStrings ? getActiveValueFilter(numberStrings, name) : false;

  const handleNumberStringsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;

    if (onSetNumberStrings && numberStrings) {
      const current = (target.checked) ? addElementFilter(numberStrings, name) : removeElementFilter(numberStrings, name);
      onSetNumberStrings(current);
    }
  };

  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input className="visually-hidden" type="checkbox" id={code} name={code} defaultChecked={checked} disabled={availableStrings && availableStrings.length > 0 && !availableStrings.includes(name)} onChange={handleNumberStringsChange}/>
      <label htmlFor={code}>{name}</label>
    </div>
  );
}

export {NumberStrings};
export default connect(mapStateToProps, mapDispatchToProps)(NumberStrings);
