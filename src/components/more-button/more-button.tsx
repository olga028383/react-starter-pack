import React, {MouseEvent} from 'react';

type MoreButtonType = {
  handleClickButton: (evt: MouseEvent<HTMLButtonElement>) => void,
}

function MoreButton({handleClickButton}: MoreButtonType): JSX.Element {
  return (
    <button className="button button--medium reviews__more-button" onClick={handleClickButton}>Показать еще отзывы</button>
  );
}
export default MoreButton;
