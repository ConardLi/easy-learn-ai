/**
 * SectionForgetCase · 长任务遗忘现场
 *
 * 主交互（L3 slider）：滑条调任务步数（5 / 10 / 15 / 20 / 30）
 *   - 看跳步数 / 上下文占用 / 注意力分散值随步数曲线上涨
 *   - 中间「步骤地图」可视化：哪几步被跳，标红
 *   - 把 Mario Giancini /daily-brief 18 步跳 2 步的真实案例融进去
 *
 * 这是 Section 02，可以放反直觉钩子：「步数到 20，跳过概率超 30%」
 */
import React, { useMemo, useState } from "react";
import { AlertTriangle, Quote } from "lucide-react";

const STEP_OPTIONS = [5, 10, 15, 20, 30];

/**
 * 用幂函数模拟「步数越多，跳步概率非线性上涨」。
 * 数据形态参考社区报告：5 步几乎不跳，15 步开始零星跳，18-30 步可能跳 1-3 步。
 */
function estimate(steps: number) {
  const skipRatio = Math.pow(steps / 30, 2.1) * 0.15; // 30 步约 15% 概率
  const skipped = Math.max(0, Math.round(steps * skipRatio));
  const ctxPct = Math.min(96, Math.round(8 + (steps / 30) * 78));
  const focus = Math.max(20, Math.round(100 - Math.pow(steps / 30, 1.4) * 70));
  return { skipped, ctxPct, focus };
}

function randomSkipIdx(steps: number, skipped: number) {
  // 用确定式 "hash" 选要跳的 step，不依赖随机数 —— 一样的步数每次画一样
  const set = new Set<number>();
  if (skipped <= 0) return set;
  // 中后段更可能被跳：从 [steps*0.3, steps*0.95] 区间挑
  const lo = Math.max(2, Math.floor(steps * 0.3));
  const hi = Math.max(lo + 1, Math.floor(steps * 0.95));
  let cursor = lo;
  while (set.size < skipped && cursor <= hi) {
    set.add(cursor);
    cursor += Math.max(2, Math.floor((hi - lo) / Math.max(1, skipped)));
  }
  return set;
}

