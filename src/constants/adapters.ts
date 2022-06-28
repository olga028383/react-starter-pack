export const GuitarType = new Map([
  ['electric', 'Электрогитара'],
  ['ukulele', 'Укулеле'],
  ['acoustic', 'Акустическая'],
]);

export const GuitarFilterType = new Map([
  ['electric', 'Электрогитары'],
  ['ukulele', 'Укулеле'],
  ['acoustic', 'Акустические гитары'],
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

