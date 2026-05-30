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
      <Tail />
    </div>
  );
}

function Tail() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 pb-20 pt-10 text-ink-tertiary text-xs">
      <div className="max-w-6xl mx-auto border-t border-ink/15 pt-6 leading-relaxed">
        资料锚点 · Hu et al. "LoRA: Low-Rank Adaptation of Large Language Models"
        · arXiv:2106.09685 · QLoRA arXiv:2305.14314 · DoRA arXiv:2402.09353 ·
        rsLoRA arXiv:2312.03732 · LoRA+ arXiv:2402.12354 · PiSSA arXiv:2404.02948 ·
        VeRA arXiv:2310.11454 · HuggingFace PEFT 0.13 文档 (2026) · Unsloth Docs
        2026 / Predibase LoRA Land 2025-2026 / HuggingFace Hub LoRA Trending。
      </div>
    </footer>
  );
}
