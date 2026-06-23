import React, { useMemo, useState } from "react";
import { Wrench } from "lucide-react";
import { candidates, cx, MiniBadge, rerankScore, ScoreBar, SectionShell } from "./common";

const SectionTuning: React.FC = () => {
  const [recallK, setRecallK] = useState(5);
  const [finalN, setFinalN] = useState(3);
  const [threshold, setThreshold] = useState(62);

  const finalRows = useMemo(() => {
    const recalled = candidates
      .map((item) => ({ ...item, score: rerankScore(item) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, recallK);
    return recalled.filter((item) => item.score >= threshold).slice(0, finalN);
  }, [recallK, finalN, threshold]);

  const verdict =
    finalRows.length === 0
      ? "没有资料能过线，AI 应该回答“资料里没找到”。"
      : finalRows.some((item) => item.id === "a")
        ? "关键依据在前面，AI 更容易答稳。"
        : "候选还不够好，先回去调召回。";

  return (
    <SectionShell num="06" label="parameter tuning" tone="butter">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-white p-2 text-ink shadow-stamp">
            <Wrench className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg text-ink">三个参数最常被调：召回多少、留下多少、低分要不要丢。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>召回太少会漏资料。给 AI 的资料太多会挤占聊天窗口，还会把回答带偏。</p>
            <p>阈值是一条分数线。低于这条线的候选先扔掉，避免“硬塞资料”。</p>
          </div>

          <div className="mt-7 space-y-5 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <Knob label="召回 top-K" value={recallK} suffix="条" min={2} max={6} step={1} onChange={setRecallK} />
            <Knob label="重排后留下 top-N" value={finalN} suffix="条" min={1} max={5} step={1} onChange={setFinalN} />
            <Knob label="最低分阈值" value={threshold} suffix="分" min={40} max={86} step={2} onChange={setThreshold} />
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-white p-5 shadow-stamp-xl">
          <div className="mb-4 rounded-2xl border-2 border-ink bg-cream p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <MiniBadge>最终塞给 AI</MiniBadge>
              <span className="font-mono text-xs font-bold text-ink/55">{finalRows.length} 条</span>
            </div>
            <p className="font-bold text-ink">{verdict}</p>
          </div>

          <div className="space-y-3">
            {finalRows.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-ink bg-cream p-8 text-center">
                <div className="font-display text-[24px] font-bold text-ink">空结果也有用</div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">没有可靠依据时，回答“资料不足”比编一个答案好。</p>
              </div>
            ) : (
              finalRows.map((item, index) => (
                <div key={`${item.id}-${threshold}-${finalN}`} className="rounded-2xl border-2 border-ink bg-cream p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-ink">
                        #{index + 1} {item.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink/62">{item.text}</p>
                    </div>
                    <span className="rounded-full border-2 border-ink bg-butter px-3 py-1 font-mono text-xs font-bold">{item.score}</span>
                  </div>
                  <ScoreBar label="重排分" value={item.score} color="bg-teal" />
                </div>
              ))
            )}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">示意规则，帮你理解参数效果。</p>
        </div>
      </div>
    </SectionShell>
  );
};

const Knob: React.FC<{
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}> = ({ label, value, suffix, min, max, step, onChange }) => (
  <div>
    <div className="mb-3 flex items-center justify-between gap-3">
      <MiniBadge>{label}</MiniBadge>
      <span className="font-mono text-sm font-bold">
        {value} {suffix}
      </span>
    </div>
    <input
      className="w-full accent-coral"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  </div>
);

export default SectionTuning;
