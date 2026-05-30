/**
 * Section 04 · 能力到点就跳出来
 *
 * 反相邻：Section 03 chip 阵列，这里换 slider 调训练算力（log FLOPs）→ 看 6 个能力 bar 解锁。
 *
 * Wei et al. 2022「Emergent Abilities of Large Language Models」找到的现象：
 * 同一种能力，模型小的时候 0 分，过了某个 FLOPs 阈值突然能做了。
 * 用户拖 slider 跨过门槛，看每个能力像门帘一样翻起来。
 */
import React, { useMemo, useState } from "react";

type Ability = {
  id: string;
  label: string;
  /** log10(FLOPs) 的 emergence threshold */
  threshold: number;
  /** 解锁的真实证据 */
  evidence: string;
};

const ABILITIES: Ability[] = [
  {
    id: "grammar",
    label: "通顺接句",
    threshold: 19,
    evidence: "GPT-2 small (124M) 已能流畅续写",
  },
  {
    id: "knowledge",
    label: "记得事实",
    threshold: 20.5,
    evidence: "GPT-2 1.5B 起能背 Wikipedia 常识",
  },
  {
    id: "icl",
    label: "few-shot 现学",
    threshold: 22.5,
    evidence: "GPT-3 175B / 2020 第一次出现 in-context learning",
  },
  {
    id: "code",
    label: "写代码",
    threshold: 22,
    evidence: "Codex / GPT-3.5 在 HumanEval 突破能用线",
  },
  {
    id: "cot",
    label: "链式推理",
    threshold: 23.5,
    evidence: "Wei et al. 2022 · ~100B 参数才解锁 chain-of-thought",
  },
  {
    id: "multi",
    label: "多语种翻译",
    threshold: 23,
    evidence: "PaLM 540B · 跨语种 BLEU 突然跳起",
  },
];

/** 真实里程碑模型按训练 FLOPs 排开（log10） */
const MODEL_MILESTONES: { logF: number; label: string; year: string }[] = [
  { logF: 19, label: "GPT-2 small (124M)", year: "2019" },
  { logF: 20.5, label: "GPT-2 (1.5B)", year: "2019" },
  { logF: 22, label: "GPT-3 6.7B / PaLM 8B", year: "2020/22" },
  { logF: 23.5, label: "GPT-3 175B · Chinchilla 70B", year: "2020/22" },
  { logF: 24.4, label: "PaLM 540B · Gemini Ultra", year: "2022/23" },
  { logF: 25.3, label: "GPT-4 · Llama 3.1 405B", year: "2023/24" },
  { logF: 25.9, label: "Llama 4 Scout · Grok 4", year: "2025" },
];

/** sigmoid 性能曲线 */
function performance(logF: number, threshold: number): number {
  const x = (logF - threshold) * 2.2;
  const s = 1 / (1 + Math.exp(-x));
  return Math.max(0, Math.min(1, s));
}

const SLIDER_MIN = 18;
const SLIDER_MAX = 26;

const SectionEmerge: React.FC = () => {
  const [logF, setLogF] = useState(22.5); // 默认在 GPT-3 附近

  const nearestMilestone = useMemo(() => {
    let best = MODEL_MILESTONES[0];
    let dist = Infinity;
    for (const m of MODEL_MILESTONES) {
      const d = Math.abs(m.logF - logF);
      if (d < dist) {
        dist = d;
        best = m;
      }
    }
    return best;
  }, [logF]);

  const unlockedCount = ABILITIES.filter((a) => performance(logF, a.threshold) >= 0.5).length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">emergent-abilities</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5 leading-[1.08]">
              加大力度，
              <br />
              能力像门帘一样翻起来。
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                模型小的时候，几样能力一直是 0 分。算力一过某个门槛，分数突然蹿到能用的高度。
              </p>
              <p>
                Google + 斯坦福 2022 年的论文 给这种现象起了名字 —— emergent abilities，能力涌现。
              </p>
              <p>
                右边拖 slider 调训练算力（FLOPs 对数轴）。看 6 项能力按顺序解锁。
              </p>
            </div>
            <div className="mt-7 inline-flex items-center gap-2.5 bg-butter-tint border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp">
              <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                {unlockedCount}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
                / 6 项能力已解锁
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* FLOPs 显示 */}
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 训练总算力
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[34px] lg:text-[40px] font-bold text-ink leading-none tabular-nums">
                    10
                  </span>
                  <span className="font-display text-[20px] lg:text-[24px] font-bold text-ink leading-none tabular-nums">
                    ^{logF.toFixed(1)}
                  </span>
                  <span className="font-mono text-[11px] text-ink/55 ml-1">FLOPs</span>
                </div>
              </div>

              {/* slider 本身 */}
              <input
                type="range"
                min={SLIDER_MIN}
                max={SLIDER_MAX}
                step={0.1}
                value={logF}
                onChange={(e) => setLogF(parseFloat(e.target.value))}
                className="w-full accent-coral cursor-pointer mt-2 mb-1"
              />
              <div className="flex justify-between font-mono text-[9.5px] text-ink/40 mb-3">
                <span>10¹⁸</span>
                <span>10²⁰</span>
                <span>10²²</span>
                <span>10²⁴</span>
                <span>10²⁶</span>
              </div>

              {/* 当前算力下，最接近的真实模型 */}
              <div className="bg-cream border-2 border-ink rounded-xl px-4 py-3 mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                  最接近这个算力 ·
                </div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-[17px] font-bold text-ink">
                    {nearestMilestone.label}
                  </span>
                  <span className="font-mono text-[10.5px] text-ink/55">
                    {nearestMilestone.year}
                  </span>
                </div>
              </div>

              {/* 6 能力 bar */}
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ② 当前算力下，模型能干啥
              </div>
              <div className="space-y-3">
                {ABILITIES.map((a) => {
                  const p = performance(logF, a.threshold);
                  const unlocked = p >= 0.5;
                  const emerging = p >= 0.1 && p < 0.5;
                  return (
                    <div key={a.id}>
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-sans text-[14px] font-semibold text-ink">
                            {a.label}
                          </span>
                          <span
                            className={[
                              "font-mono text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded border",
                              unlocked
                                ? "bg-teal text-cream border-teal"
                                : emerging
                                  ? "bg-butter text-ink border-ink"
                                  : "bg-cream text-ink/40 border-ink/15",
                            ].join(" ")}
                          >
                            {unlocked ? "已解锁" : emerging ? "出现中" : "未解锁"}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] tabular-nums text-ink/65">
                          {(p * 100).toFixed(0)}%
                        </span>
                      </div>
                      {/* bar + threshold marker */}
                      <div className="relative h-3 bg-cream border-2 border-ink rounded-full overflow-hidden">
                        <div
                          className={[
                            "h-full transition-all duration-400 ease-spring",
                            unlocked
                              ? "bg-teal"
                              : emerging
                                ? "bg-coral"
                                : "bg-ink/15",
                          ].join(" ")}
                          style={{ width: `${p * 100}%` }}
                        />
                        {/* threshold tick */}
                        <div
                          className="absolute top-0 bottom-0 w-px bg-ink/45"
                          style={{
                            left: `${
                              ((a.threshold - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-ink/45">
                        {unlocked ? a.evidence : `门槛 ≈ 10^${a.threshold} FLOPs`}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 font-mono text-[10px] text-ink/40 leading-relaxed">
                bar 上的小竖线 = 该能力的 emergence 门槛。来源 · Wei et al. 2022 arXiv:2206.07682 ·
                Schaeffer 2023 NeurIPS 反驳贴：阈值受指标形式影响
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionEmerge;
