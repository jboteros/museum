import axios, { AxiosError } from 'axios';

export const instanceAxios = axios.create({
  baseURL: 'https://api.artic.edu/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use(async req => {
  return req;
});

instanceAxios.interceptors.response.use(
  res => {
    return res;
  },
  async (error: AxiosError) => {
    return handleError(error);
  },
);

const handleError = (e: AxiosError<any>) => {
  if (e.response) {
    let code = '';
    let message = '';

    if (e.response.data && e.response.data.status) {
      code = e.response.data.status;
    } else if (e.response.status) {
      code = e.response.status.toString();
    }

    if (e.response.data && e.response.data.message) {
      console.log('[Response Error Message]: ' + e.response.data.message);
      message = e.response.data.message;
    }

    const error = {
      error: e,
      code,
      message,
    };

    return Promise.reject(error);
  } else if (e.request) {
    // client never received a response, or request never left
    console.log('request error ' + e);
  } else {
    console.log('axios error ' + e);
  }

  throw e;
};
