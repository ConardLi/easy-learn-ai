/**
 * Section 01 · Hero「学习率是什么？」
 *
 * Hero 开场纪律：
 *   ─ H1 = 「学习率是什么？」
 *   ─ 一句话定义：「学习率是个数，决定每次更新参数时往梯度反方向走多远。」
 *   ─ 反直觉钩子（Llama 3.1 405B 的 LR 比 8B 小 4 倍）放过渡句 / Section 04
 *
 * 反模板（避开 6 个邻居）：
 *   ─ 不抢 quantization 的 7-pill 离散选择（这里是连续 slider）
 *   ─ 不抢 batch-size 的 4 数轴联动（这里是 3 条 loss 曲线同框）
 *   ─ 不抢 epochs 的 train/val 双曲线 scrubber（这里是 3 个 LR 档同框对比）
 *   ─ 不抢 distill 的 T slider + 5 类柱（这里 slider 控曲线幅度，不是柱）
 *
 * 视觉锚：左主题 + 一句话定义；右一张 SVG 图，3 条 loss 曲线同框：
 *   too small / just right / too big。中间那条曲线的 LR 被 slider 控制，
 *   slider 改时三种命运实时切换。
 *
 * 可动元素：
 *   - 主 slider（L3 连续）lr 1e-6 .. 1e-1（log scale）
 *   - 4 个 quick-pick chip（SFT 1e-5 / LoRA 2e-4 / Pretrain 3e-4 / 太大 1e-2）
 *   - hover：曲线终点圆点会随时间停留（基础礼貌）
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

/* slider 走 0..100，每 10 格 ×10：1e-6 → 1e0 */
function idxToLR(idx: number): number {
  /* 0..100 映射到 log10(-6) .. log10(0) = -6 .. 0 */
  const exp = -6 + (idx / 100) * 6;
  return Math.pow(10, exp);
}
function formatLR(lr: number): string {
  if (lr >= 0.01) return lr.toFixed(3);
  if (lr >= 1e-4) return lr.toExponential(1);
  return lr.toExponential(0);
}

const QUICK_PICKS: { idx: number; name: string; note: string }[] = [
  { idx: 17, name: "RLHF 1e-6", note: "Anthropic / OpenAI 实践 · 最保守" },
  { idx: 33, name: "SFT 1e-5", note: "Tulu 3 / Llama instruct 微调甜区" },
  { idx: 50, name: "LoRA 2e-4", note: "Unsloth / HF 默认 · 比全参 ×10" },
  { idx: 53, name: "GPT-3 6e-4", note: "Brown 2020 · 175B 是 0.6e-4" },
  { idx: 80, name: "太大 1e-2", note: "loss 第一步就抬头 / NaN" },
];

