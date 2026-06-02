import React from "react";
import Hero from "./sections/Hero";
import SectionFourMeters from "./sections/SectionFourMeters";
import SectionTaskCurves from "./sections/SectionTaskCurves";
import SectionRankDeficient from "./sections/SectionRankDeficient";
import SectionRecipes from "./sections/SectionRecipes";
import SectionAlpha from "./sections/SectionAlpha";

export default function App() {
  return (
    <div className="bg-cream text-ink">
      <Hero />
      <SectionFourMeters />
      <SectionTaskCurves />
      <SectionRankDeficient />
      <SectionRecipes />
      <SectionAlpha />
    </div>
  );
}
