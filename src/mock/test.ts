export const ReviewTest = {
  id: '1',
  userName: 'Вася',
  advantage: 'Хорошая гитара',
  disadvantage: 'Но форма не очень',
  comment: 'В целом впечатление хорошее',
  rating: 5,
  createAt: '2021-10-28T12:32:16.934Z',
  guitarId: 35,
};

export const ReviewPostTest = {
  userName: 'Вася',
  advantage: 'Хорошая гитара',
  disadvantage: 'Но форма не очень',
  comment: 'В целом впечатление хорошее',
  rating: 5,
  guitarId: 35,
};

export const Guitar = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
  comments: [ReviewTest],
};

export const GuitarCart = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
  comments: [ReviewTest],
  countInCart: 1,
};
export const FakeStore = {
  DATA: {loadData: 'SUCCESS', guitars: [Guitar, Guitar, Guitar], priceMin: 300, priceMax: 35000},
  APPLICATION: {serverError: '', currentPage: 1, pagesTotal: 3, api: jest.fn()},
  SORT: {sort: '', order: ''},
  FILTER: {types: ['electric'], numberStrings: [4], priceMin: 0, priceMax: 0},
  SEARCH: {searchWord: 'Че', guitars: [Guitar, Guitar, Guitar]},
  CART: {sale: 0, coupon: null, countGuitars: 0, guitars: []},
};


