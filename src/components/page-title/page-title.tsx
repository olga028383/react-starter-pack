import React from 'react';

type PageTitleType = {
  text: string,
}

function PageTitle({text}: PageTitleType): JSX.Element {
  return (
    <h1 className='page-content__title title title--bigger'>{text}</h1>
  );
}

export default PageTitle;
