import {ApiRoute} from '../constants/constants';
import {loadGuitars, setServerError} from './action';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {Guitar} from '../types/guitar';

export const fetchGuitars = (): any => (dispatch: AppDispatch, _getState: State, api: AxiosInstance) => (
  api.get(ApiRoute.Guitars)
    .then(({data}) => dispatch(loadGuitars(data.filter((item: Guitar) => Object.keys(item).includes('name')))))
    .catch((err) => dispatch(setServerError(err.message)))
);

