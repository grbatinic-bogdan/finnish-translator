import React, { useState, useEffect } from 'react';
import { Translate } from 'src/components/Translate';
import 'tachyons/css/tachyons.css';
import { getWord } from 'src/api/actions';

const App = () => {
  const [baseLanguageValue, setBaseLanguageValue] = useState('');
  const [hiddenTranslationValue, setHiddenTranslationValue] = useState('');
  const [serverError, setServerError] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    try {
      const fetchTranslationData = async () => {
        await getWord()
          .then(data => {
            setBaseLanguageValue(data.baseLanguageValue);
            setHiddenTranslationValue(data.translationValue);
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

  return (
    <div>
      <Translate
        shouldReset={shouldReset}
        baseLanguageValue={baseLanguageValue}
        hiddenTranslationValue={hiddenTranslationValue}
      />
      <button
        type="button"
        onClick={() => {
          setFetchAgain(!fetchAgain);
        }}
      >
        New Word
      </button>
      {errorFromServer}
    </div>
  );
};

export default App;
