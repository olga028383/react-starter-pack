import React from 'react';

function PageTitle({text}: {text: string}): JSX.Element {
  return (
    <h1 className='page-content__title title title--bigger'>{text}</h1>
  );
}

export default PageTitle;
