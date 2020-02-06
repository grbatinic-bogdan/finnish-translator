import React, { useState, useEffect } from 'react';
import { Translate } from 'src/components/Translate';
import 'tachyons/css/tachyons.css';
import { getWord } from 'src/api/actions';

export interface ITranslate {
  baseLanguageValue: string;
  hiddenTranslationValue: string;
}

const App = () => {
  const [translation, setTranslation] = useState({} as ITranslate);
  const [serverError, setServerError] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    try {
      const fetchTranslationData = async () => {
        await getWord()
          .then(data => {
            setTranslation({
              baseLanguageValue: data.baseLanguageValue,
              hiddenTranslationValue: data.translationValue,
            });
            setShouldReset(false);
          })
          .catch(err => setServerError(err.message));
      };
      setShouldReset(true);
      fetchTranslationData();
    } catch (error) {
      throw new Error("Couldn't fetch translation data from the server");
    }
  }, [fetchAgain]);

  const errorFromServer = serverError ? <div>{serverError}</div> : null;

  const onNewWordClick = () => {
    setFetchAgain(!fetchAgain);
  };

  return (
    <div>
      <Translate shouldReset={shouldReset} translate={translation} />
      <button type="button" onClick={onNewWordClick}>
        New Word
      </button>
      {errorFromServer}
    </div>
  );
};

export default App;
