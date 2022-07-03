import React, {ChangeEvent, FormEvent, useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {nanoid} from 'nanoid';
import './search.css';
import {AppDispatch, State} from '../../types/state';
import {searchGuitars} from '../../store/api-actions';
import SearchItem from './search-item/search-item';
import {Guitar} from '../../types/data';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import {DELAY} from '../../constants/constants';
import {clearSearchGuitars, setSearchWord} from '../../store/action';
import {getSearchGuitars, getSearchWord} from '../../store/search/selectors';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSubmitSearch: (word: string) => {
    dispatch(searchGuitars(word));
  },
  onSetSearchWord: (word: string) => {
    dispatch(setSearchWord(word));
  },
  onClearSearchGuitars: () => {
    dispatch(clearSearchGuitars());
  },
});

const mapStateToProps = (state: State) => ({
  guitars: getSearchGuitars(state),
  searchWord: getSearchWord(state),
});

function Search({guitars = [], searchWord, onSubmitSearch, onSetSearchWord, onClearSearchGuitars}: any): JSX.Element {
  const [isActiveForm, setIsActiveForm] = useState(false);
  const rootEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const debouncedSearch = useDebounce(onSubmitSearch, DELAY);

  const resetSearch = () => {
    if (onClearSearchGuitars) {
      onClearSearchGuitars();
      setIsActiveForm(false);
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleResetSearchButton = () => {
    resetSearch();
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (onSetSearchWord) {
      onSetSearchWord(evt.target.value);
    }
  };

  const handleInputFocus = () => {
    if (guitars.length > 0) {
      setIsActiveForm(true);
    }
  };

  useEffect(() => {
    if (searchWord !== '') {
      debouncedSearch(searchWord);
    }
  }, [debouncedSearch, searchWord]);

  useEffect(() => {
    setIsActiveForm(Boolean(guitars.length));
  }, [guitars.length]);

  useEffect(() => {
    const handleDocumentClick = (evt: any) => {
      if( rootEl.current !== null && !rootEl.current.contains(evt.target)){
        setIsActiveForm(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keyup', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keyup', handleDocumentClick);
    };
  }, []);

  return (
    <div className="form-search" ref={rootEl}>
      <form className="form-search__form" id="form-search" onSubmit={handleFormSubmit}>
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" value={searchWord} onFocus={handleInputFocus} onChange={handleInputChange}/>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {
        guitars.length > 0
        &&
        <>
          <ul className={`form-search__select-list ${isActiveForm? '' : 'visually-hidden'}`} style={{zIndex: 1}}>
            {
              guitars.map((item: Guitar) =>
                <SearchItem key={`${nanoid()}-search-item`} guitar={item} handleLinkClick={resetSearch}/>)
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);
