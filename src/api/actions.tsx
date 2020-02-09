import { v1ApiClient } from 'src/api/api';

export interface ITranslateWord {
  baseLanguageValue: string;
  translationValue: string;
}

export const getWord = async (): Promise<ITranslateWord> => {
  try {
    const response = await v1ApiClient.get<ITranslateWord>('/random-translation');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Something went wrong');
  }
};
