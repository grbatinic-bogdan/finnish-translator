import React from 'react';
import { Translate } from 'src/components/Translate';
import 'tachyons/css/tachyons.css';

const App = () => (
  <div>
    <Translate baseLanguageValue="window" hiddenTranslationValue="ikkuna" />
  </div>
);

export default App;
