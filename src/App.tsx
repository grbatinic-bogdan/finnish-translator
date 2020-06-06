import React, { useState, useEffect } from 'react';
import 'tachyons/css/tachyons.css';
import { Translate } from 'src/components/Translate';
import { getWord, ITranslateWord } from 'src/api/actions';
import { RemoteSuspense } from 'ts-remote-data-react';
import RemoteData from 'ts-remote-data';

const App = () => {
  const [translationRemoteData, setTranslation] = useState<RemoteData<ITranslateWord>>(RemoteData.NOT_ASKED);

  async function fetchNewTranslation() {
    try {
      setTranslation(RemoteData.LOADING);
      const data = await getWord();
      setTranslation(data);
    } catch (error) {
      setTranslation(RemoteData.failWith("Couldn't fetch translation data from the server"));
    }
  }

  useEffect(() => {
    fetchNewTranslation();
  }, []);

  const onNewWordClick = () => {
    fetchNewTranslation();
  };

  return (
    <RemoteSuspense
      data={translationRemoteData}
      loadingFallback={<h1>Loading</h1>}
      failureFallback={(error: string) => <h1>{error}</h1>}
    >
      {translation => (
        <>
          <Translate translate={translation} />
          <button type="button" onClick={onNewWordClick}>
            New Word
          </button>
        </>
      )}
    </RemoteSuspense>
  );
};

export default App;
