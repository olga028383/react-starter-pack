import React, {useEffect} from 'react';
import browserHistory from '../../../browser-history';
import {AppRoute} from '../../../constants/constants';

type Props = {
  setModalActive: () => void,
  setModalSuccessActive: () => void,
}

function AddCartSuccess({setModalActive,  setModalSuccessActive}: Props): JSX.Element {

  useEffect(() => {
    setModalActive();
  }, []);

  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button className="button button--small modal__button" onClick={() => browserHistory.replace(AppRoute.CART)}>Перейти в корзину</button>
        <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => setModalSuccessActive()}>Продолжить покупки</button>
      </div>
    </>
  );
}

export default AddCartSuccess;
