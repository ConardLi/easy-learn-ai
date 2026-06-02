import React from "react";
import Hero from "./sections/Hero";
import SectionRepetitionTrap from "./sections/SectionRepetitionTrap";
import SectionRewrite from "./sections/SectionRewrite";
import SectionPipeline from "./sections/SectionPipeline";
import SectionAlternatives from "./sections/SectionAlternatives";
import SectionScaling from "./sections/SectionScaling";
import SectionCorpus from "./sections/SectionCorpus";
import SectionWhenToUse from "./sections/SectionWhenToUse";

export default function App() {
  return (
    <div className="bg-cream text-ink">
      <Hero />
      <SectionRepetitionTrap />
      <SectionRewrite />
      <SectionPipeline />
      <SectionAlternatives />
      <SectionScaling />
      <SectionCorpus />
      <SectionWhenToUse />
    </div>
  );
}
