import React, {ChangeEvent} from 'react';

type RatingFieldType = {
  index: number,
  value: number,
  handleRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void,
}

function RatingField({index, value, handleRatingChange}: RatingFieldType): JSX.Element {
  return (
    <>
      <input className="visually-hidden" id={`star-${index}`} type="radio" name="rating" value={index} onChange={handleRatingChange}/>
      <label className="rate__label" htmlFor={`star-${index}`}></label>
    </>
  );
}

export default RatingField;
