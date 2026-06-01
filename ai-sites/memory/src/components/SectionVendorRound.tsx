/**
 * SectionVendorRound · 业界三家方案
 *
 * 主交互（L3 勾选 + 条件结论）：
 *   - 用户勾选自己在意的维度（透明度 / 自动化 / 复杂推理 / 上手快）
 *   - 实时给三家打分 + 推荐排第一的
 *
 * 跟相邻 SectionLifecycle（trace + chips hover）拉开。
 */
import React, { useMemo, useState } from "react";
import { Check } from "lucide-react";

type VendorId = "memgpt" | "mem0" | "claudecode";

type Vendor = {
  id: VendorId;
  name: string;
  tagline: string;
  tone: string; // 卡片配色
  manager: string;
  storage: string;
  retrieval: string;
  scenario: string;
  scores: Record<DimId, number>;
};

type DimId =
  | "transparency"
  | "automation"
  | "reasoning"
  | "easy"
  | "lowDeps"
  | "scaling";

type Dim = {
  id: DimId;
  label: string;
  hint: string;
};

const DIMS: Dim[] = [
  { id: "transparency", label: "记忆透明度高", hint: "随时打开看 / 改 / 删" },
  { id: "automation", label: "自动化提取检索", hint: "不用 Agent 自己判断要不要记" },
  { id: "reasoning", label: "支持复杂推理", hint: "多跳问题 / 时序推断" },
  { id: "easy", label: "上手快", hint: "几小时跑起来" },
  { id: "lowDeps", label: "低依赖", hint: "不需要向量库 / 图谱引擎" },
  { id: "scaling", label: "大规模可扩展", hint: "记忆量 ↑ 不变笨拙" },
];

const VENDORS: Vendor[] = [
  {
    id: "memgpt",
    name: "MemGPT / Letta",
    tagline: "操作系统隐喻 · Agent 自管记忆",
    tone: "bg-coral text-white",
    manager: "Agent 自己",
    storage: "分层（Core / Recall / Archival）",
    retrieval: "Agent 主动调搜索工具",
    scenario: "需要复杂记忆推理的 Agent",
    scores: {
      transparency: 2,
      automation: 1,
      reasoning: 3,
      easy: 1,
      lowDeps: 2,
      scaling: 2,
    },
  },
  {
    id: "mem0",
    name: "Mem0",
    tagline: "提取 + 向量 + 图谱 · 系统自动管",
    tone: "bg-teal text-white",
    manager: "系统自动",
    storage: "向量 + 知识图谱（Mem0-Graph）",
    retrieval: "自动语义检索 + LOCOMO 实测打赢全量 context",
    scenario: "需要自动化记忆管理的产品",
    scores: {
      transparency: 1,
      automation: 3,
      reasoning: 2,
      easy: 2,
      lowDeps: 1,
      scaling: 3,
    },
  },
  {
    id: "claudecode",
    name: "Claude Code",
    tagline: "纯文件系统 · markdown 即记忆",
    tone: "bg-butter text-ink",
    manager: "Agent + 用户手动",
    storage: "CLAUDE.md / ~/.claude/CLAUDE.md / memory.md 索引",
    retrieval: "文件读取 + 启动时自动注入",
    scenario: "开发者工具、本地 Agent",
    scores: {
      transparency: 3,
      automation: 1,
      reasoning: 1,
      easy: 3,
      lowDeps: 3,
      scaling: 1,
    },
  },
];

