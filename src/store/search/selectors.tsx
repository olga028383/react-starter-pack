import {NameSpace} from '../reducer';

export const getSearchWord = (state: any): string => state[NameSpace.SEARCH].searchWord;
export const getSearchGuitars = (state: any): string => state[NameSpace.SEARCH].searchWord ? state[NameSpace.SEARCH].guitars : [];
