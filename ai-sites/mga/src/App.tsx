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
      <Tail />
    </div>
  );
}

function Tail() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 pb-20 pt-10 text-ink-tertiary text-xs">
      <div className="max-w-6xl mx-auto border-t border-ink/15 pt-6 leading-relaxed">
        资料锚点 · Hao et al. "Reformulation for Pretraining Data Augmentation"
        · arXiv:2502.04235 · ByteDance Seed & UCSC · ICLR 2026 Poster ·
        MGACorpus on HuggingFace (ByteDance-Seed/mga-fineweb-edu) · 770B token
        ·  本页中的实验数字均取自论文 Figure 4 / Figure 5 / Table 1。
      </div>
    </footer>
  );
}
