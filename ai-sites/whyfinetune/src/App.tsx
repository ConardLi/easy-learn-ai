import React from 'react';
import { Provider } from 'jotai';
import AILearningPlatform from './index';

const App: React.FC = () => {
  return (
    <Provider>
      <AILearningPlatform />
    </Provider>
  );
};

export default App;
