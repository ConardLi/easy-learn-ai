import React from "react";
import {
  Hero,
  FixedBatchProblem,
  DecodePrimer,
  SchedulerLab,
  ThroughputLab,
  Tradeoffs,
  Related,
} from "./components/ContinuousBatchingSections";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Hero />
      <FixedBatchProblem />
      <DecodePrimer />
      <SchedulerLab />
      <ThroughputLab />
      <Tradeoffs />
      <Related />
    </div>
  );
}