const SectionVendorRound: React.FC = () => {
  const [picked, setPicked] = useState<Set<DimId>>(new Set());

  const toggle = (id: DimId) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const ranked = useMemo(() => {
    if (picked.size === 0)
      return VENDORS.map((v) => ({ ...v, score: 0 }));
    return VENDORS.map((v) => {
      const score = Array.from(picked).reduce(
        (sum, dim) => sum + v.scores[dim],
        0,
      );
      return { ...v, score };
    }).sort((a, b) => b.score - a.score);
  }, [picked]);

  const top = picked.size > 0 ? ranked[0] : null;
  const maxScore = picked.size * 3;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Vendors · 业界三家</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          业界三家方案 ——
          <br />
          按你的{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">需求维度</span>
          </span>{" "}
          挑一家。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          MemGPT 让 Agent 自管，Mem0 做自动化提取检索，Claude Code 走文件系统极简路线。
          没有标准答案 —— 取决于你最在意什么。
          <span className="font-bold text-ink"> 勾几个维度看看。</span>
        </p>

        {/* ─── 维度勾选 ─── */}
        <div className="mt-10 card-stamp p-6">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
            你最在意哪几条？（多选）
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {DIMS.map((dim) => {
              const on = picked.has(dim.id);
              return (
                <button
                  type="button"
                  key={dim.id}
                  onClick={() => toggle(dim.id)}
                  className={`text-left px-4 py-3 border-2 border-ink rounded-2xl transition-all duration-250 ease-spring flex items-start gap-3 ${
                    on
                      ? "bg-ink text-cream shadow-stamp-lg"
                      : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center ${
                      on ? "border-cream bg-butter" : "border-ink/40"
                    }`}
                  >
                    {on && <Check className="w-3 h-3 text-ink" strokeWidth={3} />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-display font-bold text-[14px] block leading-tight">
                      {dim.label}
                    </span>
                    <span className={`font-mono text-[10.5px] tracking-[0.04em] block mt-1 ${on ? "text-cream/65" : "text-ink/55"}`}>
                      {dim.hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {top && (
            <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/25 flex items-center gap-4 animate-enter-fade">
              <div className="flex-shrink-0 px-3 py-1.5 bg-ink text-cream font-mono text-[11px] tracking-[0.22em] uppercase rounded-full">
                按你的勾选 · 最匹配
              </div>
              <div className="flex-1">
                <div className="font-display font-extrabold text-[20px] text-ink">
                  {top.name}
                </div>
                <div className="font-sans text-[13.5px] text-ink/65 mt-0.5">
                  {top.tagline}
                </div>
              </div>
              <div className="font-mono text-[11px] text-ink/55 hidden md:block">
                {top.score} / {maxScore}
              </div>
            </div>
          )}
        </div>

        {/* ─── 三家卡片：根据排名变高亮 ─── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {ranked.map((v, idx) => {
            const isTop = top && top.id === v.id;
            return (
              <div
                key={v.id}
                className={`relative border-2 border-ink rounded-3xl overflow-hidden transition-all duration-300 ease-spring ${
                  isTop
                    ? "shadow-stamp-xl translate-x-[-2px] translate-y-[-2px]"
                    : "shadow-stamp"
                } ${top && !isTop ? "opacity-65" : ""}`}
              >
                {/* 头条 */}
                <div className={`${v.tone} px-5 py-4 border-b-2 border-ink`}>
                  <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase opacity-75">
                    Vendor {String(VENDORS.findIndex((x) => x.id === v.id) + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display font-extrabold text-[22px] leading-tight mt-0.5">
                    {v.name}
                  </div>
                  <div className="font-sans text-[13px] mt-1 opacity-90">
                    {v.tagline}
                  </div>
                </div>
                {/* 详情 */}
                <div className="bg-white p-5 space-y-3">
                  <Row k="记忆管理者">{v.manager}</Row>
                  <Row k="存储方式">{v.storage}</Row>
                  <Row k="检索方式">{v.retrieval}</Row>
                  <Row k="适合场景">{v.scenario}</Row>

                  {/* 6 维 mini bar */}
                  <div className="pt-3 mt-3 border-t-2 border-dashed border-ink/15">
                    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
                      6 维评分
                    </div>
                    <div className="space-y-1.5">
                      {DIMS.map((d) => {
                        const score = v.scores[d.id];
                        const highlighted = picked.has(d.id);
                        return (
                          <div key={d.id} className="flex items-center gap-2">
                            <span className={`font-mono text-[10.5px] flex-1 truncate ${highlighted ? "font-bold text-ink" : "text-ink/60"}`}>
                              {d.label}
                            </span>
                            <span className="flex gap-0.5">
                              {[1, 2, 3].map((n) => (
                                <span
                                  key={n}
                                  className={`w-2 h-3 rounded-sm ${
                                    n <= score
                                      ? highlighted
                                        ? "bg-pop"
                                        : "bg-ink/85"
                                      : "bg-ink/10"
                                  }`}
                                />
                              ))}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {isTop && (
                  <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-pop text-white border-2 border-ink rounded-full font-mono text-[10.5px] tracking-[0.18em] uppercase shadow-stamp">
                    ★ 推荐
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Mem0 实测亮点（独立 callout） ─── */}
        <div className="mt-10 max-w-[820px] bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 flex items-start gap-5">
          <div className="flex-shrink-0 px-3 py-1.5 bg-butter text-ink font-mono text-[10.5px] tracking-[0.22em] uppercase rounded-full">
            实测
          </div>
          <p className="font-sans text-[14.5px] leading-[1.7] text-cream/90 flex-1">
            <span className="font-bold text-butter">Mem0 在 LOCOMO benchmark 上打赢了全量 context 方案 </span>
            —— 用更少的 token 拿到了更高准确率。
            <span className="font-bold text-cream">少塞文字、多记重点</span>
            ，测下来比直接全塞效果更好 —— 记忆工程值得做。
          </p>
        </div>
      </div>
    </section>
  );
};

const Row: React.FC<{ k: string; children: React.ReactNode }> = ({ k, children }) => (
  <div>
    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/45 mb-0.5">
      {k}
    </div>
    <div className="font-sans text-[13.5px] text-ink/85 leading-[1.55]">
      {children}
    </div>
  </div>
);

export default SectionVendorRound;
