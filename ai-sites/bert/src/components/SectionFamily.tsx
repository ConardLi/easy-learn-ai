/**
 * Section 05 · 「BERT 家族 6 年」
 *
 * 一条横向时间线，6 个节点。点击任一节点展开：
 *   ─ 参数 / 改动了什么 / GLUE 跑分
 * 下方手写 SVG 画 GLUE 跑分演化趋势（不是 recharts，是 SVG polyline）。
 *
 * 跟其他站时间线区别（区别于 LLM 站的 6 年时间线和 NLP 站的 70 年时间线）：
 *   ─ 只看 encoder-only 这一支
 *   ─ 焦点是「每一代到底改了哪个零件」，不是参数狂飙
 */
import React, { useState } from "react";

type Member = {
  id: string;
  name: string;
  date: string;
  org: string;
  params: string;
  /** GLUE-avg 跑分（用统一坐标） · 0~100 */
  glue: number;
  /** 显式标识跑分用的报告口径 */
  glueNote: string;
  /** 这一代改了什么 */
  changes: string[];
  /** 引用 */
  ref: string;
  /** 时间线节点颜色 */
  tone: "ink" | "coral" | "teal" | "butter";
};

const FAMILY: Member[] = [
  {
    id: "bert",
    name: "BERT",
    date: "2018-10",
    org: "Google",
    params: "110M / 340M",
    glue: 80.5,
    glueNote: "BERT-large · Devlin et al. 2018",
    changes: [
      "Transformer encoder × 12/24 层",
      "MLM + NSP 双任务预训练",
      "WordPiece 30,522 vocab · 512 max seq",
      "BookCorpus + Wikipedia · 共 33 亿词",
    ],
    ref: "arXiv:1810.04805",
    tone: "ink",
  },
  {
    id: "roberta",
    name: "RoBERTa",
    date: "2019-07",
    org: "Meta AI",
    params: "125M / 355M",
    glue: 88.5,
    glueNote: "RoBERTa-large · Liu et al. 2019",
    changes: [
      "砍掉 NSP（实验证明无用）",
      "训练数据从 13 GB 扩到 160 GB",
      "batch 256 → 8K · 步数 100K → 500K",
      "动态 mask（每个 epoch 重新选要 mask 的词）",
    ],
    ref: "arXiv:1907.11692",
    tone: "coral",
  },
  {
    id: "distil",
    name: "DistilBERT",
    date: "2019-10",
    org: "HuggingFace",
    params: "66M",
    glue: 77.0,
    glueNote: "GLUE-dev · Sanh et al. 2019",
    changes: [
      "知识蒸馏：teacher = BERT-base",
      "层数 12 → 6，参数 减少 40%",
      "推理快 60%，跑分保留 97%",
      "至今 HF 月下载 4000 万+，企业部署默认款",
    ],
    ref: "arXiv:1910.01108",
    tone: "butter",
  },
  {
    id: "albert",
    name: "ALBERT",
    date: "2019-09",
    org: "Google",
    params: "12M / 235M",
    glue: 89.4,
    glueNote: "ALBERT-xxlarge · Lan et al. 2019",
    changes: [
      "跨层参数共享（12 层共用一份权重）",
      "Embedding 矩阵分解 V×H → V×E + E×H",
      "NSP → SOP（句序预测），更难一些",
      "参数减但效果增，证明 BERT 训练欠拟合",
    ],
    ref: "arXiv:1909.11942",
    tone: "teal",
  },
  {
    id: "deberta3",
    name: "DeBERTa-v3",
    date: "2021-11",
    org: "Microsoft",
    params: "86M / 304M / 1.5B",
    glue: 91.4,
    glueNote: "DeBERTa-v3-large · He et al. 2021",
    changes: [
      "Disentangled attention：内容向量 + 相对位置向量分开",
      "MLM → RTD（ELECTRA 风格的判别式预训练）",
      "Gradient-disentangled embedding sharing",
      "SuperGLUE 首个超过人类（DeBERTa-v2 1.5B）",
    ],
    ref: "arXiv:2111.09543",
    tone: "ink",
  },
  {
    id: "modern",
    name: "ModernBERT",
    date: "2024-12",
    org: "Answer.AI · LightOn",
    params: "149M / 395M",
    glue: 88.4,
    glueNote: "ModernBERT-large · Warner et al. 2024",
    changes: [
      "8,192 tokens 上下文（旧版只有 512）",
      "RoPE 位置编码 + 局部/全局交替 attention",
      "Flash Attention 2/3 + 训练时 unpadding 加速",
      "2 万亿 tokens 训练，含大量代码",
    ],
    ref: "arXiv:2412.13663",
    tone: "coral",
  },
];

const DOT_TONE: Record<Member["tone"], string> = {
  ink: "bg-ink text-cream",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  butter: "bg-butter text-ink",
};

