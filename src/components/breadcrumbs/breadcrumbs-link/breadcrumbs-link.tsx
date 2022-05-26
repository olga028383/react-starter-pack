import React from 'react';
import {Link} from 'react-router-dom';

type BreadcrumbsLink = {
  link: string,
  text: string,
}

function BreadcrumbsLink({link, text}: BreadcrumbsLink): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link to={link} className="link">{text}</Link>
    </li>
  );
}

export default BreadcrumbsLink;
