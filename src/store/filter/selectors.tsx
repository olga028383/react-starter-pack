import {NameSpace} from '../reducer';
import {DEFAULT_DATA_STRINGS} from '../../constants/constants';

export const getFilterPriceMin = (state: any): number => state[NameSpace.FILTER].priceMin;

export const getFilterPriceMax = (state: any): number => state[NameSpace.FILTER].priceMax;

export const getType = (state: any): string[] => state[NameSpace.FILTER].types;

export const getNumberStrings = (state: any): number[] => state[NameSpace.FILTER].numberStrings;

export const getAvailableNumberString = (state: any): number[] => {
  const availableStrings: number[] = [];
  state[NameSpace.FILTER].types.forEach((type: 'electric'|'ukulele'|'acoustic') => {
    const strings = DEFAULT_DATA_STRINGS[type];
    availableStrings.push(...strings);
  });
  return [...new Set(availableStrings)];
};

export const getIsActiveFilter = (state: any): boolean => Boolean(...Object.entries(state[NameSpace.FILTER]).filter((item: any) => Number(item[1]) > 0 || item[1].length > 0));
