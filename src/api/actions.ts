import { apiClient } from './api';
import { ITranslate } from '../components/Translate';

export const getWord = async (): Promise<ITranslate> => {
  try {
    const response = await apiClient.get<ITranslate>('/translations');
    const word = response.data;
    return word;
  } catch (err) {
    throw new Error(err.message);
  }
};
