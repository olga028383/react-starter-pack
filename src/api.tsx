import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy';
const TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
  });

  const onSuccess = (response: any) => response;

  const onFail = (err: any) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};