const SectionFamily: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FAMILY[activeIdx];

  /* SVG 折线参数 */
  const W = 560;
  const H = 120;
  const padX = 24;
  const padY = 16;
  const minG = 75;
  const maxG = 92;

  const points = FAMILY.map((m, i) => {
    const x = padX + (i * (W - 2 * padX)) / (FAMILY.length - 1);
    const y = padY + ((maxG - m.glue) / (maxG - minG)) * (H - 2 * padY);
    return { x, y, m, i };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Family · 6 years</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              一棵树，6 年长出了 6 代。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              没人扔掉 BERT，每一代都在原地改一个零件 —— 砍 NSP、压参数、换 attention、加上下文长度。2024 年 12 月，<strong>ModernBERT</strong> 把过去 6 年 LLM 圈学到的东西灌回 encoder，老 BERT 又能打了。
            </p>
          </div>
        </div>

        {/* 时间线节点条 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          {/* 横向 6 个节点 */}
          <div className="relative mb-7">
            {/* 时间轴底线 */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-ink/15" />
            <div className="relative grid grid-cols-6 gap-1">
              {FAMILY.map((m, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveIdx(i)}
                    className="flex flex-col items-center group"
                  >
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 mb-2">
                      {m.date}
                    </span>
                    <span
                      className={[
                        "w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ease-spring",
                        isActive
                          ? `${DOT_TONE[m.tone]} shadow-[3px_3px_0_0_#241C15] scale-110`
                          : "bg-white text-ink/65 group-hover:bg-cream group-hover:-translate-y-[1px]",
                      ].join(" ")}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={[
                        "font-display text-[12px] font-bold mt-2 text-center px-1 transition-colors",
                        isActive ? "text-ink" : "text-ink/55",
                      ].join(" ")}
                    >
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 折线图：GLUE-avg 演化 */}
          <div className="mb-7 px-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              GLUE-avg 演化（large 版口径）
            </div>
            <p className="text-[12.5px] text-ink/65 leading-relaxed mb-3">
              GLUE = 一批英文 NLP 任务打包成的考试（判断句子情感、两句是否同义等），分数越高越强。
            </p>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              {/* 水平网格 */}
              {[80, 85, 90].map((g) => {
                const y = padY + ((maxG - g) / (maxG - minG)) * (H - 2 * padY);
                return (
                  <g key={g}>
                    <line
                      x1={padX}
                      y1={y}
                      x2={W - padX}
                      y2={y}
                      stroke="#241C15"
                      strokeWidth="0.5"
                      opacity="0.12"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={padX - 4}
                      y={y + 3}
                      textAnchor="end"
                      fontFamily="Geist Mono, monospace"
                      fontSize="8"
                      fill="#88837C"
                    >
                      {g}
                    </text>
                  </g>
                );
              })}

              {/* 折线 */}
              <polyline
                points={polyline}
                fill="none"
                stroke="#241C15"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* 节点 */}
              {points.map((p) => {
                const isActive = p.i === activeIdx;
                return (
                  <g key={`p-${p.i}`}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 6 : 4}
                      fill={
                        p.m.tone === "ink"
                          ? "#241C15"
                          : p.m.tone === "coral"
                            ? "#E07A5F"
                            : p.m.tone === "teal"
                              ? "#1B4B5A"
                              : "#F4D35E"
                      }
                      stroke="#241C15"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActiveIdx(p.i)}
                    />
                    {/* 跑分数字 */}
                    <text
                      x={p.x}
                      y={p.y - 9}
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize={isActive ? "10" : "8.5"}
                      fontWeight={isActive ? "800" : "600"}
                      fill="#241C15"
                    >
                      {p.m.glue.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="mt-1 font-mono text-[9.5px] text-ink/40">
              注：DistilBERT 是 base 蒸馏版，跑分参考 base 行；ModernBERT 设计偏向 retrieval，GLUE 取 HF blog 2024-12-19 报告。
            </p>
          </div>

          {/* 当前选中的家族成员详情 */}
          <div
            key={active.id}
            className="grid lg:grid-cols-12 gap-6 pt-6 border-t-2 border-ink/10 animate-enter-up"
          >
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                {active.date} · {active.org}
              </div>
              <div className="font-display text-[32px] font-bold text-ink leading-tight mb-3">
                {active.name}
              </div>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-cream border-2 border-ink/20 rounded-lg">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
                    参数
                  </div>
                  <div className="font-display text-[18px] font-bold text-ink">
                    {active.params}
                  </div>
                </div>
                <div className="px-3 py-2 bg-cream border-2 border-ink/20 rounded-lg">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
                    GLUE-avg
                  </div>
                  <div className="font-display text-[18px] font-bold text-ink tabular-nums">
                    {active.glue.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                这一代改了什么
              </div>
              <ul className="space-y-2.5">
                {active.changes.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-enter-fade"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                    <span className="text-[14.5px] text-ink leading-relaxed">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] text-ink/45">
                {active.glueNote} · {active.ref}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFamily;
