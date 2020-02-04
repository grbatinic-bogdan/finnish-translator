import React, { useState, useEffect } from 'react';
import { ITranslateWord } from 'src/api/actions';

interface ITranslateProps {
  translate: ITranslateWord;
  shouldResetTranslationData: boolean;
}

export const Translate: React.FunctionComponent<ITranslateProps> = ({ translate, shouldResetTranslationData }) => {
  const [translationValue, setTranslationValue] = useState('');
  const [isTranslated, setIsTranslated] = useState(false);
  const { translationValue: hiddenTranslationValue, baseLanguageValue } = translate;
  const [countErrors, setCountErrors] = useState(0);

  useEffect(() => {
    setTranslationValue('');
    setIsTranslated(false);
    setCountErrors(0);
  }, [shouldResetTranslationData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const currentIndex = inputValue.length - 1;
    let lettersMatch = false;
    if (currentIndex >= 0) {
      const translationLetter = inputValue[currentIndex];
      const hiddenTranslationLetter = hiddenTranslationValue[currentIndex];
      lettersMatch = translationLetter === hiddenTranslationLetter;
      if (!lettersMatch) {
        setCountErrors(countErrors + 1);
      }
    }
    if (lettersMatch || inputValue === '') {
      setTranslationValue(inputValue);

      if (inputValue === hiddenTranslationValue) {
        setIsTranslated(true);
      }
    }
  };

  return (
    <>
      <p>Translate: {baseLanguageValue}</p>
      <div>
        <input
          type="text"
          placeholder="translation value"
          name="translationValue"
          value={translationValue}
          onChange={handleInputChange}
          disabled={isTranslated}
          className={`ba ${isTranslated ? 'b--green' : 'b--light-silver'}`}
        />
        {countErrors}
      </div>
    </>
  );
};
