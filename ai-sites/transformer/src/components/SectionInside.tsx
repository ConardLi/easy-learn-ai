/**
 * Section 05 · 「Transformer block 里还有什么」
 *
 * 两个独立交互（L3 + L3）：
 *   ① 位置编码 toggle：sin/cos · learned · RoPE → 看 8 个位置的向量长什么样
 *   ② 多头数 stepper：1 · 2 · 4 · 8 · 16 → 看每个 head 学到了什么不同的关系
 *
 * 故意不放 attention 矩阵热力图（bert 已用）。
 * 跟 nlp 的 tokenizer 三栏对比也不同（那是切词，这是位置 / 多头）。
 */
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

type PosMode = "sincos" | "learned" | "rope";
const POS_OPTIONS: { id: PosMode; label: string; tag: string; note: string; source: string }[] =
  [
    {
      id: "sincos",
      label: "Sinusoidal",
      tag: "原版 · 2017",
      note: "用不同频率的 sin / cos 直接算位置向量。优点：可外推到没见过的长度。",
      source: "arXiv:1706.03762 § 3.5",
    },
    {
      id: "learned",
      label: "Learned",
      tag: "BERT · GPT-1/2",
      note: "每个位置一个可训练的 embedding 向量，跟词 embedding 一起学。简单暴力，但只能用到 max_len。",
      source: "BERT arXiv:1810.04805",
    },
    {
      id: "rope",
      label: "RoPE",
      tag: "现在主流 · 2021+",
      note: "把位置信息塞进 Q 和 K 的比较里 —— 给它们的向量按位置转一个角度，第几位转多少度固定。这样两个词一比较就自带了「隔多远」。Llama / Qwen / Mistral / DeepSeek / ModernBERT 全用。",
      source: "Su et al. arXiv:2104.09864",
    },
  ];

/** 用伪随机生成 8 个位置 × 8 维 的位置向量，按模式不同看起来差异明显 */
function posVector(pos: number, dim: number, mode: PosMode): number {
  if (mode === "sincos") {
    /* PE(pos, 2i) = sin(pos / 10000^(2i/d_model)) */
    const isEven = dim % 2 === 0;
    const half = Math.floor(dim / 2);
    const freq = 1 / Math.pow(10000, (2 * half) / 8);
    return isEven ? Math.sin(pos * freq) : Math.cos(pos * freq);
  }
  if (mode === "learned") {
    /* 完全随机，每位置每维都不同 */
    const seed = Math.sin(pos * 73.71 + dim * 19.13) * 13.7;
    return (seed - Math.floor(seed)) * 2 - 1;
  }
  /* rope：模拟旋转，每个 dim pair (2i, 2i+1) 共享角度 */
  const pair = Math.floor(dim / 2);
  const angle = pos / Math.pow(8000, pair / 4);
  return dim % 2 === 0 ? Math.cos(angle) : Math.sin(angle);
}

/* multi-head 配置：每个 head 关注什么 */
type HeadProfile = {
  focus: string;
  /** 这个 head 在示例句子里 attention 最高的 top-2 token */
  attends: string[];
};
const SENT = ["猫", "坐", "在", "沙发", "上"];

/** 给定 head 总数，返回每个 head 学到了什么。
 *  数据是合理的语义猜测（不是真实模型读取出来的） */
