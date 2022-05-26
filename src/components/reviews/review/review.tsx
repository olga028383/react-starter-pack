import React from 'react';
import {Review as ReviewData} from '../../../types/data';
import Rating from '../../rating/rating';
import {getDataReviewFormat} from '../../../lib/lib';

type ReviewType = {
  review: ReviewData
}

function Review({review}: ReviewType): JSX.Element {
  const {userName, createAt, rating, advantage, disadvantage, comment} = review;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{getDataReviewFormat(createAt, 'DD MMMM, YYYY')}</span>
      </div>

      <Rating rate={rating} widthIcon='16' heightIcon='16'/>

      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default Review;
