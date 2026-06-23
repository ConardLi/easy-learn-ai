import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { candidates, cx, MiniBadge, recallScore, ScoreBar, SectionShell } from "./common";

const SectionRecallLab: React.FC = () => {
  const [topK, setTopK] = useState(4);
  const [keywordWeight, setKeywordWeight] = useState(45);

  const ranked = useMemo(
    () =>
      candidates
        .map((item) => ({ ...item, score: recallScore(item, keywordWeight) }))
        .sort((a, b) => b.score - a.score),
    [keywordWeight],
  );

  const chosen = ranked.slice(0, topK);
  const goodCount = chosen.filter((item) => item.id === "a" || item.id === "c" || item.id === "f").length;
  const noise = Math.max(0, chosen.length - goodCount);

  return (
    <SectionShell num="03" label="top-k lab" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-butter p-2 text-ink shadow-stamp">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg text-ink">top-K 调大，漏掉关键资料的风险会低一点。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>top-K 是召回阶段最多拿回几条候选。K 越大，越不容易漏；同时会带回更多噪声。</p>
            <p>噪声是“看起来沾边、实际帮不上回答”的资料。后面的重排就负责把噪声压下去。</p>
          </div>

          <div className="mt-7 space-y-4 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <div>
              <div className="flex items-center justify-between gap-3">
                <MiniBadge>top-k</MiniBadge>
                <span className="font-mono text-sm font-bold">{topK} 条</span>
              </div>
              <input
                className="mt-4 w-full accent-coral"
                type="range"
                min={2}
                max={6}
                step={1}
                value={topK}
                onChange={(event) => setTopK(Number(event.target.value))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <MiniBadge>关键词权重</MiniBadge>
                <span className="font-mono text-sm font-bold">{keywordWeight}%</span>
              </div>
              <input
                className="mt-4 w-full accent-coral"
                type="range"
                min={15}
                max={85}
                step={5}
                value={keywordWeight}
                onChange={(event) => setKeywordWeight(Number(event.target.value))}
              />
            </div>

            <p className="text-sm leading-relaxed text-ink/60">示意分数，帮你感受排序趋势，不是精确统计。</p>
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-white p-5 shadow-stamp-xl">
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <Metric label="有用候选" value={goodCount} tone="teal" />
            <Metric label="噪声候选" value={noise} tone="coral" />
          </div>

          <div className="space-y-3">
            {ranked.map((item, index) => {
              const selected = index < topK;
              const useful = item.id === "a" || item.id === "c" || item.id === "f";
              return (
                <div
                  key={`${item.id}-${topK}-${keywordWeight}`}
                  className={cx(
                    "rounded-2xl border-2 p-4 transition-all duration-250 ease-spring",
                    selected ? "border-ink bg-cream shadow-stamp" : "border-ink/30 bg-white opacity-45",
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-ink">
                        #{index + 1} {item.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink/62">{item.text}</p>
                    </div>
                    <span
                      className={cx(
                        "rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold",
                        useful ? "bg-teal text-cream" : "bg-coral text-cream",
                      )}
                    >
                      {useful ? "能用" : "噪声"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <ScoreBar label="召回分" value={item.score} color={useful ? "bg-teal" : "bg-coral"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const Metric: React.FC<{ label: string; value: number; tone: "teal" | "coral" }> = ({ label, value, tone }) => (
  <div className={cx("rounded-2xl border-2 border-ink p-4 shadow-stamp", tone === "teal" ? "bg-teal text-cream" : "bg-coral text-cream")}>
    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] opacity-75">{label}</div>
    <div className="mt-1 font-display text-[38px] font-bold leading-none">{value}</div>
  </div>
);

export default SectionRecallLab;
