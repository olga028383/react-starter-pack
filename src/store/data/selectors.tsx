import {NameSpace} from '../reducer';
import {Guitar} from '../../types/guitar';
import {OFFSET_PAGE, SHOW_PAGE} from '../../constants/constants';

export const getIsLoadData = (state: any): boolean => state[NameSpace.DATA].isDataLoaded;

export const getGuitars = (state: any): Guitar[] => state[NameSpace.DATA].guitars;

export const getTotalPages = (state: any): number => state[NameSpace.DATA].guitars.length;

export const getGuitarsForCurrentPage = (state: any): Guitar[] => {
  const currentPage = state[NameSpace.APPLICATION].currentPage;
  const offset = currentPage - OFFSET_PAGE;
  const offsetPages = offset * SHOW_PAGE;
  return state[NameSpace.DATA].guitars.slice(offsetPages, SHOW_PAGE * currentPage);
};
