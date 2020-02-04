import { apiClient } from 'src/api/api';

interface ITranslateWord {
  baseLanguageValue: string;
  hiddenTranslationValue: string;
}

export const getWord = async (): Promise<any> => {
  try {
    const response = await apiClient.get<ITranslateWord>('/random-translation');
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error('Something went wrong');
  }
};
