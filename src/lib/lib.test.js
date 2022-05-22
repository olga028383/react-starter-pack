import {getDataReviewFormat} from './lib';

describe('testing methods that use libraries', () => {
  it('should return the date format used in reviews', () => {
    expect(getDataReviewFormat('2019-05-08T14:13:56.569Z', 'YYYY-MM-DD')).toBe('2019-05-08');
  });
});
