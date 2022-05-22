import React from 'react';
import {Guitar} from '../../../types/data';

function Description({guitar}: { guitar: Guitar }): JSX.Element {
  const {description} = guitar;
  return (
    <p className="tabs__product-description">{description}</p>
  );
}

export default Description;