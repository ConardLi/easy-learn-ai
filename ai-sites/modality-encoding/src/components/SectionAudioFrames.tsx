import React, { useMemo, useState } from "react";
import { SourceNote } from "./common";

const SectionAudioFrames: React.FC = () => {
  const [cursor, setCursor] = useState(42);
  const [view, setView] = useState<"wave" | "spectrum">("spectrum");
  const bars = useMemo(() => Array.from({ length: 48 }, (_, i) => 10 + Math.abs(Math.sin(i * .58 + cursor / 13)) * 82), [cursor]);

  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">04</span><span className="section-anchor-label">audio frames</span></div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">声音按时间切片，<br />每片记录频率线索。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>声音一直在变，所以常被切成很短的时间片。每片可以转换成频谱：低音、高音各有多强。</p>
              <p>有些新编码器会直接读取声波，再自己学出合适的局部特征。两条路线都会产出按时间排列的数字片段。</p>
              <p>切换声波和频谱，拖动播放头。黑框里的部分就是当前时间片。</p>
            </div>
            <SourceNote>依据：wav2vec 2.0, arXiv:2006.11477。它用卷积特征编码器直接处理原始声波。</SourceNote>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
              <div className="mb-4 flex gap-2">
                <button onClick={() => setView("wave")} className={`rounded-full border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold ${view === "wave" ? "bg-ink text-cream" : "bg-white"}`}>声波</button>
                <button onClick={() => setView("spectrum")} className={`rounded-full border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold ${view === "spectrum" ? "bg-ink text-cream" : "bg-white"}`}>频谱</button>
              </div>
              <div className="relative h-64 overflow-hidden rounded-2xl border-2 border-ink bg-white p-4">
                <div className="flex h-full items-center gap-1">
                  {bars.map((h, i) => <span key={i} className={`${view === "wave" ? "bg-coral" : "bg-teal"} flex-1 rounded-sm`} style={{ height: view === "wave" ? `${20 + Math.abs(Math.sin(i * .8)) * 65}%` : `${h}%`, opacity: view === "spectrum" ? .35 + (i % 5) * .13 : .8 }} />)}
                </div>
                <div className="absolute bottom-0 top-0 w-12 border-x-2 border-ink bg-butter/25" style={{ left: `calc(${cursor}% - 24px)` }} />
              </div>
              <label className="mt-5 block">
                <span className="mb-2 flex justify-between text-[12px] font-bold"><span>时间位置</span><span className="font-mono">{cursor}%</span></span>
                <input type="range" min="6" max="94" value={cursor} onChange={(e) => setCursor(Number(e.target.value))} className="w-full accent-[#1B4B5A]" />
              </label>
              <p className="mt-3 font-mono text-[10px] text-ink/45">示意图：真实频谱会按时间和频率形成二维数值表。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAudioFrames;
