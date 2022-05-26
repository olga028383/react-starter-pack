import React from 'react';
import {Guitar} from '../../../types/data';

type DescriptionType = {
  guitar: Guitar
}

function Description({guitar}: DescriptionType): JSX.Element {
  const {description} = guitar;
  return (
    <p className="tabs__product-description">{description}</p>
  );
}

export default Description;
