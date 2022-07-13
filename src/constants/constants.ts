export const ApiRoute = {
  Guitars: '/guitars',
  Comments: 'comments',
  Coupons: '/coupons',
};

export const AppRoute = {
  CATALOG: '/catalog',
  PRODUCT: '/product',
  CATALOG_PAGE: '/catalog/page/:id',
  CATALOG_DETAIL: '/product/:id',
  CATALOG_DETAIL_TAB: '/product/:id/:tab',
  CART: '/cart',
  ROOT: '/',
};

export const SortParamApi = {
  Sort: '_sort',
  Order: '_order',
};

export const SortKey = {
  Sort: 'sort',
  Order: 'order',
};

export const SortName = {
  Price: 'price',
  Rating: 'rating',
};

export const FilterKey = {
  PriceMin: 'priceMin',
  PriceMax: 'priceMax',
  Types: 'types',
  NumberStrings: 'numberStrings',
};

export const OrderName = {
  Asc: 'asc',
  Desc: 'desc',
};

export const SHOW_PAGE = 9;

export const OFFSET_ONE = 1;

export const ONE_PAGE = 1;

export const LANGUAGE = 'ru';

export const DELAY = 700;

export const STRINGS_DATA = [4, 6, 7, 12];

export enum LoadStatus {
  INIT = 'INIT',
  START = 'START',
  SUCCESS = 'SUCCESS',
}

export enum Message {
  Catalog = 'Каталог',
  Cart = 'Корзина',
  NotGuitars = 'Нет гитар',
  CartEmpty = 'Пока что в корзине ничего нет'
}

export const DEFAULT_DATA_STRINGS = {
  'electric': [4, 6, 7],
  'ukulele': [4],
  'acoustic': [6, 7, 12],
};

export const TYPE_DATA = ['acoustic', 'electric', 'ukulele'];
