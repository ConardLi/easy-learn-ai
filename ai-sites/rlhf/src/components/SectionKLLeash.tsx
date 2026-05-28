/**
 * Section 04 · KL 皮带（L3 slider）
 *
 * RLHF 公式里那一项 β·KL(π || π_SFT) —— 控制新模型偏离 SFT 模型的力度。
 * 用户拖 β 滑块从 0 到 0.5，三个 prompt 的回答风格实时切换 + KL/Reward 曲线交叉点变化。
 *
 * 数据：用 4-5 档预设回答模拟 β 大小对回答的影响；曲线是 reward(β) 单调升 vs KL(β) 单调降。
 */
import React, { useState } from "react";

type Variant = {
  /* β ∈ [0, 0.5]，5 个档 0, 0.005, 0.02, 0.1, 0.4 */
  text: string;
  note: string;
};

type Sample = {
  q: string;
  variants: Variant[];
};

const SAMPLES: Sample[] = [
  {
    q: "用一句话夸我今天的 PPT。",
    variants: [
      {
        text: "Best PPT in history, the best, truly amazing!!! Buy now!!! 🔥🔥🔥 Don't miss!!!",
        note: "胡乱吹 · RM 喜欢，但已经飘出语言流形",
      },
      {
        text: "你今天这份 PPT 把数据藏在结论后面，节奏对了 —— 评审组应该会买单！",
        note: "有内容但夸张",
      },
      {
        text: "你这份 PPT 节奏挺顺的，数据点的位置也合理，看着挺舒服。",
        note: "甜区：贴 SFT 又向 reward 上拢",
      },
      {
        text: "这份 PPT 整体结构合理，符合一般的演示标准。",
        note: "基本贴回 SFT 风格",
      },
      {
        text: "这份 PPT 是一个用于展示信息的演示文档，按照一般的演示规范制作，包含多个页面...",
        note: "几乎完全 = SFT，啰嗦",
      },
    ],
  },
  {
    q: "怎么劝室友别熬夜？",
    variants: [
      {
        text: "Sleep is the absolute most important thing for health, no exception. You MUST sleep!!!",
        note: "情绪夸张 · 跑飞",
      },
      {
        text: "你跟他说他每熬一晚少活 8 小时，绝对吓到。",
        note: "略夸张但有共情",
      },
      {
        text: "别直接劝。先聊他最近的压力，等他松了再说一句『今晚我十二点关灯哈』。",
        note: "甜区：可操作 + 不跑飞",
      },
      {
        text: "可以建议他养成规律作息，并解释熬夜对身体的影响。",
        note: "贴 SFT 套话",
      },
      {
        text: "熬夜对健康有害。可以考虑沟通方式，多关心对方的生活习惯，并以良好作息为榜样...",
        note: "几乎完全 = SFT",
      },
    ],
  },
  {
    q: "1 + 1 = ?",
    variants: [
      {
        text: "= 1+1 = 1+1 = 1+1 = 1+1 = 1+1 = 1+1 ...（RM 给数字答案高分，但 KL 不管它，就重复刷分）",
        note: "退化重复 · reward hack 雏形",
      },
      {
        text: "答案是 2，恭喜你掌握了基础数学概念。",
        note: "略冗余",
      },
      {
        text: "= 2。",
        note: "甜区：简洁正确",
      },
      {
        text: "1 + 1 在十进制下等于 2。",
        note: "贴 SFT",
      },
      {
        text: "1 + 1 是一个加法运算，在标准十进制算术中，其结果为 2。这一结论基于公理化数学体系...",
        note: "百科腔",
      },
    ],
  },
];

const BETA_STOPS = [0.0, 0.005, 0.02, 0.1, 0.4];
const BETA_LABELS = ["皮带松开", "极轻", "甜区", "偏紧", "拉死"];

