import {NameSpace} from '../reducer';
import {AxiosInstance} from 'axios';

export const getCurrentPage = (state: any): number => state[NameSpace.APPLICATION].currentPage;

export const getServerError = (state: any): string => state[NameSpace.APPLICATION].serverError;

export const getTotalPages = (state: any): number => state[NameSpace.APPLICATION].totalPages;

export const getApi = (state: any): AxiosInstance => state[NameSpace.APPLICATION].api;
