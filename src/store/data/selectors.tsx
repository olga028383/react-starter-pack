import {NameSpace} from '../reducer';
import {Guitar} from '../../types/data';

export const getIsLoadData = (state: any): boolean => state[NameSpace.DATA].isDataLoaded;

export const getGuitars = (state: any): Guitar[] => state[NameSpace.DATA].guitars;

