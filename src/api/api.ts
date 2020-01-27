import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
