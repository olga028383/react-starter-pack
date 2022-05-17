import React from 'react';
import {Link} from 'react-router-dom';

function BreadcrumbsLink({link, text}: { link: string, text: string }): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link to={link} className="link">{text}</Link>
    </li>
  );
}

export default BreadcrumbsLink;
