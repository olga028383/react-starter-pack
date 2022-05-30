import React, {MouseEvent} from 'react';
import {Link} from 'react-router-dom';

function ButtonUp(): JSX.Element {

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <Link className='button button--up button--red-border button--big reviews__up-button' to='#' onClick={handleLinkClick}>
      Наверх
    </Link>
  );
}

export default ButtonUp;
