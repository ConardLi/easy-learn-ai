import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { Database, ExternalLink } from "lucide-react";

const STATS = [
  { label: "源语料", val: "FineWeb-EDU-Dedup", sub: "SmolLM Corpus 子集 · ODC-By 协议" },
  { label: "原始 Token", val: "195 B", sub: "去重后的高质量教育语料" },
  { label: "扩展后", val: "770 B", sub: "每篇 → 5 个重写版本" },
  { label: "等效倍数", val: "3.9×", sub: "通过 judge 筛选后留存" },
];

const REAL_PAIRS = [
  { g: "学术综述", a: "教材编写组" },
  { g: "课堂讲稿", a: "高中科学老师" },
  { g: "亲子读物", a: "小学家长" },
  { g: "技术博客", a: "前端工程师" },
  { g: "新闻消息", a: "晚间档观众" },
  { g: "调研报告", a: "市场分析师" },
  { g: "百科条目", a: "兴趣阅读者" },
  { g: "口播脚本", a: "短视频观众" },
  { g: "FAQ 问答", a: "客服一线" },
  { g: "诗化散文", a: "文学爱好者" },
  { g: "辩论稿", a: "校园演讲选手" },
  { g: "代码注释", a: "代码 reviewer" },
];

export default function SectionCorpus() {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <SectionFrame num="06" label="MGACorpus · 开源数据" background="bg-cream">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        论文带了一份开源数据集：770B token 已上线 HF。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-3xl">
        ByteDance-Seed/mga-fineweb-edu 是论文方法的开放实例，可以直接 load 来研究改写质量、风格分布、或者拿来训自己的小模型。
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="card-stamp p-5 bg-butter/20 hover:bg-butter/40 transition-colors"
          >
            <div className="font-mono text-xs text-ink-tertiary mb-2">{s.label}</div>
            <div className="font-display text-3xl text-ink font-bold mb-2">
              {s.val}
            </div>
            <div className="text-xs text-ink-secondary leading-snug">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
        <div className="card-stamp p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="eyebrow text-ink-tertiary">
              真实采到的 (Genre × Audience) 配对
            </div>
            <span className="font-mono text-xs text-ink-tertiary">
              点开看长什么样
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {REAL_PAIRS.map((p, i) => {
              const active = picked === i;
              return (
                <button
                  key={i}
                  onClick={() => setPicked(active ? null : i)}
                  className={`text-left px-3 py-2.5 rounded-xl border-2 transition-all duration-250 ease-spring ${
                    active
                      ? "bg-ink text-cream border-ink shadow-stamp -translate-y-[1px]"
                      : "bg-butter/10 border-ink/20 hover:border-ink text-ink"
                  }`}
                >
                  <div className="font-semibold text-xs">{p.g}</div>
                  <div className={`text-[10px] mt-0.5 font-mono ${active ? "text-butter" : "text-ink-tertiary"}`}>
                    → {p.a}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-stamp p-6 bg-butter/20 min-h-[280px]">
          {picked === null ? (
            <div className="h-full flex flex-col justify-center text-center text-ink-tertiary py-8">
              <Database className="w-10 h-10 mx-auto mb-3 opacity-60" />
              <p className="font-mono text-sm">
                左侧点一个 (体裁 × 受众) 卡片
              </p>
              <p className="text-xs mt-2">看 MGA 在 FineWeb-EDU 真实采到的写法画风</p>
            </div>
          ) : (
            <div key={picked} className="animate-enter-fade">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-butter border-2 border-ink text-xs font-mono">
                  {REAL_PAIRS[picked].g}
                </span>
                <span className="text-ink-tertiary">→</span>
                <span className="px-3 py-1 rounded-full bg-coral text-white border-2 border-ink text-xs font-mono">
                  {REAL_PAIRS[picked].a}
                </span>
              </div>

              <div className="space-y-3">
                <Trait
                  label="术语密度"
                  value={traitFor(picked, "term")}
                />
                <Trait
                  label="句子长度"
                  value={traitFor(picked, "len")}
                />
                <Trait
                  label="举例频率"
                  value={traitFor(picked, "ex")}
                />
                <Trait
                  label="第二人称口吻"
                  value={traitFor(picked, "you")}
                />
              </div>

              <div className="mt-5 pt-4 border-t border-ink/15 text-xs text-ink-secondary leading-relaxed">
                改写工拿到这两个标签后，会自动调节这四个旋钮。
                这就是为什么同一篇原文给不同 (g,a) 的输出会差别很大。
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 inline-flex">
        <a
          href="https://huggingface.co/datasets/ByteDance-Seed/mga-fineweb-edu"
          target="_blank"
          rel="noreferrer"
          className="btn-stamp bg-ink text-butter"
        >
          <ExternalLink className="w-4 h-4" />
          数据集主页 · HuggingFace
        </a>
      </div>
    </SectionFrame>
  );
}

function Trait({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-mono text-ink-tertiary">{label}</span>
        <span className="font-mono text-xs text-ink">{value}/5</span>
      </div>
      <div className="h-2 bg-white border border-ink/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-ink transition-all duration-400"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function traitFor(idx: number, k: "term" | "len" | "ex" | "you") {
  const TABLE: Record<number, Record<string, number>> = {
    0: { term: 5, len: 4, ex: 2, you: 1 },
    1: { term: 3, len: 3, ex: 4, you: 2 },
    2: { term: 1, len: 2, ex: 5, you: 4 },
    3: { term: 4, len: 3, ex: 4, you: 3 },
    4: { term: 2, len: 2, ex: 3, you: 1 },
    5: { term: 4, len: 4, ex: 3, you: 2 },
    6: { term: 3, len: 3, ex: 2, you: 1 },
    7: { term: 1, len: 1, ex: 4, you: 5 },
    8: { term: 2, len: 1, ex: 3, you: 5 },
    9: { term: 2, len: 4, ex: 4, you: 3 },
    10: { term: 3, len: 3, ex: 4, you: 5 },
    11: { term: 5, len: 2, ex: 2, you: 1 },
  };
  return TABLE[idx][k];
}
