import {NameSpace} from '../reducer';
import {Guitar} from '../../types/data';

export const getCoupon = (state: any): string | null => state[NameSpace.CART].coupon;
export const getCartGuitars = (state: any): Guitar[] => state[NameSpace.CART].guitars;
export const getCountGuitars = (state: any): number => state[NameSpace.CART].countGuitars;
export const getSalePercent = (state: any): number => state[NameSpace.CART].sale;
