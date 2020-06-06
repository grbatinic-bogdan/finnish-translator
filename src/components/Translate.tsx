import React, { useState, useEffect } from 'react';
import { ITranslateWord } from 'src/api/actions';

interface ITranslateProps {
  translate: ITranslateWord;
}

export const Translate: React.FunctionComponent<ITranslateProps> = ({ translate }) => {
  const [translationValue, setTranslationValue] = useState('');
  const [isTranslated, setIsTranslated] = useState(false);
  const { translationValues, baseLanguageValue } = translate;
  const hiddenTranslationValue = translationValues[0];
  const [errorCounter, setErrorCounter] = useState(0);

  useEffect(() => {
    setTranslationValue('');
    setIsTranslated(false);
    setErrorCounter(0);
  }, [translate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const currentIndex = inputValue.length - 1;
    let lettersMatch = false;
    if (currentIndex >= 0) {
      const translationLetter = inputValue[currentIndex];
      const hiddenTranslationLetter = hiddenTranslationValue[currentIndex];
      lettersMatch = translationLetter === hiddenTranslationLetter;
      if (!lettersMatch) {
        setErrorCounter(errorCounter + 1);
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
        <p>Number of errors you made {errorCounter}</p>
      </div>
    </>
  );
};
