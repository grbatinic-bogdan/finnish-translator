import React, { useState, useEffect } from 'react';
import { ITranslateWord } from 'src/api/actions';
import { Typography, TextField, makeStyles, Box } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { SvgIcon } from '@material-ui/core';

interface ITranslateProps {
  translate: ITranslateWord;
}

const useStyles = makeStyles({
  inputAlignment: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    padding: '1rem 0',
  },
});

export const Translate: React.FunctionComponent<ITranslateProps> = ({ translate }) => {
  const classes = useStyles();

  const [translationValue, setTranslationValue] = useState('');
  const [isTranslated, setIsTranslated] = useState(false);
  const [errorCounter, setErrorCounter] = useState(0);

  const { translationValues, baseLanguageValue } = translate;
  const hiddenTranslationValue = translationValues[0];

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
    <Box>
      <Typography>
        <Box className={classes.label}>
          Word to translate:{' '}
          <Typography display="inline" noWrap={true} color="primary">
            {baseLanguageValue}
          </Typography>
        </Box>
        <Box className={classes.inputAlignment}>
          <TextField
            value={translationValue}
            onChange={handleInputChange}
            disabled={isTranslated}
            label="Translation"
            fullWidth
          />
          {isTranslated && <SvgIcon component={CheckIcon} />}
        </Box>
        <Box className={classes.label}>
          Number of errors you made{' '}
          <Typography display="inline" color={errorCounter > 0 ? 'error' : 'initial'}>
            {errorCounter}
          </Typography>
        </Box>
      </Typography>
    </Box>
  );
};
