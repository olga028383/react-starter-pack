import {Guitar} from '../../types/data';
import {formatPrice, replaceImagePath} from '../../utils/utils';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants/constants';
import Rating from '../rating/rating';

type typePropsGuitarCart = {
  guitar?: any,
}

function GuitarCard({guitar}: typePropsGuitarCart ): JSX.Element {
  const {id, name, previewImg, price, rating}: Guitar = guitar;
  const imageFormatted = replaceImagePath(previewImg);
  return (
    <div className="product-card">
      <img src={imageFormatted} srcSet={`${imageFormatted}@2x.jpg 2x`} width="75" height="190" alt={name}/>
      <div className="product-card__info">

        <Rating rate={rating} widthIcon='12' heightIcon='11' comments={guitar.comments.length}/>

        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.CATALOG}/${id}`}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
