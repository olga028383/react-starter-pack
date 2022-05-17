import React from 'react';
import {OFFSET_ONE} from '../../constants/constants';

const MAX_RATING = 5;

const createDataRate = (rate: number): Array<string> => (
  new Array(MAX_RATING).fill(null).map((item, id) => {
    if ((Number.isInteger(rate) && id < rate) || (!Number.isInteger(rate) && id < Math.floor(rate))) {
      return 'icon-full-star';
    }

    if (!Number.isInteger(rate) && id === Math.ceil(rate - OFFSET_ONE)) {
      return 'icon-star-half';
    }

    return 'icon-star';
  }));

type RatingType = {
  rate: number,
  widthIcon: string,
  heightIcon: string,
  comments?: number,
}

function Rating({rate, widthIcon, heightIcon, comments = 7}: RatingType): JSX.Element {
  return (
    <div className="rate product-container__rating">
      {createDataRate(rate).map((item, id) => {
        const keyValue = `${item}-${id}`;
        return (
          <svg key={keyValue} width={widthIcon} height={heightIcon} aria-hidden="true">
            <use xlinkHref={`#${item}`}></use>
          </svg>);
      })}
      <p className="visually-hidden">Рейтинг: Хорошо</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments}</p>
    </div>
  );
}

export default Rating;

