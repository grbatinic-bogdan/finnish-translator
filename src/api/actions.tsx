import { apiClient } from 'src/api/api';

interface ITranslateWord {
  baseLanguageValue: string;
  translationValue: string;
}

export const getWord = async (): Promise<any> => {
  try {
    const response = await apiClient.get<ITranslateWord>('/random-translation');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    throw new Error('Something went wrong');
  }
};
