import React, {useState, ChangeEvent} from 'react';
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
import {async} from "q";

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
  const [priceTotal] = useState(price * count);
  const [modalActive, setModalActive] = useState(false);

  const setGuitars = (currentCount: number) => {
    if (!onSetGuitars) {
      return;
    }

    if (currentCount > CountGuitar.Max) {
      setCount(CountGuitar.Max);
      onSetGuitars(changeCountProductInCart(guitars, guitar, CountGuitar.Max));
      return;
    }

    if(currentCount !== CountGuitar.Min) {
      onSetGuitars(changeCountProductInCart(guitars, guitar, currentCount));
    }

    if(currentCount === 0 ){
      setModalActive(true);
      //onSetGuitars(changeCountProductInCart(guitars, guitar, 1));
    }
  };

  const onDeleteClick = () => {
    if (!onSetGuitars) {
      return;
    }
    setCount(0);
    onSetGuitars(changeCountProductInCart(guitars, guitar, -1));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setCount(Number(target.value));
  };

  const handlePlusChange = () => {
    const currentCount = count + 1;
    setCount(currentCount);
    setGuitars(currentCount);
  };

  const handleMinusChange = () => {
    const currentCount = count - 1;

    if (currentCount === CountGuitar.Min) {
      setModalActive(true);
      setCount(1);
      return;
    }

    setCount(currentCount);
    setGuitars(currentCount);
  };

  const handleDeleteGuitarClick = () => {
    setModalActive(true);
  };

  const handleInputBlur = () => {
    if(count === 0) {
      setGuitars(0);
      return;
    }

    setGuitars(count);
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" data-testid="remove" aria-label="Удалить" onClick={handleDeleteGuitarClick}>
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
        <button className="quantity__button" aria-label="Уменьшить количество" data-testid="minus" onClick={handleMinusChange}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={`${count}`} data-testid="input" value={count === 0 ? '' : count} id="2-count" name="2-count" max="99" onChange={handleInputChange} onBlur={handleInputBlur}/>
        <button className="quantity__button" aria-label="Увеличить количество" data-testid="plus" onClick={handlePlusChange}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(priceTotal)}</div>

      <Modal active={modalActive} setActive={setModalActive} additionalClass="modal-cart--delete">
        <DeleteFromCart guitar={guitar as Guitar} onButtonClick={onDeleteClick} setActive={() => setModalActive(false)}/>
      </Modal>
    </div>
  );
}

export {CartItem};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