function profilesFor(headCount: number): HeadProfile[] {
  const POOL: HeadProfile[] = [
    { focus: "全局平均 · 类似一句话主旨", attends: ["猫", "坐"] },
    { focus: "主谓关系 · 主语连到动作", attends: ["猫", "坐"] },
    { focus: "动宾 · 动作连到承接词", attends: ["坐", "在"] },
    { focus: "方位 · 物体连到位置标记", attends: ["在", "沙发"] },
    { focus: "上下文 · 修饰词连到所修饰", attends: ["沙发", "上"] },
    { focus: "句末 / 标点 · 边界感知", attends: ["上", "猫"] },
    { focus: "代词共指 · 解 「它 / 这」", attends: ["猫", "沙发"] },
    { focus: "对称关系 · 句首 ↔ 句末", attends: ["猫", "上"] },
    { focus: "局部 N-gram · 邻居耦合", attends: ["在", "上"] },
    { focus: "重音 / 关键词 · 名词偏重", attends: ["猫", "沙发"] },
    { focus: "动词时态 · 当下 / 过去", attends: ["坐"] },
    { focus: "情绪 / 风格 · 中性 / 描述", attends: ["猫"] },
    { focus: "数词 / 量化 · 「一只 / 五个」", attends: ["猫"] },
    { focus: "对比 / 转折 · 「但 / 然而」", attends: ["在"] },
    { focus: "话题 · 主体内容延续", attends: ["沙发", "上"] },
    { focus: "稀疏门控 · 多数位置不激活", attends: ["猫"] },
  ];
  return POOL.slice(0, headCount);
}

const HEAD_OPTIONS = [1, 2, 4, 8, 16];

