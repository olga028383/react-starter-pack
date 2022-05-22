import React from 'react';

type RatingFieldType = {
  index: number,
  value: number,
  handleRatingChange: any
}

function RatingField({index, value, handleRatingChange}: RatingFieldType): JSX.Element {
  return (
    <>
      <input className="visually-hidden" id={`star-${index}`} type="radio" name="rating" value={index} checked={value === index} onChange={handleRatingChange}/>
      <label className="rate__label" htmlFor={`star-${index}`}></label>
    </>
  );
}

export default RatingField;
