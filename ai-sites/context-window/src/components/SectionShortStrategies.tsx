/**
 * SectionShortStrategies · 短期内 4 种管理策略
 *
 * 主交互（L2 accordion）：
 *   - 4 张卡按顺序铺开（截断 / 压缩 / 摘要 / 工具回声去重）
 *   - 点开看「啥意思 / 优 / 缺 / 啥时候用 / 视觉示意」
 *   - 每张卡里都带一个 before/after 的 SVG mini 示意（不靠脑补）
 *
 * 这一节不进 L3 —— accordion + mini SVG 配纯文本足够说清，不强行加可调参数。
 */
import React, { useState } from "react";
import { Scissors, Layers, BookOpen, FileMinus, ChevronDown, Check, X } from "lucide-react";

type Strategy = {
  id: string;
  num: string;
  name: string;
  en: string;
  oneline: string;
  icon: React.ReactNode;
  pros: string[];
  cons: string[];
  when: string;
  /** before/after 数据：每段一个 token 数 */
  beforeBlocks: Array<{ w: number; fill: string }>;
  afterBlocks: Array<{ w: number; fill: string; pattern?: boolean }>;
};

const STRATS: Strategy[] = [
  {
    id: "truncate",
    num: "01",
    name: "截断",
    en: "TRUNCATION",
    oneline: "直接砍掉最早的若干轮消息。最暴力，也最省事。",
    icon: <Scissors className="w-4 h-4" strokeWidth={2.4} />,
    pros: ["实现最简单，几行代码", "完全不掉延迟", "对模型零侵入"],
    cons: ["早期决策直接消失", "用户偏好那种「说一次记很久」的事最先丢", "没法挽回"],
    when: "短期 chatbot · 单次会话不长 · 早期消息确实没价值的场景",
    beforeBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 16, fill: "#F4D35E" },
      { w: 14, fill: "#7A28CB" },
      { w: 12, fill: "#F4D35E" },
      { w: 14, fill: "#7A28CB" },
      { w: 12, fill: "#F4D35E" },
      { w: 14, fill: "#7A28CB" },
      { w: 10, fill: "#FF4D74" },
    ],
    afterBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 12, fill: "#F4D35E" },
      { w: 14, fill: "#7A28CB" },
      { w: 10, fill: "#FF4D74" },
      { w: 56, fill: "transparent", pattern: true },
    ],
  },
  {
    id: "compress",
    num: "02",
    name: "压缩",
    en: "COMPRESSION",
    oneline: "把早期消息合并 + 删冗余（删空行 / 删重复回声 / 删 verbose log）。",
    icon: <Layers className="w-4 h-4" strokeWidth={2.4} />,
    pros: ["保留所有原始字段", "可逆性比摘要好", "对结构化日志特别有效"],
    cons: ["压缩比有上限，砍 20-40% 就到头", "实现稍复杂，要写规则", "不智能 —— 压不掉「废话但语法上不冗余」"],
    when: "工具结果重复多的 Agent 场景 · 同一份代码反复 cat 这种",
    beforeBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 16, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 12, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 16, fill: "#F4D35E" },
      { w: 12, fill: "#FF4D74" },
    ],
    afterBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 12, fill: "#F4D35E" },
      { w: 10, fill: "#7A28CB" },
      { w: 10, fill: "#F4D35E" },
      { w: 10, fill: "#7A28CB" },
      { w: 12, fill: "#F4D35E" },
      { w: 12, fill: "#FF4D74" },
      { w: 26, fill: "transparent", pattern: true },
    ],
  },
  {
    id: "summarize",
    num: "03",
    name: "摘要",
    en: "SUMMARIZATION",
    oneline: "让另一个 LLM 调用把早期对话摘成 200-500 token 一段，替换原 history。",
    icon: <BookOpen className="w-4 h-4" strokeWidth={2.4} />,
    pros: ["压缩比能到 10× 以上", "能保留语义而不是文本", "适合超长会话"],
    cons: ["要多花一次 LLM 调用 · 增加延迟和成本", "摘要本身可能丢细节 / 引入偏差", "增量摘要反复迭代会语义漂移"],
    when: "长会话 / 长任务的 Agent · 用户允许「记忆模糊但能继续」",
    beforeBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 18, fill: "#F4D35E" },
      { w: 16, fill: "#7A28CB" },
      { w: 14, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 14, fill: "#FF4D74" },
    ],
    afterBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 14, fill: "#E07A5F" },
      { w: 14, fill: "#FF4D74" },
      { w: 64, fill: "transparent", pattern: true },
    ],
  },
  {
    id: "dedup",
    num: "04",
    name: "工具回声去重",
    en: "TOOL ECHO DEDUP",
    oneline: "同一个工具调过两次返回类似结果 —— 保留最新的，把前面那次的 result 字段清空。",
    icon: <FileMinus className="w-4 h-4" strokeWidth={2.4} />,
    pros: ["针对最吃 context 的部分（工具结果）", "几乎零信息损失（工具调用记录还在）", "实现适中：按 tool name + args 哈希就够"],
    cons: ["对话本身的冗余它管不了", "需要判断「类似」的阈值", "极少数场景下旧 result 也有用"],
    when: "几乎所有编程 Agent · 工具回声占比 > 50% 时优先开",
    beforeBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 6, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 6, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 6, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 10, fill: "#FF4D74" },
    ],
    afterBlocks: [
      { w: 8, fill: "#1B4B5A" },
      { w: 6, fill: "#F4D35E" },
      { w: 3, fill: "#7A28CB" },
      { w: 6, fill: "#F4D35E" },
      { w: 3, fill: "#7A28CB" },
      { w: 6, fill: "#F4D35E" },
      { w: 18, fill: "#7A28CB" },
      { w: 10, fill: "#FF4D74" },
      { w: 30, fill: "transparent", pattern: true },
    ],
  },
];

