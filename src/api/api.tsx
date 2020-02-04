import axios from 'axios';

export let BASE_URL: string | undefined;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = process.env['DEVELOPMENT_URL'];
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = process.env['PRODUCTION_URL'];
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
