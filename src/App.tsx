import React, { useState, useEffect } from 'react';
import { Translate } from 'src/components/Translate';
import { getWord, ITranslateWord } from 'src/api/actions';
import { RemoteSuspense } from 'ts-remote-data-react';
import RemoteData from 'ts-remote-data';
import Button from '@material-ui/core/Button';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const App = () => {
  const cssClasses = useStyles();
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
        <Container maxWidth="sm" className={cssClasses.container}>
          <Box>
            <Translate translate={translation} />
          </Box>
          <Button color="primary" variant="contained" onClick={onNewWordClick}>
            Fetch New Word
          </Button>
        </Container>
      )}
    </RemoteSuspense>
  );
};

export default App;
