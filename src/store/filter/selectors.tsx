import {NameSpace} from '../reducer';

export const getFilterPriceMin = (state: any): number => state[NameSpace.FILTER].priceMin;

export const getFilterPriceMax = (state: any): number => state[NameSpace.FILTER].priceMax;

export const getType = (state: any): string[] => state[NameSpace.FILTER].types;

export const getNumberStrings = (state: any): number[] => state[NameSpace.FILTER].numberStrings;

export const getAvailableNumberString = (state: any): number[] => {
  const availableStrings: number[] = [];
  const defaultStringData: {
    electric: number[],
    ukulele: number[],
    acoustic: number[],
  } = {
    'electric': [4, 6, 7],
    'ukulele': [4],
    'acoustic': [6, 7, 12],
  };
  state[NameSpace.FILTER].types.forEach((type: 'electric'|'ukulele'|'acoustic') => {
    const strings = defaultStringData[type];
    availableStrings.push(...strings);
  });
  return [...new Set(availableStrings)];
};
