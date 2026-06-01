/**
 * Section 04 · 「同一套骨架，3 种装法」
 *
 * Transformer 原版是 encoder-decoder（翻译任务），后来分家：
 *   ─ encoder-only：BERT / RoBERTa / DeBERTa · 理解 / 抽取 / 检索
 *   ─ decoder-only：GPT / Claude / Gemini / Llama / Qwen · 生成 / 对话
 *   ─ encoder-decoder：T5 / BART / mT5 · 翻译 / 摘要 / seq2seq
 *
 * 用户做什么：pill 切换 3 种 → 看：
 *   ─ 手写 SVG 架构图（信息流方向）
 *   ─ 擅长任务 + 输入输出例子
 *   ─ 代表模型 chip 阵列
 *   ─ 反直觉数据（如「2026 年 95% 商用 LLM 都是 decoder-only」）
 *
 * 跟 bert Section 04 「下游换 head」最大区别：
 *   ─ 那个是 BERT body 不动 + 头部换；
 *   ─ 这个是「整套架构」对比，关注是 encoder / decoder 谁存在
 */
import React, { useState } from "react";

type ArchId = "enc" | "dec" | "encdec";

type Arch = {
  id: ArchId;
  name: string;
  subtitle: string;
  flow: string;
  good: string[];
  example: { input: string; output: string };
  /** 代表模型 */
  models: { name: string; year: string; org: string }[];
  /** 反直觉数据 */
  factTitle: string;
  fact: string;
  factSource: string;
};

const ARCHS: Arch[] = [
  {
    id: "enc",
    name: "Encoder-only",
    subtitle: "双向：左右一起看，把句子读懂，不生成新句子",
    flow: "encoder",
    good: ["分类 · 抽实体 · 句对相似度", "搜索召回 · 文档去重", "embedding 服务（句向量）"],
    example: {
      input: "这家店的拌面 80 块一碗",
      output: "标签：负面 · 0.94",
    },
    models: [
      { name: "BERT", year: "2018", org: "Google" },
      { name: "RoBERTa", year: "2019", org: "Meta" },
      { name: "DeBERTa-v3", year: "2021", org: "Microsoft" },
      { name: "ModernBERT", year: "2024-12", org: "Answer.AI" },
    ],
    factTitle: "用量仍很大",
    fact: "2024 年 12 月发布的 ModernBERT 把上下文从 512 扩到 8K，HuggingFace 月下载量进 top 10。企业 RAG / 搜索 / 反作弊还在用 encoder。",
    factSource: "HuggingFace blog 2024-12-19 · arXiv:2412.13663",
  },
  {
    id: "dec",
    name: "Decoder-only",
    subtitle: "从左往右预测下一个 token",
    flow: "decoder",
    good: ["对话 · 写文章 · 代码补全", "推理 / agent 工具调用", "几乎所有 ChatGPT 式产品"],
    example: {
      input: "今天天气真好，我想…",
      output: "「出去跑步」(p=0.42) · 「去公园散步」(p=0.21) · …",
    },
    models: [
      { name: "GPT-5", year: "2025-08", org: "OpenAI" },
      { name: "Claude Opus 4.6", year: "2026-02", org: "Anthropic" },
      { name: "Gemini 2.5 Pro", year: "2025-06", org: "Google" },
      { name: "Llama 4", year: "2025-04", org: "Meta" },
      { name: "Qwen 3", year: "2025-04", org: "Alibaba" },
      { name: "DeepSeek V3.2", year: "2025-09", org: "DeepSeek" },
    ],
    factTitle: "压倒性占比",
    fact: "2026 年商用第一梯队 LLM 几乎全是 decoder-only：架构简单 · KV cache 可复用 · 一个模型同时能聊天和写代码。",
    factSource: "2026 LLM landscape · 各家发布 blog 汇总",
  },
  {
    id: "encdec",
    name: "Encoder-decoder",
    subtitle: "一边读、一边生成；写每个字时回头看读到的内容（cross-attention）",
    flow: "both",
    good: ["翻译 · 摘要 · 文本改写", "图像 caption · 语音转文字", "需要严格「输入 → 转换 → 输出」的任务"],
    example: {
      input: "translate en→zh: The cat sat on the sofa.",
      output: "猫坐在沙发上。",
    },
    models: [
      { name: "Transformer 原版", year: "2017", org: "Google Brain" },
      { name: "T5", year: "2019", org: "Google" },
      { name: "BART", year: "2019", org: "Meta" },
      { name: "Whisper", year: "2022", org: "OpenAI" },
      { name: "Flan-T5", year: "2022", org: "Google" },
    ],
    factTitle: "用得少但没死",
    fact: "通用 LLM 战场被 decoder-only 拿下后，encoder-decoder 退到「输入输出域不同」的场景：翻译、语音、多模态 caption。Whisper、SeamlessM4T 都是这一支。",
    factSource: "T5 arXiv:1910.10683 · Whisper 2022-09 OpenAI",
  },
];

