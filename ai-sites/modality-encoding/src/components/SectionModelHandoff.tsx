import React, { useState } from "react";
import { Check } from "lucide-react";

const PARTS = [
  { id: "order", label: "保留片段顺序", why: "模型要知道图块在哪、声音先后怎样。" },
  { id: "size", label: "统一数字长度", why: "不同来源的片段需要适配后续模型的输入宽度。" },
  { id: "marker", label: "标记来源", why: "让后续模型分清这些数字来自图、音还是文字。" },
];

const SectionModelHandoff: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(["order"]);
  const ready = selected.length === PARTS.length;
  return (
    <section className="bg-teal px-4 py-20 text-cream sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor"><span className="section-anchor-num">06</span><span className="section-anchor-label !text-cream/60">handoff</span></div>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="mb-5 font-display text-display-lg">编码完，还要整理成后续模型能接的格式。</h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-cream/75">
              <p>编码结果通常是一串数字片段。不同编码器写出的数字组长短可能不同，还要再转换一次，整理成后续模型统一接收的长度。</p>
              <p>片段顺序和来源信息也要保留。图片问答时，文字问题和图片片段才有机会在后续计算中互相参考。</p>
              <p>勾选三项，组装一份可以交接的输入。</p>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <div className="min-w-0 overflow-hidden rounded-3xl border-2 border-ink bg-cream p-5 text-ink shadow-stamp-xl">
              <div className="space-y-3">
                {PARTS.map((part) => {
                  const on = selected.includes(part.id);
                  return (
                    <button key={part.id} onClick={() => setSelected(on ? selected.filter((x) => x !== part.id) : [...selected, part.id])} className={`flex w-full items-start gap-3 rounded-2xl border-2 border-ink p-4 text-left transition-all ${on ? "bg-butter shadow-stamp" : "bg-white"}`}>
                      <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-ink ${on ? "bg-ink text-cream" : "bg-white"}`}>{on && <Check className="h-4 w-4" />}</span>
                      <span><span className="block font-bold">{part.label}</span><span className="mt-1 block text-[12.5px] leading-relaxed text-ink/60">{part.why}</span></span>
                    </button>
                  );
                })}
              </div>
              <div className={`mt-5 rounded-2xl border-2 border-ink p-5 ${ready ? "bg-coral" : "bg-white"}`}>
                <div className="font-mono text-[10px] uppercase tracking-[.18em] text-ink/50">交接结果</div>
                <p className="mt-2 font-display text-2xl font-bold">{ready ? "图片片段 + 文字片段 → 可以一起计算" : `还缺 ${PARTS.length - selected.length} 项`}</p>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 12 }).map((_, i) => <span key={i} className={`h-8 flex-1 rounded-md border-2 border-ink ${ready ? (i < 7 ? "bg-teal" : "bg-butter") : "bg-cream"}`} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionModelHandoff;
