import {LANGUAGE, SHOW_PAGE} from '../constants/constants';

export const replaceImagePath = (src: string): { winPath: string, macPath: string } => {
  const DataForReplace = {
    Server: 'guitar',
    Local: 'content/catalog-product',
    WinExtension: '.jpg',
    MacExtension: '@2x.jpg',
  };

  const frontPath = `/${src.replace(DataForReplace.Server, DataForReplace.Local)}`;
  return {winPath: frontPath, macPath: frontPath.replace(DataForReplace.WinExtension, DataForReplace.MacExtension)};
};

export const formatPrice = (price: number): string => `${price.toLocaleString(LANGUAGE).replace(',', ' ')} ₽`;

export const getPagesCount = (countProducts: number): number => Math.ceil(countProducts / SHOW_PAGE);

export const getAdaptedValue = (name: string | number, data: any): string => {
  if (data === '') {
    return '';
  }
  return data.has(name) ? data.get(name) : '';
};