const SectionArch3: React.FC = () => {
  const [activeId, setActiveId] = useState<ArchId>("dec");
  const active = ARCHS.find((a) => a.id === activeId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Three architectures</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              同一套骨架，
              <br />
              拆成 3 种装法。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              2017 原版 transformer 是 encoder-decoder（做翻译用）。后来 BERT 只取左半边，GPT 只取右半边 —— 一棵树长成了三个分支，各占山头。
            </p>
          </div>
        </div>

        {/* 固定铺垫：先把 4 个词说清，再切 pill */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {[
            { t: "encoder 编码器", d: "读输入：把整句理解成一组数字。" },
            { t: "decoder 解码器", d: "写输出：一个字一个字往外蹦。" },
            { t: "自回归", d: "写出一个字，再根据已写的猜下一个，从左往右。" },
            { t: "因果 mask", d: "写第 3 个字时不许偷看第 4 个字 —— 它还没生成。" },
          ].map((x) => (
            <div
              key={x.t}
              className="px-3.5 py-3 bg-cream border-2 border-ink rounded-2xl shadow-[2px_2px_0_0_#241C15]"
            >
              <div className="font-display text-[13.5px] font-bold text-ink mb-1">
                {x.t}
              </div>
              <p className="text-[12.5px] text-ink/70 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>

        {/* pill 切换 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ARCHS.map((a) => {
            const on = a.id === activeId;
            return (
              <button
                key={a.id}
                onClick={() => setActiveId(a.id)}
                className={[
                  "px-4 py-2.5 rounded-full border-2 border-ink font-display text-[14px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                    : "bg-white text-ink/75 hover:bg-butter hover:-translate-y-[1px] hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {a.name}
              </button>
            );
          })}
        </div>

        {/* 主视图 */}
        <div
          key={active.id}
          className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8 animate-enter-up"
        >
          <div className="grid lg:grid-cols-12 gap-7">
            {/* 左：手写 SVG 架构图 */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                信息怎么流
              </div>
              <ArchSVG flow={active.flow} />
              <p className="mt-2 font-display text-[16px] font-bold text-ink leading-snug">
                {active.subtitle}
              </p>
            </div>

            {/* 右：擅长 + 例子 + 模型 */}
            <div className="lg:col-span-7 space-y-5">
              {/* 擅长 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  擅长干什么
                </div>
                <ul className="space-y-1.5">
                  {active.good.map((g, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14.5px] text-ink leading-relaxed"
                    >
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 输入输出例子 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="px-3 py-2.5 bg-cream border-2 border-ink/15 rounded-lg">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 mb-1">
                    输入
                  </div>
                  <div className="font-mono text-[12.5px] text-ink leading-snug">
                    {active.example.input}
                  </div>
                </div>
                <div className="px-3 py-2.5 bg-butter/35 border-2 border-ink/15 rounded-lg">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 mb-1">
                    输出
                  </div>
                  <div className="font-mono text-[12.5px] text-ink leading-snug">
                    {active.example.output}
                  </div>
                </div>
              </div>

              {/* 代表模型 chip 阵列 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  代表模型
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.models.map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-baseline gap-1.5 px-2.5 py-1.5 bg-white border-2 border-ink rounded-md font-display text-[12px] font-bold text-ink shadow-[2px_2px_0_0_#241C15] animate-enter-pop"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span>{m.name}</span>
                      <span className="font-mono text-[9.5px] text-ink/55">
                        {m.year} · {m.org}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 底栏：反直觉数据 */}
          <div className="mt-7 pt-5 border-t border-ink/10 px-4 py-3 bg-ink text-cream rounded-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-1">
              {active.factTitle}
            </div>
            <p className="text-[14px] leading-relaxed">{active.fact}</p>
            <p className="mt-2 font-mono text-[10px] text-cream/55">
              来源：{active.factSource}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 手写 SVG：3 种架构数据流图 */
function ArchSVG({ flow }: { flow: string }) {
  return (
    <svg viewBox="0 0 320 280" className="w-full h-auto" aria-hidden>
      {/* 输入 token 行（底部） */}
      <g>
        <rect
          x="20"
          y="245"
          width="280"
          height="22"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="160"
          y="260"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="1.2"
        >
          INPUT TOKENS
        </text>
      </g>

      {/* 输出 token 行（顶部） */}
      <g>
        <rect
          x="20"
          y="14"
          width="280"
          height="22"
          rx="6"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="1.75"
        />
        <text
          x="160"
          y="29"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="1.2"
        >
          {flow === "encoder" ? "EMBEDDING / LABEL" : flow === "decoder" ? "NEXT TOKEN" : "TARGET TOKENS"}
        </text>
      </g>

      {/* 中间 block 区 */}
      {flow === "encoder" && (
        <g>
          {/* encoder 6 层堆叠 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={`e-${i}`}
              x="60"
              y={56 + i * 26}
              width="200"
              height="20"
              rx="4"
              fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
              stroke="#241C15"
              strokeWidth="1.5"
            />
          ))}
          <text
            x="160"
            y="70"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#88837C"
            letterSpacing="0.8"
          >
            encoder · 双向 attention
          </text>
          <text
            x="270"
            y="200"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#1B4B5A"
            letterSpacing="0.8"
          >
            × 6/12/24
          </text>
        </g>
      )}

      {flow === "decoder" && (
        <g>
          {/* decoder 6 层堆叠 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={`d-${i}`}
              x="60"
              y={56 + i * 26}
              width="200"
              height="20"
              rx="4"
              fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
              stroke="#241C15"
              strokeWidth="1.5"
            />
          ))}
          <text
            x="160"
            y="70"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#88837C"
            letterSpacing="0.8"
          >
            decoder · 因果 mask · 只看左边
          </text>
          <text
            x="270"
            y="200"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#E07A5F"
            letterSpacing="0.8"
          >
            × 32/80/96
          </text>
          {/* 自回归 loop 箭头 */}
          <path
            d="M 36 28 Q 14 130 36 240"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            className="animate-dash-flow"
          />
          <polygon points="32,236 36,244 40,236" fill="#E07A5F" />
          <text
            x="14"
            y="135"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8"
            fill="#E07A5F"
            letterSpacing="0.8"
            transform="rotate(-90, 14, 135)"
          >
            自回归
          </text>
        </g>
      )}

      {flow === "both" && (
        <g>
          {/* encoder 左 4 层 */}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect
              key={`be-${i}`}
              x="40"
              y={70 + i * 30}
              width="100"
              height="22"
              rx="4"
              fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
              stroke="#241C15"
              strokeWidth="1.5"
            />
          ))}
          <text
            x="90"
            y="84"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#1B4B5A"
            letterSpacing="0.8"
          >
            encoder
          </text>
          {/* decoder 右 4 层 */}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect
              key={`bd-${i}`}
              x="180"
              y={70 + i * 30}
              width="100"
              height="22"
              rx="4"
              fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
              stroke="#241C15"
              strokeWidth="1.5"
            />
          ))}
          <text
            x="230"
            y="84"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill="#E07A5F"
            letterSpacing="0.8"
          >
            decoder
          </text>
          {/* cross-attention 箭头 encoder → decoder */}
          {Array.from({ length: 4 }).map((_, i) => (
            <line
              key={`x-${i}`}
              x1="140"
              y1={81 + i * 30}
              x2="180"
              y2={81 + i * 30}
              stroke="#241C15"
              strokeWidth="1.5"
              strokeDasharray="3 2"
              className="animate-dash-flow"
            />
          ))}
          <text
            x="160"
            y="206"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fill="#88837C"
            letterSpacing="0.6"
          >
            cross-attention
          </text>
        </g>
      )}

      {/* 底部 → block 连线 */}
      <line
        x1="160"
        y1="244"
        x2="160"
        y2="232"
        stroke="#241C15"
        strokeWidth="1.5"
      />
      <line
        x1="160"
        y1="44"
        x2="160"
        y2="56"
        stroke="#241C15"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default SectionArch3;
