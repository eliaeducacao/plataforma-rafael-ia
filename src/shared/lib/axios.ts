import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.eliaeducacao.com.br',
});

api.interceptors.request.use(request => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('x-auth-token='))
    ?.split('=')[1];

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
