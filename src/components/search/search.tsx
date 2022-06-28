import React, {useState, ChangeEvent, FormEvent} from 'react';
import {connect} from 'react-redux';
import {AxiosInstance} from 'axios';
import {nanoid} from 'nanoid';
import './search.css';
import {getApi} from '../../store/application/selectors';
import {State} from '../../types/state';
import {searchGuitars} from '../../store/api-actions';
import SearchItem from './search-item/search-item';
import {Guitar} from '../../types/data';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import {DELAY} from '../../constants/constants';

const mapStateToProps = (state: State) => ({
  api: getApi(state),
});

type SearchDetailType = {
  api?: AxiosInstance
}

function Search({api}: SearchDetailType): JSX.Element {
  const [data, setData] = useState<Guitar[]>([]);
  const [searchWord, setSearchWord] = useState('');

  const resetSearch = () => {
    setData([]);
    setSearchWord('');
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleResetSearchButton = () => {
    resetSearch();
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSearchWord(value);

    if(!value){
      setData([]);
    }

    if(value) {
      searchGuitars(value, api as AxiosInstance)
        .then((guitars) => {
          setData(guitars);
        });
    }
  };

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search" onSubmit={handleFormSubmit}>
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" defaultValue={searchWord} onChange={useDebounce(handleInputChange, DELAY)}/>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {
        data.length > 0
        &&
          <>
            <ul className="form-search__select-list">
              {
                data.map((item) => <SearchItem key={`${nanoid()}-search-item`} guitar={item} handleLinkClick={resetSearch}/>)
              }
            </ul>
            <button className="form-search__reset" type="reset" form="form-search" onClick={handleResetSearchButton}>
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
              <span className="visually-hidden">Сбросить поиск</span>
            </button>
          </>
      }
    </div>
  );
}

export {Search};
export default connect(mapStateToProps, null)(Search);
