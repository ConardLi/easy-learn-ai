/**
 * Section 06 · 2026 对齐家族表
 *
 * 讲当下真实在用的对齐家族 + 谁在用 + 哪个 benchmark 上多少分（不写「未来展望」那种鸡汤）。
 *
 * 数据来源：
 *  - Ouyang 2022 (InstructGPT / PPO)
 *  - Rafailov et al. 2023 (DPO)
 *  - DeepSeekMath 2024 + DeepSeek-R1 2025 (GRPO)
 *  - Bai et al. 2022 + Anthropic 2026-01 (Constitutional AI / RLAIF)
 *  - Meta Llama 4 2025 blog (SFT → online RL → light DPO)
 *  - RewardBench 2 (Lambert 2026, arXiv:2506.01937)
 *  - Awesome Agents Reward/Judge Leaderboard 2026
 *
 * 交互：
 *  - chip 阵列按"是否需要 reward model / 是否在线"筛选
 *  - 卡片 hover 高亮，点击展开看「谁在用 + benchmark 数」
 *  - 顶部时间线 SVG（hover 节点联动高亮卡片）
 */
import React, { useState } from "react";
import { Layers } from "lucide-react";

type Family = {
  id: string;
  short: string;
  full: string;
  year: number;
  needsRM: boolean;
  online: boolean;
  paper: string;
  oneLine: string;
  who: { name: string; how: string }[];
  numbers: { label: string; value: string }[];
};