const SectionHero: React.FC = () => {
  const [idx, setIdx] = useState(50); // 默认 1e-3 附近

  const lr = idxToLR(idx);

  /* 三条 loss 曲线 ── 用 LR 决定中间那条形状（其他两条是恒定示意） */
  const verdict = useMemo(() => {
    if (lr < 5e-6) return { tag: "太小", color: "ink", note: "loss 几乎不动 · 训完啥也没学到" };
    if (lr < 5e-4) return { tag: "稳", color: "teal", note: "单调下降到甜区 · 常见微调配方多落这一档" };
    if (lr < 5e-3) return { tag: "偏大", color: "butter-deep", note: "降但抖 · 末期可能反弹" };
    return { tag: "炸", color: "coral", note: "一两步内 NaN · 训练发散" };
  }, [lr]);

  /* 中间那条曲线：根据 lr 决定形状参数 */
  const midPath = useMemo(() => buildMidPath(lr), [lr]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div aria-hidden className="absolute top-24 right-[7%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-9 h-9 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Learning Rate · 学习率
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              学习率
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  学习率是个数，决定训练时每改一次参数，这一步迈多大。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训练就是反复一件事：先算出模型现在错多少（这个数叫 loss，往下走就对了，详见《Loss》站），再把参数往「错得更少」的方向挪一格。
              </p>
              <p>
                往哪个方向走，看 loss 怎么降得最快（这就是梯度）；这一步迈多大，看学习率。
              </p>
              <p>
                lr 大十倍可能直接 NaN，小十倍则一天没动。LLM 调参 90% 时间在这一个数上。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，三条 loss 曲线同框 —— 太小 / 刚好 / 太大。拖 slider 调中间那条的 lr，看它贴近太小 / 刚好 / 太大哪一种。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                下一节按一步，看 θ 小球迈太大 / 太小会怎样
              </div>
            </div>
          </div>

          {/* 右：3 曲线对比卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* slider header */}
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  drag · learning rate
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[34px] lg:text-[40px] font-bold text-ink leading-none tabular-nums">
                    {formatLR(lr)}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">
                    lr
                  </span>
                </div>
              </div>

              {/* 主 slider */}
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={idx}
                onChange={(e) => setIdx(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
                <span>1e-6</span>
                <span>1e-5</span>
                <span>1e-4</span>
                <span>1e-3</span>
                <span>1e-2</span>
                <span>1e-1</span>
                <span>1</span>
              </div>

              {/* 4 个 quick-pick chip */}
              <div className="grid grid-cols-5 gap-1.5 mt-4 mb-6">
                {QUICK_PICKS.map((q) => {
                  const on = q.idx === idx;
                  return (
                    <button
                      key={q.name}
                      onClick={() => setIdx(q.idx)}
                      className={[
                        "px-2 py-2 rounded-md border-2 border-ink font-mono text-[10px] font-bold transition-all duration-250 ease-spring text-left leading-tight",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {q.name}
                    </button>
                  );
                })}
              </div>

              {/* 3 曲线 SVG 对比 */}
              <div className="bg-cream border-2 border-ink rounded-2xl p-3">
                <svg viewBox="0 0 480 200" className="w-full h-auto">
                  {/* 网格 */}
                  <defs>
                    <pattern id="grid" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#241C15" strokeWidth="0.4" opacity="0.15" />
                    </pattern>
                  </defs>
                  <rect x="40" y="14" width="430" height="160" fill="url(#grid)" />
                  {/* 坐标轴 */}
                  <line x1="40" y1="174" x2="470" y2="174" stroke="#241C15" strokeWidth="1.4" />
                  <line x1="40" y1="14" x2="40" y2="174" stroke="#241C15" strokeWidth="1.4" />
                  {/* y 轴标 */}
                  <text x="36" y="20" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" fontWeight="600">loss</text>
                  <text x="36" y="178" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">0</text>
                  {/* x 轴标 */}
                  <text x="470" y="190" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">step →</text>

                  {/* too small（深灰） */}
                  <path d={tooSmallPath()} fill="none" stroke="#88837C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="460" cy={endYTooSmall()} r="4" fill="#88837C" stroke="#241C15" strokeWidth="1.5" />
                  <text x="466" y={endYTooSmall() + 3} fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#88837C" fontWeight="600">小</text>

                  {/* too big（coral） */}
                  <path d={tooBigPath()} fill="none" stroke="#E07A5F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="460" cy={endYTooBig()} r="4" fill="#E07A5F" stroke="#241C15" strokeWidth="1.5" />
                  <text x="466" y={endYTooBig() + 3} fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#E07A5F" fontWeight="600">大</text>

                  {/* 主曲线 = 用户调的 lr · 粗 ink */}
                  <path d={midPath} fill="none" stroke="#241C15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="460" cy={endYMid(lr)} r="5.5" fill="#F4D35E" stroke="#241C15" strokeWidth="1.8" />

                  {/* 起点共同 loss = ln(V) ≈ 11.5 → y≈22 */}
                  <circle cx="42" cy="22" r="3.5" fill="#241C15" />
                  <text x="48" y="28" fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#241C15">ln(V) 起点</text>

                  {/* legend */}
                  <g transform="translate(56, 162)">
                    <line x1="0" x2="14" y1="0" y2="0" stroke="#88837C" strokeWidth="2.2" />
                    <text x="18" y="3" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">too small (1e-6)</text>
                    <line x1="120" x2="134" y1="0" y2="0" stroke="#241C15" strokeWidth="2.6" />
                    <text x="138" y="3" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">your lr</text>
                    <line x1="220" x2="234" y1="0" y2="0" stroke="#E07A5F" strokeWidth="2.2" />
                    <text x="238" y="3" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15">too big (1e-2)</text>
                  </g>
                </svg>
              </div>

              {/* verdict + 注脚 */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-ink/10">
                <div className="col-span-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    判定
                  </div>
                  <div
                    className={[
                      "font-display text-[28px] font-bold tabular-nums leading-tight",
                      verdict.color === "teal" ? "text-teal" :
                        verdict.color === "coral" ? "text-coral" :
                        verdict.color === "butter-deep" ? "text-ink" : "text-ink/55",
                    ].join(" ")}
                  >
                    {verdict.tag}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    现象
                  </div>
                  <div className="text-[14px] leading-snug text-ink/85">{verdict.note}</div>
                </div>
              </div>

              <p className="mt-3 font-mono text-[10px] text-ink/40">
                来源：Llama 3 herd arXiv:2407.21783 / GPT-3 arXiv:2005.14165 · 三曲线为概念示意
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 三曲线生成 · 简单 mock：把 lr 映射到 loss-vs-step 形状 ─────────────────── */
/* 起点都是 ln(V) ≈ 11.5（GPT-3 vocab=50257 时 ln=10.8，Llama vocab=128k 时 ln=11.76）
   归一化到 SVG y 范围 [22..170]，loss=11.5 → y=22；loss=0.5 → y=170。 */
const Y_TOP = 22;
const Y_BOT = 170;
const X_LEFT = 42;
const X_RIGHT = 458;
const N_POINTS = 60;

function lossToY(loss: number): number {
  /* loss ∈ [0..12] -> y in [Y_BOT..Y_TOP] */
  const clamped = Math.max(0, Math.min(13, loss));
  return Y_BOT - (clamped / 12) * (Y_BOT - Y_TOP);
}

/* too small: lr=1e-6 → 几乎不降 */
function tooSmallPath(): string {
  const pts: string[] = [];
  for (let i = 0; i <= N_POINTS; i++) {
    const p = i / N_POINTS;
    const x = X_LEFT + p * (X_RIGHT - X_LEFT);
    const loss = 11.5 - 0.6 * p; // 60 步只降 0.6
    pts.push(`${x.toFixed(1)} ${lossToY(loss).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}
function endYTooSmall(): number {
  return lossToY(11.5 - 0.6);
}

/* too big: lr=1e-2 → 头几步往下，然后剧烈反弹 */
function tooBigPath(): string {
  const pts: string[] = [];
  for (let i = 0; i <= N_POINTS; i++) {
    const p = i / N_POINTS;
    const x = X_LEFT + p * (X_RIGHT - X_LEFT);
    let loss: number;
    if (p < 0.08) {
      loss = 11.5 - 25 * p; // 头 8% 急降
    } else {
      const t = p - 0.08;
      /* 反弹 + 振荡 */
      loss = 9.5 + 4 * Math.sin(40 * t) * Math.exp(-1.5 * t) + 4 * t;
    }
    pts.push(`${x.toFixed(1)} ${lossToY(Math.min(13, loss)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}
function endYTooBig(): number {
  return lossToY(13);
}

/* mid: 用户的 lr · 形状根据 lr 决定 */
function buildMidPath(lr: number): string {
  const pts: string[] = [];
  /* lr 决定衰减率 + 抖动幅度 + 最终 loss */
  const logLR = Math.log10(lr); // -6..0
  /* 把 logLR 归一化到 0..1，-5..-3 时是甜区 */
  const sweet = Math.max(0, 1 - Math.abs(logLR + 3.5) / 2.5); // 在 -3.5 附近最稳
  const finalLoss = 1.0 + 5 * (1 - sweet); // 甜区 1.0，差区 6.0
  const decayRate = 1.5 + 3 * sweet; // 甜区收敛快
  const wobble = logLR > -2.5 ? Math.min(2.5, (logLR + 2.5) * 1.5) : 0;

  for (let i = 0; i <= N_POINTS; i++) {
    const p = i / N_POINTS;
    const x = X_LEFT + p * (X_RIGHT - X_LEFT);
    let loss = (11.5 - finalLoss) * Math.exp(-decayRate * p) + finalLoss;
    if (wobble > 0) {
      loss += wobble * Math.sin(p * 18) * Math.exp(-1.5 * p);
    }
    /* 极端大 lr 让最后阶段抬头 */
    if (logLR > -1.5) {
      loss += (logLR + 1.5) * 4 * p;
    }
    pts.push(`${x.toFixed(1)} ${lossToY(Math.min(13, Math.max(0.4, loss))).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}
function endYMid(lr: number): number {
  const logLR = Math.log10(lr);
  const sweet = Math.max(0, 1 - Math.abs(logLR + 3.5) / 2.5);
  let finalLoss = 1.0 + 5 * (1 - sweet);
  if (logLR > -1.5) finalLoss += (logLR + 1.5) * 4;
  return lossToY(Math.min(13, finalLoss));
}

export default SectionHero;
