import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants/constants';

type LogoType = {
  additionalClass?: string
}

function Logo({additionalClass}: LogoType): JSX.Element {
  return (
    <Link to={AppRoute.ROOT} className={`${additionalClass} logo`}>
      <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
    </Link>
  );
}

export default Logo;