const SectionForgetCase: React.FC = () => {
  const [idx, setIdx] = useState(3); // 默认 20 步
  const steps = STEP_OPTIONS[idx];
  const { skipped, ctxPct, focus } = useMemo(() => estimate(steps), [steps]);
  const skippedSet = useMemo(() => randomSkipIdx(steps, skipped), [steps, skipped]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">Why · 为什么需要</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          步数一过 15，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">Agent 就开始悄悄跳步</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          没有清单的 Agent 是怎么忘事的？拖一下下面的滑条调任务步数，
          看跳步数量、上下文占用、注意力分散三个指标怎么变。
          <span className="font-bold text-ink"> 5 步几乎不跳；20 步开始零星跳；30 步基本拦不住</span>。
        </p>
        <p className="font-sans text-[13px] leading-[1.65] text-ink/55 mt-2 max-w-[760px] italic">
          （下面是示意曲线，帮你感受趋势，不是精确统计 —— 真实跳步率受任务类型、模型、prompt 影响很大。）
        </p>

        {/* ─── slider ─── */}
        <div className="mt-12 card-stamp p-7 lg:p-9">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/55">
              任务步数
            </div>
            <div className="font-display font-extrabold text-[36px] text-ink leading-none">
              {steps}
              <span className="font-mono text-[14px] text-ink/55 ml-1">步</span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={STEP_OPTIONS.length - 1}
            step={1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="w-full accent-coral h-2 cursor-pointer"
            aria-label="任务步数"
          />
          <div className="flex justify-between mt-2 font-mono text-[10.5px] text-ink/55">
            {STEP_OPTIONS.map((s, i) => (
              <button
                type="button"
                key={s}
                onClick={() => setIdx(i)}
                className={`px-1.5 transition-colors ${
                  i === idx ? "text-ink font-bold" : "hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ─── 三指标卡 ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
            <Metric
              tone="bg-coral text-white"
              label="跳步数量"
              value={skipped}
              unit="步"
              hint={
                skipped === 0
                  ? "稳，一步不漏"
                  : skipped === 1
                  ? "开始零星漏"
                  : `已漏 ${skipped} 步`
              }
            />
            <Metric
              tone="bg-butter text-ink"
              label="上下文占用"
              value={ctxPct}
              unit="%"
              hint={
                ctxPct < 30
                  ? "宽敞"
                  : ctxPct < 65
                  ? "开始挤"
                  : "早期指令被挤到边缘"
              }
            />
            <Metric
              tone="bg-teal text-white"
              label="注意力得分"
              value={focus}
              unit="/100"
              hint={
                focus > 80
                  ? "集中"
                  : focus > 50
                  ? "分散中"
                  : "注意力涣散"
              }
            />
          </div>

          {/* ─── 步骤地图：18 格，被跳的标红 X ─── */}
          <div className="mt-7 pt-6 border-t-2 border-dashed border-ink/20">
            <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
              步骤地图 · 红色 X 表示跳过
            </div>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(steps, 15)}, minmax(0, 1fr))` }}>
              {Array.from({ length: steps }).map((_, i) => {
                const stepNum = i + 1;
                const isSkipped = skippedSet.has(stepNum);
                return (
                  <div
                    key={stepNum}
                    className={`relative aspect-square rounded border-2 border-ink flex items-center justify-center transition-all duration-300 ease-spring ${
                      isSkipped
                        ? "bg-coral text-white"
                        : "bg-cream text-ink/85"
                    }`}
                    title={isSkipped ? `Step ${stepNum} · 被跳过` : `Step ${stepNum}`}
                  >
                    <span className="font-mono text-[9.5px] font-bold">
                      {isSkipped ? "✕" : stepNum}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Mario Giancini 真实案例 ─── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-3 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-7">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-3 flex items-center gap-2">
              <Quote className="w-3.5 h-3.5" strokeWidth={2.5} />
              真实案例 · Mario Giancini
            </div>
            <p className="font-serif italic text-[17px] leading-[1.6] text-cream mb-4">
              「我有个 <span className="font-mono not-italic text-butter">/daily-brief</span> 命令要跑 18 步 ——
              查日历、收邮件、看 Git 活动、做趋势分析… 某天我发现 Claude 默默跳过了其中两步。」
            </p>
            <div className="pt-4 border-t-2 border-dashed border-cream/25">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-cream/65 mb-2">
                他的解决办法
              </div>
              <p className="font-sans text-[14px] leading-[1.7] text-cream/85">
                在命令最开头加一个 <span className="text-butter font-mono">Step 0</span>：
                先用 <span className="text-butter font-mono">TodoWrite</span> 把 18 步全列出来。
                之后每完成一步就更新状态。<span className="text-butter font-bold"> 加完以后再没跳过</span>。
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-butter border-2 border-ink rounded-3xl shadow-stamp p-7 flex flex-col">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/60 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />
              核心症状
            </div>
            <ul className="space-y-3 flex-1">
              <Symptom label="没报错" detail="跳了但流程继续走" />
              <Symptom label="没卡住" detail="返回值看起来正常" />
              <Symptom label="没意识" detail="Agent 自己也不知道少做了" />
            </ul>
            <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/30">
              <p className="font-serif italic text-[13.5px] leading-[1.6] text-ink/85">
                复杂流程本身就容易漏 —— 外科医生靠手术 Checklist，飞行员靠起飞 Checklist。
                Agent 也得有自己的。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric: React.FC<{
  tone: string;
  label: string;
  value: number;
  unit: string;
  hint: string;
}> = ({ tone, label, value, unit, hint }) => (
  <div className={`${tone} border-2 border-ink rounded-2xl shadow-stamp p-5`}>
    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase opacity-75 mb-1.5">
      {label}
    </div>
    <div className="font-display font-extrabold text-[40px] leading-none mb-1">
      {value}
      <span className="font-mono text-[14px] opacity-65 ml-1">{unit}</span>
    </div>
    <div className="font-sans text-[12.5px] opacity-85 mt-2 leading-snug">
      {hint}
    </div>
  </div>
);

const Symptom: React.FC<{ label: string; detail: string }> = ({ label, detail }) => (
  <li className="flex gap-3">
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink text-cream font-mono text-[11px] font-bold flex items-center justify-center mt-0.5">
      !
    </span>
    <div>
      <div className="font-display font-extrabold text-[15px] text-ink leading-tight">
        {label}
      </div>
      <div className="font-sans text-[13px] text-ink/75 leading-snug mt-0.5">
        {detail}
      </div>
    </div>
  </li>
);

export default SectionForgetCase;
