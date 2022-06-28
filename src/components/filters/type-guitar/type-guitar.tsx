import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {AppDispatch, State} from '../../../types/state';
import {setType} from '../../../store/action';
import {getType} from '../../../store/filter/selectors';
import {addElementFilter, getActiveValueFilter, removeElementFilter} from '../../../utils/utils';
import {fetchGuitars} from '../../../store/api-actions';
import {ONE_PAGE} from '../../../constants/constants';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetType: (type: string[]) => {
    dispatch(setType(type));
    dispatch(fetchGuitars(ONE_PAGE));
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
}

function TypeGuitar({code, name, types, onSetType}: Props): JSX.Element {
  const checked = types ? getActiveValueFilter(types, code) : false;

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;

    if (onSetType && types) {
      const currentTypes = (target.checked) ? addElementFilter(types, code) : removeElementFilter(types, code);
      onSetType(currentTypes);
    }
  };
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input className="visually-hidden" type="checkbox" id={code} name={code} defaultChecked={checked} onChange={handleTypeChange}/>
      <label htmlFor={code}>{name}</label>
    </div>
  );
}

export {TypeGuitar};
export default connect(mapStateToProps, mapDispatchToProps)(TypeGuitar);
