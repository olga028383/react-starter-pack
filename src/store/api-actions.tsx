import {ApiRoute} from '../constants/constants';
import {loadGuitars, setServerError} from './action';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {Guitar, ReviewPost} from '../types/data';

export const fetchGuitars = (): any => (dispatch: AppDispatch, _getState: State, api: AxiosInstance) => (
  api.get(ApiRoute.Guitars)
    .then(({data}) => dispatch(loadGuitars(data.filter((item: Guitar) => Object.keys(item).includes('name')))))
    .catch((err) => dispatch(setServerError(err.message)))
);

export const fetchComments = (guitarId: string, api: AxiosInstance): Promise<number> => (
  api.get(`${ApiRoute.Guitars}/${guitarId}/${ApiRoute.Comments}`)
    .then(({data}) => data)
);

export const sendComment = (comment: ReviewPost, api: AxiosInstance): Promise<number> => (
  api.post(ApiRoute.Comments, comment)
    .then(({data}) => data)
);
