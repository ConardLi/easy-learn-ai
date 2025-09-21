import React from 'react';
import { Provider } from 'jotai';
import { FilterSection } from './src/components/FilterSection';
import { Timeline } from './src/components/Timeline';
import { Footer } from './src/components/Footer';
import { useTimelineData } from './src/hooks/useTimelineData';

const TimelineApp: React.FC = () => {
  useTimelineData();

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterSection />
      <Timeline />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider>
      <TimelineApp />
    </Provider>
  );
};

export default App;