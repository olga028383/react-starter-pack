import {ApiRoute, SHOW_PAGE} from '../constants/constants';
import {loadGuitars, setServerError, setTotalPages} from './action';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {Guitar, Review, ReviewPost} from '../types/data';
import {getPagesCount} from '../utils/utils';

export const fetchGuitars = (page: number): any => (dispatch: AppDispatch, _getState: State, api: AxiosInstance) => (
  api.get(`${ApiRoute.Guitars}?_start=${SHOW_PAGE * page - SHOW_PAGE}&_limit=${SHOW_PAGE}&_embed=comments`)
    .then(({data, headers}) => {
      dispatch(setTotalPages(getPagesCount(Number(headers['x-total-count']))));
      dispatch(loadGuitars(data.filter((item: Guitar) => Object.keys(item).includes('name'))));
    })
    .catch((err) => dispatch(setServerError(err.message)))
);

export const searchGuitars = (name: string, api: AxiosInstance): Promise<Guitar[]> => (
  api.get(`${ApiRoute.Guitars}?name_like=${name}`)
    .then(({data}) => data)
);

export const fetchGuitar = (id: string, api: AxiosInstance): Promise<Guitar> => (
  api.get(`${ApiRoute.Guitars}/${id}?_embed=comments`)
    .then(({data}) => data)
);

export const fetchComments = (guitarId: string, api: AxiosInstance): Promise<Review[]> => (
  api.get(`${ApiRoute.Guitars}/${guitarId}/${ApiRoute.Comments}`)
    .then(({data}) => data)
);

export const sendComment = (comment: ReviewPost, api: AxiosInstance): Promise<Review> => (
  api.post(ApiRoute.Comments, comment)
    .then(({data}) => data)
);
