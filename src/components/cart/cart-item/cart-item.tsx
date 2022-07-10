import React, {useState, useEffect, ChangeEvent} from 'react';
import {Guitar} from '../../../types/data';
import {connect} from 'react-redux';
import './cart-item.css';
import {
  changeCountProductInCart, formatPrice, getAdaptedValue, getCountInCart,
  replaceImagePath
} from '../../../utils/utils';
import {GuitarType} from '../../../constants/adapters';
import {getCartGuitars} from '../../../store/cart/selectors';
import {AppDispatch, State} from '../../../types/state';
import {setCartGuitars, setCountGuitars} from '../../../store/action';
import Modal from '../../modal/modal';
import DeleteFromCart from '../../delete-from-cart/delete-from-cart';

const CountGuitar = {
  Max: 99,
  Min: 0,
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetGuitars: (guitars: Guitar[]) => {
    dispatch(setCartGuitars(guitars));
    dispatch(setCountGuitars(getCountInCart(guitars)));
  },
});

const mapStateToProps = (state: State) => ({
  guitars: getCartGuitars(state),
});

type Props = {
  guitar: Guitar,
  guitars?: Guitar[],
  onSetGuitars?: (guitars: Guitar[]) => void,
}

function CartItem({guitar, guitars = [], onSetGuitars}: Props): JSX.Element {
  const {name, previewImg, price, stringCount, vendorCode, type, countInCart = 0} = guitar;
  const imageFormatted = replaceImagePath(previewImg);
  const [count, setCount] = useState(countInCart);
  const [modalActive, setModalActive] = useState(false);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setCount(Number(target.value));
  };

  const handlePlusChange = () => {
    const currentCount = count + 1;
    setCount(currentCount);
  };

  const handleMinusChange = () => {
    const currentCount = count - 1;

    if (currentCount === CountGuitar.Min) {
      setModalActive(true);
      setCount(1);
      return;
    }

    setCount(currentCount);
  };

  const handleDeleteGuitarClick = () => {
    setModalActive(true);
  };

  const onDeleteClick = () => {
    if (!onSetGuitars) {
      return;
    }
    setCount(0);
    onSetGuitars(changeCountProductInCart(guitars, guitar, -1));
  };

  useEffect(() => {
    if (!onSetGuitars || count === countInCart || count === CountGuitar.Min) {
      return;
    }

    if (count > CountGuitar.Max) {
      setCount(CountGuitar.Max);
      onSetGuitars(changeCountProductInCart(guitars, guitar, CountGuitar.Max));
      return;
    }

    onSetGuitars(changeCountProductInCart(guitars, guitar, count));

  }, [count]);

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleDeleteGuitarClick}>
        <span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={imageFormatted.winPath} srcSet={`${imageFormatted.macPath} 2x`} width="55" height="130" alt={name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{getAdaptedValue(type, GuitarType)} {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{formatPrice(price)}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={handleMinusChange}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={`${count}`} value={count} id="2-count" name="2-count" max="99" onChange={handleInputChange}/>
        <button className="quantity__button" aria-label="Увеличить количество" onClick={handlePlusChange}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(price * count)}</div>

      <Modal active={modalActive} setActive={setModalActive} additionalClass="modal-cart--delete">
        <DeleteFromCart guitar={guitar as Guitar} onButtonClick={onDeleteClick} setActive={() => setModalActive(false)}/>
      </Modal>
    </div>
  );
}

export {CartItem};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
