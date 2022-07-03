export const GuitarType = new Map([
  ['acoustic', 'Акустическая'],
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
]);

export const GuitarFilterType = new Map([
  ['acoustic', 'Акустические гитары'],
  ['electric', 'Электрогитары'],
  ['ukulele', 'Укулеле'],
]);

export enum QueryParamsTypeFilter {
  priceMin = 'price_gte',
  priceMax = 'price_lte',
  numberStrings = 'stringCount',
  types = 'type',
}

export enum QueryParamsTypeSort {
  sort = '_sort',
  order = '_order',
}

export const RatingName = new Map([
  ['1', 'Очень плохо'],
  ['2', 'Плохо'],
  ['3', 'Нормально'],
  ['4', 'Хорошо'],
  ['5', 'Отлично'],
]);

