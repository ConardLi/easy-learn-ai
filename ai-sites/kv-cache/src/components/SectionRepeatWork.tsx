import React, { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { DemoBadge, SectionHead } from "./SectionBits";

const TOKENS = ["今", "天", "适", "合", "散", "步"];

const SectionRepeatWork: React.FC = () => {
  const [cacheOn, setCacheOn] = useState(false);
  const [round, setRound] = useState(1);
  const visible = TOKENS.slice(0, round + 2);
  const work = useMemo(
    () => visible.map((token, index) => ({ token, fresh: !cacheOn || index === visible.length - 1 })),
    [cacheOn, visible],
  );

  return (
    <section className="border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="03"
          label="重复计算"
          title="关掉缓存，每写一步都要重读前文"
          intro={
            <>
              <p>
                模型生成回答时，会把刚写出的 token 接到末尾，再计算下一个。
                关掉缓存后，前面的 token 每轮都要重新计算 K 和 V。
              </p>
              <p className="mt-3">打开下面的开关，再推进几轮。深色格代表这一轮真的做了计算。</p>
            </>
          }
        />

        <div className="rounded-[2rem] border-2 border-ink bg-cream p-5 shadow-stamp-lg lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded-full border-2 border-ink bg-white p-1 shadow-stamp">
              <button
                onClick={() => setCacheOn(false)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${!cacheOn ? "bg-ink text-cream" : "text-ink/55"}`}
              >
                缓存关闭
              </button>
              <button
                onClick={() => setCacheOn(true)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${cacheOn ? "bg-ink text-cream" : "text-ink/55"}`}
              >
                缓存开启
              </button>
            </div>
            <DemoBadge />
          </div>

          <div key={`${cacheOn}-${round}`} className="mt-9 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-ink bg-white p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-ink/50">
                第 {round} 轮 · 已有文字
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {visible.map((token) => (
                  <span key={token} className="rounded-lg border-2 border-ink bg-butter px-3 py-2 font-display text-lg font-bold">
                    {token}
                  </span>
                ))}
                <span className="animate-pulse-dot rounded-lg border-2 border-dashed border-ink px-3 py-2 font-mono text-sm">
                  ?
                </span>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-ink bg-white p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-ink/50">
                本轮计算范围
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {work.map(({ token, fresh }, index) => (
                  <span
                    key={`${token}-${index}`}
                    className={`relative rounded-lg border-2 border-ink px-3 py-2 font-display text-lg font-bold ${
                      fresh ? "bg-coral text-ink" : "bg-cream text-ink/35"
                    }`}
                  >
                    {token}
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-ink bg-white">
                      {fresh ? <X className="h-2.5 w-2.5" /> : <Check className="h-2.5 w-2.5 text-teal" />}
                    </span>
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                {cacheOn
                  ? `前 ${visible.length - 1} 个 token 直接复用，只计算最后 1 个。`
                  : `${visible.length} 个 token 全部重算，旧工作又做了一遍。`}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setRound((value) => Math.min(4, value + 1))}
              disabled={round === 4}
              className="btn-stamp bg-butter disabled:opacity-45"
            >
              再生成一步
            </button>
            <button
              onClick={() => setRound(1)}
              className="btn-stamp bg-white"
            >
              <RotateCcw className="h-4 w-4" />
              重来
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRepeatWork;
