import React from 'react';
import {Guitar} from '../../types/data';
import {
  formatPrice, getAdaptedValue, replaceImagePath
} from '../../utils/utils';
import {GuitarType} from '../../constants/adapters';

type Props = {
  guitar: Guitar,
  onButtonClick: () => void,
  setActive: () => void,
}

function DeleteFromCart({guitar, onButtonClick, setActive}: Props): JSX.Element {
  const {name, previewImg, price, stringCount, vendorCode, type} = guitar;
  const imageFormatted = replaceImagePath(previewImg);

  return (
    <>
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
      <div className="modal__info">
        <img src={imageFormatted.winPath} srcSet={`${imageFormatted.macPath} 2x`} width="67" height="137" alt={name}/>
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
          <p className="modal__product-params">{getAdaptedValue(type, GuitarType)} {stringCount} струнная</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span><span className="modal__price">{formatPrice(price)}</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="button button--small modal__button" onClick={onButtonClick}>Удалить товар</button>
        <button className="button button--black-border button--small modal__button modal__button--right" onClick={setActive}>Продолжить покупки</button>
      </div>
    </>
  );
}

export default DeleteFromCart;
