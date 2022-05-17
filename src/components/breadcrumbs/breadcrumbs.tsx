import React from 'react';
import BreadcrumbsLink from './breadcrumbs-link/breadcrumbs-link';

type Link = {
  to: string,
  text: string,
};

function Breadcrumbs({links}: any): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <BreadcrumbsLink link='/' text='Главная'/>
      {links.map((link: Link) => (<BreadcrumbsLink key={link.to} link={link.to} text={link.text}/>))}
    </ul>
  );
}

export default Breadcrumbs;
