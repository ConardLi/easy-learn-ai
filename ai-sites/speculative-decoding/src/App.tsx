import React from "react";
import {
  Hero,
  OneByOne,
  DraftAndVerify,
  VerificationGame,
  SpeedLab,
  Exactness,
  WhenItHelps,
  Related,
} from "./components/SpeculativeSections";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Hero />
      <OneByOne />
      <DraftAndVerify />
      <VerificationGame />
      <SpeedLab />
      <Exactness />
      <WhenItHelps />
      <Related />
    </div>
  );
}
