import React from 'react';
import {Link} from 'react-router-dom';
import './breadcrumbs-link.css';

type BreadcrumbsLinkType = {
  link: string,
  text: string,
}

function BreadcrumbsLink({link, text}: BreadcrumbsLinkType): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link to={link} className="link">{text}</Link>
    </li>
  );
}

export default BreadcrumbsLink;
