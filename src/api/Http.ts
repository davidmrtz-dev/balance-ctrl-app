import axios from 'axios';

type HttpResult = {
  status: number,
  data: any,
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  },
  validateStatus: (status: number): boolean => {
    return status < 400;
  }
});

axiosClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error.response?.data);
});


export const get = async (path: string, data?: any, headers?: any, signal?: AbortSignal): Promise<HttpResult> => {
  return axiosClient.get(path, { params: data, headers, signal });
};

export const post = async (path: string, data?: any, headers?: any): Promise<HttpResult> => {
  return axiosClient.post(path, data, headers);
};

export const put = async (path: string, data?: any, headers?: any): Promise<HttpResult> => {
  return axiosClient.put(path, data, headers);
};

export const destroy = async (path: string, data?: any, headers?: any): Promise<HttpResult> => {
  return axiosClient.delete(path, { data, headers });
};