const BarRow: React.FC<{
  blocks: Array<{ w: number; fill: string; pattern?: boolean }>;
}> = ({ blocks }) => {
  const total = blocks.reduce((s, b) => s + b.w, 0);
  return (
    <div className="relative h-7 rounded-md overflow-hidden border-2 border-ink flex">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="relative h-full border-r border-ink/20 last:border-r-0"
          style={{
            width: `${(b.w / total) * 100}%`,
            backgroundColor: b.fill === "transparent" ? "#FBEFE3" : b.fill,
          }}
        >
          {b.pattern && (
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 5px, #241C15 5px, #241C15 6px)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const SectionShortStrategies: React.FC = () => {
  const [openId, setOpenId] = useState<string>(STRATS[3].id);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Strategies · 短期管理</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          快撑爆了 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">4 种压缩 / 砍 / 摘的招</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          这一节只讲「当前会话内」的招，不讲跨会话保存。下面 4 种在生产里常见，
          从最暴力（截断）到最精细（工具回声去重）。
          <span className="font-bold text-ink"> 点开任一条看 before/after。</span>
        </p>

        {/* accordion */}
        <div className="mt-10 space-y-3">
          {STRATS.map((s) => {
            const open = openId === s.id;
            return (
              <div
                key={s.id}
                className={`border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300 ease-spring ${
                  open ? "bg-white shadow-stamp-lg" : "bg-white shadow-stamp"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? "" : s.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="font-mono font-bold text-[11px] tracking-[0.18em] text-ink/55 w-7">
                    {s.num}
                  </span>
                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 border-ink flex-shrink-0 ${
                      open ? "bg-ink text-cream" : "bg-cream text-ink"
                    }`}
                  >
                    {s.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-display font-extrabold text-[20px] text-ink leading-tight">
                        {s.name}
                      </span>
                      <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink/45">
                        {s.en}
                      </span>
                    </div>
                    <p className="font-sans text-[13.5px] text-ink/70 leading-[1.55] mt-0.5">
                      {s.oneline}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-ink flex-shrink-0 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.2}
                  />
                </button>

                {open && (
                  <div className="border-t-2 border-ink/10 px-5 lg:px-7 py-5 lg:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-fade">
                    {/* 左：before/after */}
                    <div className="lg:col-span-7">
                      <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                        before · 原 context
                      </div>
                      <BarRow blocks={s.beforeBlocks} />
                      <div className="my-3 flex items-center gap-2 font-mono text-[11px] text-ink/55">
                        <span className="block w-6 h-px bg-ink/40" />
                        <span>{s.name}</span>
                        <span className="block flex-1 h-px bg-ink/40" />
                      </div>
                      <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                        after · 处理后
                      </div>
                      <BarRow blocks={s.afterBlocks} />
                      <div className="mt-3 flex flex-wrap gap-4 font-mono text-[10px] text-ink/55">
                        <Legend swatch="#1B4B5A" label="system" />
                        <Legend swatch="#F4D35E" label="user/asst" />
                        <Legend swatch="#7A28CB" label="工具回声" />
                        <Legend swatch="#FF4D74" label="本次 user" />
                        <Legend swatch="#FBEFE3" label="腾出" pattern />
                      </div>
                    </div>

                    {/* 右：优缺 + 何时用 */}
                    <div className="lg:col-span-5 space-y-3">
                      <ProsConsList items={s.pros} kind="pro" />
                      <ProsConsList items={s.cons} kind="con" />
                      <div className="bg-butter border-2 border-ink rounded-xl p-3.5">
                        <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/65 mb-1">
                          什么时候用
                        </div>
                        <p className="font-sans text-[13.5px] text-ink leading-[1.55]">
                          {s.when}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="font-serif italic text-[14px] text-ink/65 leading-[1.65] mt-8 max-w-[720px]">
          实际生产里这 4 招常常组合 —— 先去重把工具回声砍掉，
          挤还满就压缩日志，再不行就摘要早期对话，最后才动截断这把刀。
        </p>
      </div>
    </section>
  );
};

const Legend: React.FC<{ swatch: string; label: string; pattern?: boolean }> = ({
  swatch,
  label,
  pattern,
}) => (
  <span className="inline-flex items-center gap-1.5">
    <span
      className="relative inline-block w-3 h-3 rounded-sm border border-ink"
      style={{ backgroundColor: swatch }}
    >
      {pattern && (
        <span
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 2px, #241C15 2px, #241C15 3px)",
          }}
        />
      )}
    </span>
    <span>{label}</span>
  </span>
);

const ProsConsList: React.FC<{ items: string[]; kind: "pro" | "con" }> = ({ items, kind }) => (
  <div>
    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
      {kind === "pro" ? "优" : "缺"}
    </div>
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 font-sans text-[13.5px] text-ink/85 leading-[1.55]">
          {kind === "pro" ? (
            <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" strokeWidth={2.6} />
          ) : (
            <X className="w-4 h-4 text-pop flex-shrink-0 mt-0.5" strokeWidth={2.6} />
          )}
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SectionShortStrategies;
