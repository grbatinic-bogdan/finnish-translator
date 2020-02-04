import React, { useState, useEffect } from 'react';

interface ITranslate {
  baseLanguageValue: string;
  hiddenTranslationValue: string;
  reset: boolean;
}

export const Translate: React.FunctionComponent<ITranslate> = ({
  baseLanguageValue,
  hiddenTranslationValue,
  reset,
}) => {
  const [translationValue, setTranslationValue] = useState('');
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    setTranslationValue('');
    setIsTranslated(false);
  }, [reset]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const currentIndex = inputValue.length - 1;
    let lettersMatch = false;
    if (currentIndex >= 0) {
      const translationLetter = inputValue[currentIndex];
      const hiddenTranslationLetter = hiddenTranslationValue[currentIndex];
      lettersMatch = translationLetter === hiddenTranslationLetter;
    }

    if (lettersMatch || inputValue === '') {
      setTranslationValue(inputValue);

      if (inputValue === hiddenTranslationValue) {
        setIsTranslated(true);
      }
    }
  };

  const borderName = isTranslated ? 'b--green' : 'b--light-silver';

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
          className={`ba ${borderName}`}
        />
      </div>
    </>
  );
};
