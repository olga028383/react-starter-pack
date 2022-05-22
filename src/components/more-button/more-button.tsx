import React from 'react';

function MoreButton({handleClickButton}: {handleClickButton: any}): JSX.Element {
  return (
    <button className="button button--medium reviews__more-button" onClick={handleClickButton}>Показать еще отзывы</button>
  );
}
export default MoreButton;