const SectionInside: React.FC = () => {
  const [posMode, setPosMode] = useState<PosMode>("rope");
  const [headIdx, setHeadIdx] = useState(3); // default 8

  const headCount = HEAD_OPTIONS[headIdx];
  const profiles = profilesFor(headCount);
  const posMeta = POS_OPTIONS.find((p) => p.id === posMode)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Inside the block</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              一个 block 里还塞了
              <br />
              位置编码 + 多头。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              上一节 Q/K/V 那套算法本身不认先后顺序 —— 把句子里的词打乱，算出来一样。所以要单独给每个位置加一个位置向量，告诉模型谁在前谁在后。然后把 attention 复制 8/16 份并行跑，每份学一种不同的关系 —— 叫 multi-head。除此之外，每个 block 里 attention 之后还有一块「前馈网络（FFN）」，负责把每个词的信息再单独加工一遍 —— 后来 MoE 换掉的就是这块（见《MoE》站）。
            </p>
          </div>
        </div>

        {/* === 块 1：位置编码 === */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7 mb-8">
          <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
            <div>
              <div className="font-display text-[18px] font-bold text-ink leading-tight">
                位置编码 · 给 attention 加上「这个词在第几位」
              </div>
              <p className="mt-1 text-[13px] text-ink/65">
                3 种方案，2017 → 2026 主流换了两轮。
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POS_OPTIONS.map((p) => {
                const on = p.id === posMode;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPosMode(p.id)}
                    className={[
                      "inline-flex flex-col items-start px-3 py-1.5 rounded-xl border-2 border-ink font-mono text-[10px] font-bold tracking-wide transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                        : "bg-white text-ink/75 hover:bg-cream",
                    ].join(" ")}
                  >
                    <span>{p.label}</span>
                    <span
                      className={[
                        "text-[8.5px] mt-0.5",
                        on ? "opacity-70" : "text-ink/45",
                      ].join(" ")}
                    >
                      {p.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8 个位置向量可视化 */}
          <div className="px-3 py-3 bg-cream border-2 border-ink rounded-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-3">
              8 个位置 × 8 维 · 颜色越深 = 越正
            </div>
            <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
              {Array.from({ length: 8 }).map((_, pos) => (
                <React.Fragment key={`pos-${pos}`}>
                  <div className="font-mono text-[11px] font-bold text-ink/65 text-right">
                    pos {pos}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 8 }).map((_, dim) => {
                      const v = posVector(pos, dim, posMode);
                      const intensity = (v + 1) / 2; // 0~1
                      return (
                        <div
                          key={dim}
                          className="flex-1 h-6 rounded-sm border border-ink/15 transition-all duration-400 ease-spring"
                          style={{
                            backgroundColor:
                              v >= 0
                                ? `rgba(36, 28, 21, ${0.15 + intensity * 0.7})`
                                : `rgba(224, 122, 95, ${0.15 + (1 - intensity) * 0.7})`,
                          }}
                          title={`d${dim} · ${v.toFixed(2)}`}
                        />
                      );
                    })}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 font-mono text-[10px] text-ink/55">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-ink/80" />
                正值
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-coral/80" />
                负值
              </span>
            </div>
          </div>

          <p className="mt-3 text-[13.5px] text-ink/70 leading-relaxed">
            {posMeta.note}
          </p>
          <p className="mt-1.5 font-mono text-[10px] text-ink/45">
            来源：{posMeta.source}
          </p>
        </div>

        {/* === 块 2：multi-head === */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
          <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
            <div>
              <div className="font-display text-[18px] font-bold text-ink leading-tight">
                多头 · 把 attention 复制 N 份 并行学不同关系
              </div>
              <p className="mt-1 text-[13px] text-ink/65">
                一头 → 八头 → 十六头，关注的语义被劈得越来越细。
              </p>
            </div>

            {/* stepper */}
            <div className="inline-flex items-center gap-2 bg-cream border-2 border-ink rounded-full p-1.5">
              <button
                onClick={() => setHeadIdx((i) => Math.max(0, i - 1))}
                disabled={headIdx === 0}
                aria-label="减少头数"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-ink bg-white text-ink hover:bg-butter disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-250"
              >
                <Minus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
              <div className="flex items-baseline gap-1 px-3 min-w-[64px] justify-center">
                <span className="font-display text-[24px] font-bold text-ink tabular-nums leading-none">
                  {headCount}
                </span>
                <span className="font-mono text-[10px] text-ink/55">heads</span>
              </div>
              <button
                onClick={() => setHeadIdx((i) => Math.min(HEAD_OPTIONS.length - 1, i + 1))}
                disabled={headIdx === HEAD_OPTIONS.length - 1}
                aria-label="增加头数"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-ink bg-white text-ink hover:bg-butter disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-250"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* 当前句子 */}
          <div className="mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
              示例句子
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SENT.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 rounded-md border-2 border-ink bg-cream font-display text-[13px] font-bold text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* head 卡阵列 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {profiles.map((p, i) => (
              <div
                key={`h-${i}`}
                className="px-3 py-2.5 bg-cream border-2 border-ink rounded-xl animate-enter-pop"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
                    head {i + 1}
                  </div>
                  <div className="font-mono text-[9px] text-ink/40">
                    d_k = {Math.floor(512 / headCount)}
                  </div>
                </div>
                <div className="font-display text-[12.5px] font-bold text-ink leading-snug mb-2">
                  {p.focus}
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.attends.map((tok, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center px-1.5 py-0.5 rounded bg-ink text-cream font-display text-[10.5px] font-bold"
                    >
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* footer 统计 */}
          <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-3 gap-3">
            <Stat label="head 总数" value={`${headCount}`} />
            <Stat
              label="每头 d_k"
              value={`${Math.floor(512 / headCount)}`}
              sub="d_model 512 平分"
            />
            <Stat
              label="参数量影响"
              value="≈ 持平"
              sub="每头 d_k 缩小，总参数 ~ d_model²"
            />
          </div>

          <p className="mt-4 font-mono text-[10px] text-ink/45 leading-relaxed">
            head 数和总维度 d_model 互斥：d_model = head × d_k。Llama 3 70B 用 64 head（d_k=128），GPT-2 用 12 head（d_k=64）。这里 head 学到的语义是合理估计，不是直接读模型。
          </p>
        </div>
      </div>
    </section>
  );
};

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="px-3 py-2.5 bg-cream border-2 border-ink/15 rounded-lg">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
        {label}
      </div>
      <div className="font-display text-[18px] font-bold text-ink tabular-nums leading-tight">
        {value}
      </div>
      {sub && (
        <div className="font-mono text-[9px] text-ink/40 mt-0.5">{sub}</div>
      )}
    </div>
  );
}

export default SectionInside;
