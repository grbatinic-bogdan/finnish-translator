import axios from 'axios';

export const v1ApiClient = axios.create({
  baseURL: `${process.env['TRANSLATION_API_URL']}/v1`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
