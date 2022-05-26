import {LANGUAGE, SHOW_PAGE} from '../constants/constants';

export const replaceImagePath = (src: string): string => {
  const Paths = {
    Server: 'guitar',
    Local: 'content/catalog-product',
  };

  return `/${src.replace(Paths.Server, Paths.Local)}`;
};

export const formatPrice = (price: number): string => `${price.toLocaleString(LANGUAGE).replace(',', ' ')} ₽`;

export const getPagesCount = (countProducts: number): number => Math.ceil(countProducts / SHOW_PAGE);

export const getAdaptedValue = (name: string | number, data: any): string => {
  if(data === ''){
    return '';
  }
  return data.has(name) ? data.get(name) : '';
};