const SectionKLLeash: React.FC = () => {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [stop, setStop] = useState(2);

  const sample = SAMPLES[sampleIdx];
  const variant = sample.variants[stop];
  const beta = BETA_STOPS[stop];

  /* 一个示意曲线：reward(β) 单调减（β 越大，RM 分越低，因为更贴 SFT）；KL(β) 单调减 */
  const points = Array.from({ length: 41 }, (_, i) => {
    const b = (i / 40) * 0.5;
    /* reward 在 β 极小时被 reward hacking 拉高到 1.0+，正常区间在 0.5-0.85 */
    const hackBoost = Math.max(0, 0.25 * Math.exp(-b * 80));
    const reward = 0.65 + hackBoost - Math.pow(b * 2, 0.8) * 0.18;
    const kl = 1 - Math.exp(-1 / Math.max(b + 0.01, 0.012)) * 0.05;
    /* truncate */
    const klSimp = Math.max(0.02, 0.95 * Math.exp(-b * 12) + 0.04);
    return {
      b,
      reward: Math.max(0.1, Math.min(1.05, reward)),
      kl: klSimp,
    };
  });

  const currentB = beta;
  const cur = points.reduce((a, p) =>
    Math.abs(p.b - currentB) < Math.abs(a.b - currentB) ? p : a,
  );

  /* SVG 维度 */
  const W = 460;
  const H = 200;
  const PAD = 30;
  const toX = (b: number) => PAD + (b / 0.5) * (W - PAD * 2);
  const toY = (v: number) => H - PAD - v * (H - PAD * 2);

  const rewardPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.b).toFixed(1)} ${toY(p.reward).toFixed(1)}`)
    .join(" ");
  const klPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.b).toFixed(1)} ${toY(p.kl).toFixed(1)}`)
    .join(" ");

  const sweetZone = stop === 2;
  const ranAway = stop <= 1;
  const tooTight = stop >= 4;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">KL leash</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink mb-4">
              新模型不能跑太远，
              <br className="hidden sm:block" />
              得用一根 KL 皮带拴在 SFT 上。
            </h2>
            <p className="text-[15.5px] text-ink/70 leading-relaxed max-w-[60ch]">
              PPO 的训练目标是 reward − β · KL(π ‖ π_SFT)。
              β 就是这根皮带的松紧。
              皮带太松，新模型为了 reward 啥都干得出；皮带太紧，它就跟 SFT 一样保守、学不到偏好。
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-cream border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                公式骨架
              </div>
              <pre className="font-mono text-[12.5px] text-ink leading-relaxed">
{`max  E[ r_θ(x, y)         ← RM 给的分
         − β · KL(π‖π_SFT)  ← 别跑太远
         + γ · pretrain ]    ← 别忘语言`}
              </pre>
              <p className="mt-2 font-mono text-[10px] text-ink/45 leading-relaxed">
                Ouyang 2022 §3.5；InstructGPT 实测 β ≈ 0.02 / token
              </p>
            </div>
          </div>
        </div>

        {/* 主交互 */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* 左：slider + 真实回答 */}
          <div className="lg:col-span-7 bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7">
            {/* prompt 切换 */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-1 self-center">
                prompt
              </span>
              {SAMPLES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSampleIdx(i)}
                  className={[
                    "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[10.5px] transition-all duration-250 ease-spring",
                    i === sampleIdx
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#FF4D74]"
                      : "bg-white text-ink/65 hover:bg-butter",
                  ].join(" ")}
                >
                  {s.q.length > 14 ? s.q.slice(0, 14) + "…" : s.q}
                </button>
              ))}
            </div>

            {/* slider */}
            <div className="mb-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  KL 系数 β
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[32px] font-bold text-ink leading-none tabular-nums">
                    {beta.toFixed(beta < 0.01 ? 3 : 2)}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50">
                    / token
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={BETA_STOPS.length - 1}
                step={1}
                value={stop}
                onChange={(e) => setStop(parseInt(e.target.value))}
                className="w-full accent-pop"
                style={{ accentColor: "#FF4D74" }}
              />
              <div className="grid grid-cols-5 gap-1 mt-2">
                {BETA_LABELS.map((lbl, i) => (
                  <div
                    key={lbl}
                    className={[
                      "text-center font-mono text-[10px] uppercase tracking-[0.1em]",
                      i === stop ? "text-ink font-bold" : "text-ink/35",
                    ].join(" ")}
                  >
                    {lbl}
                  </div>
                ))}
              </div>
            </div>

            {/* 当前回答 */}
            <div key={`${sampleIdx}-${stop}`} className="animate-enter-fade">
              <div className="px-4 py-3 bg-butter/30 border-l-4 border-butter-deep rounded-r-md mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                  Q
                </div>
                <div className="font-display text-[15.5px] font-bold text-ink">
                  {sample.q}
                </div>
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    模型回答 @ β = {beta.toFixed(beta < 0.01 ? 3 : 2)}
                  </div>
                  <span
                    className={[
                      "font-mono text-[10px] px-2 py-0.5 rounded-full border-2 border-ink",
                      sweetZone
                        ? "bg-teal text-cream"
                        : ranAway
                          ? "bg-pop text-cream"
                          : tooTight
                            ? "bg-white text-ink/55"
                            : "bg-butter text-ink",
                    ].join(" ")}
                  >
                    {variant.note}
                  </span>
                </div>
                <p className="font-sans text-[14.5px] text-ink leading-relaxed">
                  {variant.text}
                </p>
              </div>
            </div>
          </div>

          {/* 右：SVG 曲线图 + 解读 */}
          <div className="lg:col-span-5 bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
              β 怎么影响 reward & KL
            </div>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto border-2 border-ink rounded-xl bg-white"
            >
              {/* 网格 */}
              {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                <line
                  key={v}
                  x1={PAD}
                  x2={W - PAD}
                  y1={toY(v)}
                  y2={toY(v)}
                  stroke="#241C15"
                  strokeOpacity={0.08}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                />
              ))}
              {/* reward path */}
              <path
                d={rewardPath}
                fill="none"
                stroke="#FF4D74"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              {/* KL path */}
              <path
                d={klPath}
                fill="none"
                stroke="#1B4B5A"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="5 3"
              />
              {/* 当前 β 竖线 */}
              <line
                x1={toX(currentB)}
                x2={toX(currentB)}
                y1={PAD - 4}
                y2={H - PAD + 4}
                stroke="#241C15"
                strokeWidth={1.5}
              />
              {/* 当前点 reward */}
              <circle
                cx={toX(currentB)}
                cy={toY(cur.reward)}
                r={5}
                fill="#FF4D74"
                stroke="#241C15"
                strokeWidth={2}
              />
              {/* 当前点 KL */}
              <circle
                cx={toX(currentB)}
                cy={toY(cur.kl)}
                r={5}
                fill="#1B4B5A"
                stroke="#241C15"
                strokeWidth={2}
              />
              {/* x 轴 label */}
              <text
                x={PAD}
                y={H - 6}
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#241C15"
                opacity="0.5"
              >
                β=0
              </text>
              <text
                x={W - PAD}
                y={H - 6}
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#241C15"
                opacity="0.5"
                textAnchor="end"
              >
                β=0.5
              </text>
            </svg>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border-2 border-ink rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-pop border border-ink" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
                    reward
                  </span>
                </div>
                <div className="font-display text-[20px] font-bold text-ink tabular-nums">
                  {cur.reward.toFixed(2)}
                </div>
                <div className="font-mono text-[9.5px] text-ink/45">
                  RM 给的分（越高 RM 越满意）
                </div>
              </div>
              <div className="p-3 bg-white border-2 border-ink rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal border border-ink" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
                    KL
                  </span>
                </div>
                <div className="font-display text-[20px] font-bold text-ink tabular-nums">
                  {cur.kl.toFixed(2)}
                </div>
                <div className="font-mono text-[9.5px] text-ink/45">
                  离 SFT 多远（越高越敢跑）
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-white border-2 border-ink rounded-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                {sweetZone
                  ? "甜区"
                  : ranAway
                    ? "皮带太松"
                    : tooTight
                      ? "皮带拉死"
                      : "中间档"}
              </div>
              <p className="font-sans text-[12.5px] text-ink/75 leading-relaxed">
                {sweetZone &&
                  "reward 比 SFT 高一截，KL 还很小。InstructGPT 用的就是这一档。"}
                {ranAway &&
                  "reward 表面很漂亮，但模型已经在乱编、刷分、说瞎话。下一节专门讲这个 ——「reward hacking」。"}
                {tooTight &&
                  "KL 压得太低 → 新模型几乎 = SFT，相当于白训了一遍 PPO。"}
                {stop === 1 &&
                  "刚出甜区，开始飘 —— reward 在涨，但回答已经有点夸张。"}
                {stop === 3 &&
                  "比甜区紧一点，安全但保守。GPT-4 系做对齐有时故意紧一些。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionKLLeash;
