import {LANGUAGE} from '../constants/constants';

export const replaceImagePath = (src: string): string => {
  const Paths = {
    Server: 'guitar',
    Local: 'content/catalog-product',
  };

  return `/${src.replace(Paths.Server, Paths.Local)}`;
};

export const formatPrice = (price: number): string => `${price.toLocaleString(LANGUAGE)} P`;
