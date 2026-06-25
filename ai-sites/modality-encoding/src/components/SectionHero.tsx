import React, { useMemo, useState } from "react";
import { ArrowDown, Image, AudioLines } from "lucide-react";
import { StampLink } from "./common";

const SectionHero: React.FC = () => {
  const [mode, setMode] = useState<"image" | "audio">("image");
  const [detail, setDetail] = useState(5);
  const cells = useMemo(() => Array.from({ length: detail * detail }), [detail]);

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 shadow-stamp">
              <span className="h-2 w-2 rounded-full bg-teal" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">Modality Encoding · 模态编码</span>
            </div>
            <h1 className="mb-6 font-display text-display-xl">模态编码是什么？</h1>
            <p className="mb-5 max-w-xl font-display text-[21px] font-bold leading-snug lg:text-[24px]">
              <span className="relative inline-block">
                <span className="absolute bottom-0.5 left-0 right-0 h-4 bg-butter" />
                <span className="relative">模态编码把图片和声音变成模型能计算的一串数字。</span>
              </span>
            </p>
            <div className="max-w-xl space-y-3 text-[15.5px] leading-relaxed text-ink/75">
              <p>图片可以看成由许多小色点拼成，每个小色点叫像素。声音可以记录成一条随时间起伏的线。</p>
              <p>模型先把这些内容切成小段，再给每一段写出一组数字。</p>
              <p>负责这道转换的部分叫编码器。它会保留对任务有用的线索，比如边缘、形状、音高和发音。</p>
              <p>右边切换图片和声音，再拖动精细程度。切得越细，模型收到的片段通常越多。</p>
            </div>
            <div className="mt-7">
              <StampLink
                href="../multimodality/index.html"
                title="先看过《多模态》也可以"
                desc="那一站讲模型如何同时处理图、文、音；这里专门拆开第一步：它们怎样变成数字。"
                tone="butter"
              />
            </div>
            <div className="mt-8 inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream"><ArrowDown className="h-4 w-4" /></span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">继续往下看</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <ModeButton active={mode === "image"} onClick={() => setMode("image")} icon={<Image className="h-4 w-4" />} label="图片" />
                  <ModeButton active={mode === "audio"} onClick={() => setMode("audio")} icon={<AudioLines className="h-4 w-4" />} label="声音" />
                </div>
                <span className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-mono text-[10px] font-bold">原始内容 → 小段 → 数字</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="aspect-square overflow-hidden rounded-2xl border-2 border-ink bg-cream">
                  {mode === "image" ? <Picture /> : <Wave />}
                </div>
                <div className="text-center font-display text-3xl font-bold">→</div>
                <div className="aspect-square rounded-2xl border-2 border-ink bg-cream p-3">
                  {mode === "image" ? (
                    <div className="grid h-full gap-1" style={{ gridTemplateColumns: `repeat(${detail}, minmax(0,1fr))` }}>
                      {cells.map((_, i) => <span key={i} className="rounded-sm border border-ink/30" style={{ background: i % 4 === 0 ? "#E07A5F" : i % 3 === 0 ? "#F4D35E" : "#1B4B5A" }} />)}
                    </div>
                  ) : (
                    <div className="flex h-full items-end gap-1">
                      {Array.from({ length: detail * 4 }).map((_, i) => (
                        <span key={i} className="flex-1 rounded-t border border-ink bg-teal" style={{ height: `${22 + Math.abs(Math.sin(i * 1.4)) * 68}%` }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <label className="mt-5 block rounded-2xl border-2 border-ink bg-butter/30 p-4">
                <span className="mb-2 flex justify-between text-[13px] font-bold">
                  <span>切分精细程度</span>
                  <span className="font-mono">{detail} 档</span>
                </span>
                <input className="w-full accent-[#1B4B5A]" type="range" min="3" max="9" value={detail} onChange={(e) => setDetail(Number(e.target.value))} />
                <span className="mt-2 block font-mono text-[10px] text-ink/50">示意：真实编码器会继续计算每个片段的数字表示。</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ModeButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-[13px] font-bold transition-all ${active ? "bg-ink text-cream shadow-stamp" : "bg-white"}`}>
    {icon}{label}
  </button>
);

const Picture = () => (
  <svg viewBox="0 0 220 220" className="h-full w-full" aria-label="山、太阳和湖面的示意图片">
    <rect width="220" height="120" fill="#FBE891" />
    <rect y="120" width="220" height="100" fill="#1B4B5A" />
    <circle cx="170" cy="55" r="25" fill="#F4D35E" stroke="#241C15" strokeWidth="3" />
    <path d="M0 125 L65 55 L120 125 Z" fill="#E07A5F" stroke="#241C15" strokeWidth="3" />
    <path d="M75 125 L145 38 L220 125 Z" fill="#5A5147" stroke="#241C15" strokeWidth="3" />
  </svg>
);

const Wave = () => (
  <svg viewBox="0 0 220 220" className="h-full w-full" aria-label="声音波形示意">
    <rect width="220" height="220" fill="#FBEFE3" />
    <path d="M0 110 C16 25 28 195 44 110 S72 25 88 110 S116 195 132 110 S160 25 176 110 S204 195 220 110" fill="none" stroke="#1B4B5A" strokeWidth="7" />
    <line x1="0" y1="110" x2="220" y2="110" stroke="#241C15" strokeWidth="2" strokeDasharray="5 6" opacity=".35" />
  </svg>
);

export default SectionHero;
