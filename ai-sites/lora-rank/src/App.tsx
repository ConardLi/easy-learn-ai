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
      <Tail />
    </div>
  );
}

function Tail() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 pb-20 pt-10 text-ink-tertiary text-xs">
      <div className="max-w-6xl mx-auto border-t border-ink/15 pt-6 leading-relaxed">
        资料锚点 · LoRA 原论文 arXiv:2106.09685 · QLoRA r=64 配方 arXiv:2305.14314
        · Tulu 3 LoRA r 配方 AI2 2024 · Alpaca-LoRA 默认 r=8 · rsLoRA
        arXiv:2312.03732 · Unsloth Docs 2026 · HuggingFace PEFT 0.13 默认 lora_r=8
        · Hu et al. § 7.2 effective rank · Sebastian Raschka "Practical Tips for
        LoRA" 2024。
      </div>
    </footer>
  );
}
