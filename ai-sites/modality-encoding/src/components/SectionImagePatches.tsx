import React, { useMemo, useState } from "react";
import { SourceNote } from "./common";

const SectionImagePatches: React.FC = () => {
  const [grid, setGrid] = useState(4);
  const [picked, setPicked] = useState(5);
  const cells = useMemo(() => Array.from({ length: grid * grid }), [grid]);

  return (
    <section className="bg-coral px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">03</span><span className="section-anchor-label">image patches</span></div>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">图片先切成小块，<br />每块变成一组数字。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/75">
              <p>小图块常叫 patch。每块里有很多像素，编码器把它压成长度固定的一组数字。</p>
              <p>图块大，片段少，计算省；图块小，细节多，片段也会变多。真实系统还会缩放图片或使用动态分块。</p>
              <p>拖动网格，再点任意图块。下方数字条表示这一块被压缩后的结果。</p>
            </div>
            <SourceNote>依据：一篇 2020 年的论文采用这种做法——先把图片切成固定大小的小块，再逐块计算。论文编号：arXiv:2010.11929。</SourceNote>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-ink bg-butter-soft">
                <svg viewBox="0 0 480 300" className="absolute inset-0 h-full w-full">
                  <rect width="480" height="170" fill="#FBE891" /><rect y="170" width="480" height="130" fill="#1B4B5A" />
                  <circle cx="390" cy="72" r="35" fill="#F4D35E" stroke="#241C15" strokeWidth="4" />
                  <path d="M0 180 L130 48 L245 180 Z" fill="#E07A5F" stroke="#241C15" strokeWidth="4" />
                  <path d="M160 180 L320 30 L480 180 Z" fill="#5A5147" stroke="#241C15" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${grid},1fr)` }}>
                  {cells.map((_, i) => (
                    <button key={i} onClick={() => setPicked(i)} className={`border border-ink/50 transition-colors ${picked === i ? "bg-pop/35 ring-4 ring-inset ring-ink" : "hover:bg-white/20"}`} aria-label={`选择第 ${i + 1} 个图块`} />
                  ))}
                </div>
              </div>
              <label className="mt-5 block rounded-2xl border-2 border-ink bg-cream p-4">
                <span className="mb-2 flex justify-between text-[12px] font-bold"><span>每边切几块</span><span className="font-mono">{grid} × {grid} = {grid * grid} 块</span></span>
                <input type="range" min="2" max="8" value={grid} onChange={(e) => { setGrid(Number(e.target.value)); setPicked(0); }} className="w-full accent-[#FF4D74]" />
              </label>
              <div className="mt-4 rounded-2xl border-2 border-ink bg-ink p-4 text-cream">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60">第 {picked + 1} 块的编码结果 · 示意</div>
                <div className="flex h-16 items-center gap-1">
                  {Array.from({ length: 18 }).map((_, i) => <span key={i} className="flex-1 rounded-sm bg-butter" style={{ height: `${18 + Math.abs(Math.sin((picked + 1) * (i + 2))) * 80}%`, opacity: 0.5 + (i % 3) * 0.2 }} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionImagePatches;
