import {Guitar} from '../../types/guitar';
import {formatPrice, replaceImagePath} from '../../utils/utils';

type typePropsGuitarCart = {
  guitar?: any,
}
function GuitarCard({guitar}: typePropsGuitarCart ): JSX.Element {
  const {name, previewImg, price, stringCount}: Guitar = guitar;
  const imageFormatted = replaceImagePath(previewImg);
  return (
    <div className="product-card">
      <img src={imageFormatted} srcSet={`${imageFormatted}@2x.jpg 2x`} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{stringCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
