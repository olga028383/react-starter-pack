import React from 'react';
import {connect} from 'react-redux';
import {Guitar} from '../../types/data';
import {
  changeCountProductInCart, formatPrice, getAdaptedValue, getCountInCart,
  replaceImagePath
} from '../../utils/utils';
import {GuitarType} from '../../constants/adapters';
import {AppDispatch, State} from '../../types/state';
import {setCartGuitars, setCountGuitars} from '../../store/action';
import {getCartGuitars} from '../../store/cart/selectors';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetGuitars: (guitars: Guitar[]) => {
    dispatch(setCartGuitars(guitars));
    dispatch(setCountGuitars(getCountInCart(guitars)));
  },
});

const mapStateToProps = (state: State) => ({
  cartGuitars: getCartGuitars(state),
});

type Props = {
  guitar: Guitar,
  cartGuitars?: Guitar[],
  setModalSuccessActive: () => void,
  onSetGuitars?: (guitar: Guitar[]) => void,
}

function AddCart({guitar, cartGuitars = [], setModalSuccessActive, onSetGuitars}: Props): JSX.Element {
  const {name, previewImg, price, stringCount, vendorCode, type} = guitar;
  const imageFormatted = replaceImagePath(previewImg);

  const handleButtonClick = () => {
    if(onSetGuitars) {
      onSetGuitars(changeCountProductInCart(cartGuitars, guitar));
    }
    setModalSuccessActive();
  };

  return (
    <>
      <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
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
        <button className="button button--red button--big modal__button modal__button--add" onClick={handleButtonClick}>Добавить в корзину</button>
      </div>
    </>
  );
}

export {AddCart};
export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
