import {NameSpace} from '../reducer';

export const getCurrentPage = (state: any): number => state[NameSpace.APPLICATION].currentPage;

export const getServerError = (state: any): string => state[NameSpace.APPLICATION].serverError;
