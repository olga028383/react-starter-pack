import {NameSpace} from '../reducer';
import {Guitar} from '../../types/data';
import {LoadStatus} from '../../constants/constants';

export const getLoadData = (state: any): boolean => state[NameSpace.DATA].loadData;

export const getIsLoadData = (state: any): boolean => state[NameSpace.DATA].loadData === LoadStatus.SUCCESS;

export const getGuitars = (state: any): Guitar[] => state[NameSpace.DATA].guitars;

export const getPriceMin = (state: any): number => state[NameSpace.DATA].priceMin;

export const getPriceMax = (state: any): number => state[NameSpace.DATA].priceMax;
