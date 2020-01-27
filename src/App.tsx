import React, { useState, useEffect } from 'react';
import { Translate } from 'src/components/Translate';
import 'tachyons/css/tachyons.css';
import { getWord } from './api/actions';

const App = () => {
  const [baseLanguageValue, setBaseLanguageValue] = useState('');
  const [hiddenTranslationValue, setHiddenTranslationValue] = useState('');
  const [serverError, setServerError] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset(true);
    getWord()
      .then(data => {
        setBaseLanguageValue(data.baseLanguageValue);
        setHiddenTranslationValue(data.hiddenTranslationValue);
        setReset(false);
      })
      .catch(err => setServerError(err.message));
  }, [fetchAgain]);

  const errorFromServer = serverError ? <div>{serverError}</div> : null;

  return (
    <div>
      <Translate reset={reset} baseLanguageValue={baseLanguageValue} hiddenTranslationValue={hiddenTranslationValue} />
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