const FAMILIES: Family[] = [
  {
    id: "ppo",
    short: "PPO",
    full: "Proximal Policy Optimization · 原教旨 RLHF",
    year: 2022,
    needsRM: true,
    online: true,
    paper: "Ouyang et al. 2022, InstructGPT, arXiv:2203.02155",
    oneLine:
      "经典三件套：SFT → RM → PPO。在线生成 + KL 惩罚 + 价值网络，重，但能挤出最后一点性能。",
    who: [
      { name: "OpenAI", how: "InstructGPT、ChatGPT 早期版本" },
      { name: "Llama 4", how: "中段重型 online RL 阶段（轻 SFT → 重 RL → 轻 DPO）" },
    ],
    numbers: [
      { label: "1.3B 输出在 85% pair 上击败 175B base", value: "Ouyang 2022" },
      { label: "PPO 需 policy + ref + RM + value 四模型", value: "约 4× GPU" },
    ],
  },
  {
    id: "dpo",
    short: "DPO",
    full: "Direct Preference Optimization · 把 RL 折成监督",
    year: 2023,
    needsRM: false,
    online: false,
    paper: "Rafailov et al. 2023, arXiv:2305.18290",
    oneLine:
      "数学一推：reward model + PPO 可以折成对偏好对的一个监督损失。没 RM、没在线采样、训得稳。",
    who: [
      { name: "HuggingFace TRL", how: "DPOTrainer 是社区开源对齐的默认起点" },
      { name: "Llama 4", how: "在最后一步做轻量 DPO 收尾，处理 corner case" },
      { name: "无数开源 7B-70B fine-tune", how: "Tulu、Zephyr、OpenChat 等" },
    ],
    numbers: [
      { label: "β ≈ 0.1-0.5 典型范围", value: "TRL 默认 0.1" },
      { label: "省 ~50% 显存（无 value head）", value: "vs PPO" },
      { label: "DPO 变体：IPO / KTO / SimPO / ORPO", value: "2024-2025" },
    ],
  },
  {
    id: "grpo",
    short: "GRPO",
    full: "Group Relative Policy Optimization · DeepSeek 的省钱版 PPO",
    year: 2024,
    needsRM: false,
    online: true,
    paper: "DeepSeekMath 2024, arXiv:2402.03300 · DeepSeek-R1 2025, arXiv:2501.12948",
    oneLine:
      "去掉 PPO 的 value 网络，给同一 prompt 生成一组 G 个回答，互相比较 reward 的 z-score 当 advantage。",
    who: [
      { name: "DeepSeek-R1", how: "用 GRPO + 规则奖励（答案对不对 / 格式 / 语言一致）直接训出推理模型" },
      { name: "Qwen / 其他开源推理模型", how: "GRPO 已成 2025 推理 RL 的事实标准" },
      { name: "HuggingFace TRL", how: "GRPOTrainer 已 native 支持" },
    ],
    numbers: [
      { label: "去掉 value model", value: "训练显存 -50%" },
      { label: "DeepSeek-R1 训出 reasoning 行为", value: "全靠规则奖励 + GRPO" },
      { label: "advantage = (r_i − mean) / std", value: "组内归一" },
    ],
  },
  {
    id: "cai",
    short: "CAI",
    full: "Constitutional AI · 用宪法 + AI 自我批评替代人工",
    year: 2022,
    needsRM: true,
    online: true,
    paper: "Bai et al. 2022, arXiv:2212.08073 · Anthropic Soul Doc 2026-01",
    oneLine:
      "写一份「宪法」，让 AI 自己批评自己的回答，再用这批 AI 偏好训 RM。harmlessness 这部分几乎不用真人。",
    who: [
      { name: "Anthropic Claude", how: "整代 Claude 都基于 CAI；2026-01 宪法升级到 23 000 字" },
      { name: "Google Gemini", how: "公开提到部分用 RLAIF" },
    ],
    numbers: [
      { label: "Claude 宪法 23 k 字", value: "2026-01 版" },
      { label: "优先级 safety > 道德 > 公司规 > helpfulness", value: "4 层硬层级" },
      { label: "helpfulness 用人，harmlessness 用 AI", value: "Bai 2022 设计" },
    ],
  },
  {
    id: "rlaif",
    short: "RLAIF",
    full: "RL from AI Feedback · 让 LLM 当裁判替代人",
    year: 2023,
    needsRM: true,
    online: true,
    paper: "Lee et al. 2023, arXiv:2309.00267 + 2024-2026 多家落地",
    oneLine:
      "拿一个强 LLM 当 judge，把它的偏好当成 ground truth 训 RM。便宜、可大规模，但带 judge 的偏见。",
    who: [
      { name: "Google", how: "summarization、dialog 多个产品已切到 RLAIF" },
      { name: "Anthropic", how: "CAI 本质就是 RLAIF 的早期变种" },
      { name: "AlpacaEval / Arena Hard", how: "评测端用 GPT-4 当 judge" },
    ],
    numbers: [
      { label: "GPT-5 当 judge JudgeBench 85.2%", value: "Awesome Agents 2026" },
      { label: "Claude 4 Opus 自我偏好最低", value: "RewardBench 2 2026" },
      { label: "成本 ≈ 人类 1/10", value: "Lee 2023" },
    ],
  },
  {
    id: "online",
    short: "Online / Iterative",
    full: "在线 / 迭代 RLHF · 不断收新偏好",
    year: 2024,
    needsRM: true,
    online: true,
    paper: "Touvron et al. Llama 2/3, Meta Llama 4 blog 2025",
    oneLine:
      "把 SFT → RM → RL 当一轮，跑完用新 policy 生新数据再标，循环往复。把 RM 也持续更新。",
    who: [
      { name: "Llama 4 Maverick", how: "continuous online RL，过滤中高难度 prompt 反复迭代" },
      { name: "Meta / 字节内部", how: "公开博客提到迭代版 RLHF" },
    ],
    numbers: [
      { label: "Llama 4 砍掉 >50% easy 数据", value: "Meta 2025 blog" },
      { label: "异步 RL 框架", value: "10× 训练效率" },
    ],
  },
];

type FilterKey = "all" | "noRM" | "online" | "offline";

