import React, {MouseEvent} from 'react';
import {Guitar} from '../../types/data';
import {connect} from 'react-redux';
import './guitar-card.css';
import {checkGuitarInCart, formatPrice, replaceImagePath} from '../../utils/utils';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants/constants';
import Rating from '../rating/rating';
import {getCartGuitars} from '../../store/cart/selectors';
import {State} from '../../types/state';

const mapStateToProps = (state: State) => ({
  cartGuitars: getCartGuitars(state),
});

type Props = {
  guitar: Guitar,
  cartGuitars?: Guitar[],
  onBuyClick: (guitar: Guitar) => void
}

function GuitarCard({guitar, cartGuitars = [], onBuyClick}: Props): JSX.Element {
  const {id, name, previewImg, price, rating, comments = []} = guitar;
  const imageFormatted = replaceImagePath(previewImg);

  const handleModalBuyClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onBuyClick(guitar);
  };
  return (
    <div className="product-card">
      <img src={imageFormatted.winPath} srcSet={`${imageFormatted.macPath} 2x`} width="75" height="190" alt={name}/>
      <div className="product-card__info">

        <Rating rate={rating} widthIcon='12' heightIcon='11' comments={comments.length}/>

        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.PRODUCT}/${id}`}>Подробнее</Link>
        {checkGuitarInCart(cartGuitars, guitar) ?
          <Link className="button button--red-border button--mini button--in-cart" to={AppRoute.CART}>В Корзине</Link>
          :
          <Link className="button button--red button--mini button--add-to-cart" to="#" onClick={handleModalBuyClick}>Купить</Link>}

      </div>
    </div>
  );
}

export {GuitarCard};
export default connect(mapStateToProps)(GuitarCard);
