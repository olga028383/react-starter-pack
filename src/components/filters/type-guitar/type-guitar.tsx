import React, {ChangeEvent, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {setType} from '../../../store/action';
import {getType} from '../../../store/filter/selectors';
import {addElementFilter, getActiveValueFilter, removeElementFilter} from '../../../utils/utils';
import {fetchGuitars, fetchPrice} from '../../../store/api-actions';
import {ONE_PAGE} from '../../../constants/constants';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetType: (types: string[]) => {
    dispatch(setType(types));
  },
  onFetchGuitars: () => {
    dispatch(fetchGuitars(ONE_PAGE, () => {
      dispatch(fetchPrice(true));
      dispatch(fetchPrice(false));
    }));
  },
});

const mapStateToProps = (state: State) => ({
  types: getType(state),
});

type Props = {
  name: string,
  code: string,
  types?: string[],
  onSetType?: (type: string[]) => void;
  onFetchGuitars?: () => void;
}

function TypeGuitar({code, name, types = [], onSetType, onFetchGuitars}: Props): JSX.Element {
  const [isChecked, setIsChecked] = useState(false);

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setIsChecked(target.checked);
    if (onSetType && types && onFetchGuitars) {
      const currentTypes = (target.checked) ? addElementFilter(types, code) : removeElementFilter(types, code);
      onSetType(currentTypes);
      onFetchGuitars();
    }
  };

  useEffect(() => {
    const value = types.length > 0 && getActiveValueFilter(types, code);
    setIsChecked(value);
  }, [types.length]);

  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input className="visually-hidden" type="checkbox" id={code} name={code} checked={isChecked} onChange={handleTypeChange}/>
      <label htmlFor={code}>{name}</label>
    </div>
  );
}

export {TypeGuitar};
export default connect(mapStateToProps, mapDispatchToProps)(TypeGuitar);