const SectionFamilies: React.FC = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeId, setActiveId] = useState<string | null>("grpo");

  const filtered = FAMILIES.filter((f) => {
    if (filter === "all") return true;
    if (filter === "noRM") return !f.needsRM;
    if (filter === "online") return f.online;
    if (filter === "offline") return !f.online;
    return true;
  });

  const active = FAMILIES.find((f) => f.id === activeId) ?? FAMILIES[2];

  /* 时间线 SVG */
  const TL_W = 720;
  const TL_H = 90;
  const minY = 2022;
  const maxY = 2026;
  const tlX = (y: number) => 40 + ((y - minY) / (maxY - minY)) * (TL_W - 80);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Alignment Families · 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink mb-4">
              到 2026 年，RLHF 已经分成六支家族，
              <br className="hidden sm:block" />
              每家解决的是不同的痛。
            </h2>
            <p className="text-[15.5px] text-ink/70 leading-relaxed max-w-[60ch]">
              到 2026 年，PPO 只是六支对齐家族之一。开源社区 DPO 当默认，DeepSeek 把 GRPO 推成推理模型标配，
              Anthropic 用宪法 + AI 自评，Meta 玩三段式迭代。各家选不同。
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="flex items-center gap-2 px-4 py-3 bg-cream border-2 border-ink rounded-xl shadow-stamp">
              <Layers className="w-4 h-4 text-ink" strokeWidth={2} />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/70">
                六支家族 · 2022 - 2026
              </span>
            </div>
          </div>
        </div>

        {/* 时间线 SVG */}
        <div className="bg-cream border-2 border-ink rounded-3xl p-5 mb-6 shadow-stamp overflow-x-auto">
          <svg
            viewBox={`0 0 ${TL_W} ${TL_H}`}
            className="w-full h-auto min-w-[640px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <line
              x1={40}
              x2={TL_W - 40}
              y1={TL_H / 2 + 10}
              y2={TL_H / 2 + 10}
              stroke="#241C15"
              strokeWidth={2}
            />
            {[2022, 2023, 2024, 2025, 2026].map((y) => (
              <g key={y}>
                <line
                  x1={tlX(y)}
                  x2={tlX(y)}
                  y1={TL_H / 2 + 6}
                  y2={TL_H / 2 + 14}
                  stroke="#241C15"
                  strokeWidth={1.5}
                />
                <text
                  x={tlX(y)}
                  y={TL_H / 2 + 30}
                  fontFamily="Geist Mono, monospace"
                  fontSize="11"
                  fill="#88837C"
                  textAnchor="middle"
                >
                  {y}
                </text>
              </g>
            ))}
            {FAMILIES.map((f, i) => {
              const on = f.id === activeId;
              return (
                <g
                  key={f.id}
                  onClick={() => setActiveId(f.id)}
                  className="cursor-pointer"
                  transform={`translate(${tlX(f.year)} ${10 + (i % 3) * 14})`}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={on ? 9 : 6}
                    fill={on ? "#FF4D74" : "#F4D35E"}
                    stroke="#241C15"
                    strokeWidth={2}
                  />
                  <text
                    x={12}
                    y={4}
                    fontFamily="Geist Mono, monospace"
                    fontSize={on ? 13 : 11}
                    fontWeight={on ? 700 : 500}
                    fill="#241C15"
                  >
                    {f.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 筛选 chip */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-1">
            筛
          </span>
          {[
            { k: "all" as const, lbl: "全部" },
            { k: "noRM" as const, lbl: "不需要 reward model" },
            { k: "online" as const, lbl: "在线采样" },
            { k: "offline" as const, lbl: "离线监督式" },
          ].map((opt) => {
            const on = opt.k === filter;
            return (
              <button
                key={opt.k}
                onClick={() => setFilter(opt.k)}
                className={[
                  "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]"
                    : "bg-white text-ink/65 hover:bg-butter",
                ].join(" ")}
              >
                {opt.lbl}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[10.5px] text-ink/45 tabular-nums">
            {filtered.length} / {FAMILIES.length} 家
          </span>
        </div>

        {/* 卡片网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((f) => {
            const on = f.id === activeId;
            return (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={[
                  "text-left border-2 border-ink rounded-2xl p-5 transition-all duration-300 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[8px_8px_0_0_#FF4D74] -translate-x-1 -translate-y-1"
                    : "bg-white text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-hover",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-display text-[24px] font-bold leading-none">
                    {f.short}
                  </div>
                  <div
                    className={[
                      "font-mono text-[11px] tabular-nums",
                      on ? "text-cream/55" : "text-ink/45",
                    ].join(" ")}
                  >
                    {f.year}
                  </div>
                </div>
                <div
                  className={[
                    "font-mono text-[10px] uppercase tracking-[0.15em] mb-2",
                    on ? "text-cream/65" : "text-ink/55",
                  ].join(" ")}
                >
                  {f.full}
                </div>
                <p
                  className={[
                    "text-[13px] leading-relaxed",
                    on ? "text-cream/85" : "text-ink/75",
                  ].join(" ")}
                >
                  {f.oneLine}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span
                    className={[
                      "px-2 py-0.5 rounded-full text-[10px] font-mono border-2",
                      on
                        ? "border-cream/40 text-cream/80"
                        : "border-ink/30 text-ink/65",
                    ].join(" ")}
                  >
                    {f.needsRM ? "需要 RM" : "无 RM"}
                  </span>
                  <span
                    className={[
                      "px-2 py-0.5 rounded-full text-[10px] font-mono border-2",
                      on
                        ? "border-cream/40 text-cream/80"
                        : "border-ink/30 text-ink/65",
                    ].join(" ")}
                  >
                    {f.online ? "在线" : "离线"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 详细面板 */}
        <div key={active.id} className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 animate-enter-fade">
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <div className="font-display text-[36px] lg:text-[44px] font-bold text-ink leading-none">
              {active.short}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              {active.full}
            </div>
          </div>
          <p className="text-[15px] text-ink/80 leading-relaxed mb-5 max-w-[70ch]">
            {active.oneLine}
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                谁在用 · 2026
              </div>
              <ul className="space-y-2">
                {active.who.map((w, i) => (
                  <li
                    key={i}
                    className="p-3 bg-white border-2 border-ink rounded-xl"
                  >
                    <div className="font-display text-[14.5px] font-bold text-ink leading-snug">
                      {w.name}
                    </div>
                    <div className="font-sans text-[12.5px] text-ink/70 mt-0.5">
                      {w.how}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                关键数字
              </div>
              <ul className="space-y-2">
                {active.numbers.map((n, i) => (
                  <li
                    key={i}
                    className="flex items-baseline justify-between gap-3 p-3 bg-white border-2 border-ink rounded-xl"
                  >
                    <span className="font-sans text-[13px] text-ink/85 leading-snug">
                      {n.label}
                    </span>
                    <span className="font-mono text-[10.5px] text-ink/55 shrink-0 text-right">
                      {n.value}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10px] text-ink/45 leading-relaxed">
                论文：{active.paper}
              </p>
            </div>
          </div>
        </div>

        {/* 结尾 callout（不鸡汤，是硬规则） */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="p-5 bg-butter border-2 border-ink rounded-2xl shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
              选型 · 风格 / 安全
            </div>
            <p className="font-display text-[16px] font-bold text-ink leading-snug">
              DPO 默认起手。
              <br />
              静态偏好数据、想要训得稳就用它。
            </p>
          </div>
          <div className="p-5 bg-coral border-2 border-ink rounded-2xl shadow-stamp text-cream">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/65 mb-2">
              选型 · 推理 / 工具调用
            </div>
            <p className="font-display text-[16px] font-bold leading-snug">
              GRPO + 规则奖励。
              <br />
              答案能自动判对错的场景，别浪费 RM。
            </p>
          </div>
          <div className="p-5 bg-teal border-2 border-ink rounded-2xl shadow-stamp text-cream">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/65 mb-2">
              选型 · 安全性 / 大规模
            </div>
            <p className="font-display text-[16px] font-bold leading-snug">
              Constitutional AI / RLAIF。
              <br />
              人不够用、规则能写清楚的边界。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFamilies;
