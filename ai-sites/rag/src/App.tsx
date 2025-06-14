import React from 'react';
import { Provider } from 'jotai';
import RAGLearningPlatform from './index';

const App: React.FC = () => {
  return (
    <Provider>
      <RAGLearningPlatform />
    </Provider>
  );
};

export default App;
