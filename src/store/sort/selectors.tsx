import {NameSpace} from '../reducer';

export const getSort = (state: any): string => state[NameSpace.SORT].sort;

export const getOrder = (state: any): string => state[NameSpace.SORT].order;
