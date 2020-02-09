import React, { useState, useEffect } from 'react';
import { Translate } from 'src/components/Translate';
import 'tachyons/css/tachyons.css';
import { getWord, ITranslateWord } from 'src/api/actions';

const App = () => {
  const [translation, setTranslation] = useState({} as ITranslateWord);
  const [serverError, setServerError] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [shouldResetTranslationData, setshouldResetTranslationData] = useState(false);

  useEffect(() => {
    try {
      const fetchTranslationData = async () => {
        const data = await getWord();
        setTranslation(data);
        setshouldResetTranslationData(false);
      };
      setshouldResetTranslationData(true);
      fetchTranslationData();
    } catch (error) {
      setServerError("Couldn't fetch translation data from the server");
    }
  }, [fetchAgain]);

  const onNewWordClick = () => {
    setFetchAgain(!fetchAgain);
  };

  return (
    <div>
      <Translate shouldResetTranslationData={shouldResetTranslationData} translate={translation} />
      <button type="button" onClick={onNewWordClick}>
        New Word
      </button>
      {serverError && <div>{serverError}</div>}
    </div>
  );
};

export default App;
