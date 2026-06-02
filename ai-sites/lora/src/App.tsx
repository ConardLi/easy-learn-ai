import React from "react";
import Hero from "./sections/Hero";
import SectionMergeOrSwap from "./sections/SectionMergeOrSwap";
import SectionWhereToHang from "./sections/SectionWhereToHang";
import SectionFamily from "./sections/SectionFamily";
import SectionVsFullFT from "./sections/SectionVsFullFT";
import SectionToolchain from "./sections/SectionToolchain";
import SectionHub from "./sections/SectionHub";

export default function App() {
  return (
    <div className="bg-cream text-ink">
      <Hero />
      <SectionMergeOrSwap />
      <SectionWhereToHang />
      <SectionFamily />
      <SectionVsFullFT />
      <SectionToolchain />
      <SectionHub />
    </div>
  );
}
