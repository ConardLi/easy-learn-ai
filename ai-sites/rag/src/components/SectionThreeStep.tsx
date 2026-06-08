/**
 * Section 03 · RAG 三步循环（核心交互）
 *
 * 三个步骤：Retrieve → Augment → Generate
 * 用户点「下一步 / 上一步」逐步推进，看到一个真实问题怎么被
 * 一步步「查资料 → 拼上下文 → 让模型作答」处理完。
 *
 * 用具象例子：公司 HR 手册问年假天数。初学者一眼能懂。
 */
import React, { useState } from "react";
import {
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  FileText,
  ExternalLink,
} from "lucide-react";

type DocChunk = {
  id: string;
  title: string;
  body: string;
  /** 与问题语义相似度（0~1），用来排序 */
  score: number;
};

const QUESTION = "刚入职的员工有多少天年假？";

const CORPUS: DocChunk[] = [
  {
    id: "hr-04",
    title: "HR 手册 · 第 4 章 · 假期制度",
    body:
      "入职满 1 年以下的员工享有 5 天带薪年假；满 1～5 年享 10 天；满 5 年以上享 15 天。新入职员工首年按月折算。",
    score: 0.91,
  },
  {
    id: "hr-04b",
    title: "HR 手册 · 第 4 章 · 申请流程",
    body:
      "年假需在系统中提前 3 个工作日提交申请，由直接主管审批。法定节假日不占用年假额度。",
    score: 0.74,
  },
  {
    id: "hr-12",
    title: "HR 手册 · 第 12 章 · 病假",
    body:
      "病假需提供二甲及以上医院证明，连续 3 天以上须有诊断说明。病假与年假不可互相抵扣。",
    score: 0.36,
  },
  {
    id: "fin-02",
    title: "财务制度 · 第 2 章 · 报销",
    body:
      "差旅报销需在出差结束后 7 个工作日内提交，附发票原件与审批单。",
    score: 0.08,
  },
  {
    id: "onboard-01",
    title: "新员工入职指引",
    body:
      "入职第一周由 HR 集中培训，包括公司文化、安全规范、IT 工具使用、福利政策概览。",
    score: 0.21,
  },
];

const SORTED = [...CORPUS].sort((a, b) => b.score - a.score);
const TOP_K = 3;

const SectionThreeStep: React.FC = () => {
  const [step, setStep] = useState(0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* anchor */}
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">the core loop</span>
        </div>

        {/* H2 */}
        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          整个 RAG，只有{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">三步</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-3">
          <strong className="text-ink/85">检索</strong>找到相关资料，
          <strong className="text-ink/85">增强</strong>把资料塞进提示词，
          <strong className="text-ink/85">生成</strong>让模型读完资料再回答。
          点下面的按钮，一步步走一遍。
        </p>
        <p className="max-w-2xl text-ink/60 text-[14.5px] mb-10">
          第一步「检索」也叫<strong className="text-ink/80">召回（retrieval）</strong>：
          从资料库里先捞出一批可能相关的段落。
        </p>

        {/* 顶部问题 + 控制 */}
        <div className="mb-8 p-5 lg:p-6 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                user query · 用户提问
              </div>
              <p className="font-display text-[18px] lg:text-[20px] font-bold text-ink">
                «&nbsp;{QUESTION}&nbsp;»
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-ink shadow-stamp disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream transition-all"
                aria-label="上一步"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                disabled={step === 2}
                className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp font-mono text-[11px] uppercase tracking-[0.15em] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-coral hover:text-cream transition-all"
              >
                {step < 2 ? "下一步" : "已完成"}
                {step < 2 && <ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
              </button>
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-ink shadow-stamp hover:bg-cream transition-all"
                aria-label="重新开始"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* 三步指示器 */}
        <StepIndicator step={step} onJump={setStep} />

        {/* 步骤内容 */}
        <div className="mt-8">
          {step === 0 && <StepRetrieve />}
          {step === 1 && <StepAugment />}
          {step === 2 && <StepGenerate />}
        </div>
      </div>
    </section>
  );
};

/* ---------- 步骤指示器 ---------- */

const STEPS = [
  { id: 0, label: "检索", subtitle: "Retrieve", icon: <Search className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 1, label: "增强", subtitle: "Augment", icon: <Layers className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 2, label: "生成", subtitle: "Generate", icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} /> },
];

const StepIndicator: React.FC<{ step: number; onJump: (s: number) => void }> = ({
  step,
  onJump,
}) => {
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((s, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <React.Fragment key={s.id}>
            <button
              onClick={() => onJump(s.id)}
              className={[
                "flex items-center gap-2.5 px-4 py-2.5 rounded-full border-2 border-ink transition-all duration-300",
                active
                  ? "bg-butter shadow-stamp"
                  : done
                  ? "bg-teal text-cream shadow-stamp"
                  : "bg-white text-ink/55 hover:bg-cream",
              ].join(" ")}
            >
              <span
                className={[
                  "flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold font-mono border-2 border-ink",
                  active ? "bg-ink text-cream" : done ? "bg-cream text-teal" : "bg-cream text-ink/55",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <span className="font-display font-bold text-[14px]">{s.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] hidden sm:inline opacity-70">
                {s.subtitle}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 bg-ink/15 max-w-12">
                <div
                  className="h-full bg-ink transition-all duration-500"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ---------- Step 1 · Retrieve ---------- */

const StepRetrieve: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-6">
      {/* 左：embedding 示意 */}
      <div className="lg:col-span-5 p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
          ① 把问题变成向量
        </div>
        <p className="text-[13.5px] text-ink/70 leading-relaxed mb-4">
          先用 embedding 模型把问题变成一串数字（向量）。
          意思相近的问题，数字也会相近。
        </p>
        <div className="font-mono text-[10.5px] text-ink/65 p-3 bg-cream rounded-lg border border-ink/15 break-all leading-relaxed">
          <span className="text-coral">{`>`}</span> embed("{QUESTION}")
          <br />
          <span className="text-teal">→</span> [0.12, -0.84, 0.31, 0.05, -0.27, … ]{" "}
          <span className="text-ink/40">（共 1024 维）</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-ink/55 font-mono">
          <div className="w-2 h-2 bg-butter border border-ink rounded-full" />
          类似工具：text-embedding-3 / Voyage-3 / BGE-M3
        </div>
      </div>

      {/* 右：相似度排序的文档 */}
      <div className="lg:col-span-7 p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
        <div className="flex items-baseline justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
            ② 在向量库里按相似度排序，取 top {TOP_K}
          </div>
          <div className="font-mono text-[10px] text-ink/45">{SORTED.length} 份候选</div>
        </div>
        <p className="text-[12px] text-ink/55 leading-relaxed mb-3">
          所有资料都提前用同样的方式变成了向量、存进一个能按意思搜的库 ——
          这就是<strong className="text-ink/75">向量数据库</strong>。提问的向量进来，它就找出数字最接近的几条。
        </p>
        <a
          href="../vector-database/index.html"
          className="mb-3 inline-flex items-start gap-3 rounded-2xl border-2 border-ink bg-butter px-4 py-3 shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
            <ExternalLink className="h-3.5 w-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="text-[12.5px] leading-relaxed text-ink/70">
            <span className="font-bold text-ink">向量库怎么存、怎么搜？</span>{" "}
            去《向量数据库》单独看。
          </span>
        </a>
        <ul className="space-y-2">
          {SORTED.map((doc, i) => {
            const picked = i < TOP_K;
            return (
              <li
                key={doc.id}
                className={[
                  "relative flex items-start gap-3 px-3 py-2.5 rounded-xl border-2 transition-all",
                  picked
                    ? "bg-butter/40 border-ink shadow-[3px_3px_0_0_#241C15]"
                    : "bg-cream/50 border-ink/15",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold font-mono border-2 border-ink",
                    picked ? "bg-ink text-cream" : "bg-white text-ink/50",
                  ].join(" ")}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-display text-[13.5px] font-bold text-ink truncate">
                      {doc.title}
                    </div>
                    <div
                      className={[
                        "shrink-0 font-mono text-[10.5px] font-semibold",
                        picked ? "text-ink" : "text-ink/40",
                      ].join(" ")}
                    >
                      {doc.score.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-[12px] text-ink/60 mt-0.5 line-clamp-1">
                    {doc.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[11.5px] font-mono text-ink/45">
          ↑ 前 {TOP_K} 份会被送进下一步。剩下的虽然存在，但本次不相关。
        </p>
      </div>
    </div>
  );
};

/* ---------- Step 2 · Augment ---------- */

const StepAugment: React.FC = () => {
  const top = SORTED.slice(0, TOP_K);
  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5">
        <div className="p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
            把检索结果拼进 prompt
          </div>
          <p className="text-[13.5px] text-ink/70 leading-relaxed mb-3">
            「增强」这名字听着唬人，做的事就是
            <strong className="text-ink">把刚才捞出来的文档塞进提示词</strong>，
            告诉模型：「请根据下面这些材料回答。」
          </p>
          <p className="text-[12.5px] text-ink/55 leading-relaxed">
            模型本身一点没改，只是把搜到的段落塞进了它的输入里。
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1.5 bg-cream border border-ink/15 rounded-full">
            <Layers className="w-3 h-3" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65">
              prompt = system + context + question
            </span>
          </div>
        </div>
      </div>

      {/* 右：prompt 组装可视化 */}
      <div className="lg:col-span-7 p-5 bg-ink text-cream rounded-2xl shadow-stamp-lg border-2 border-ink">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/55">
            assembled prompt
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-coral" />
            <div className="w-2 h-2 rounded-full bg-butter" />
            <div className="w-2 h-2 rounded-full bg-teal" />
          </div>
        </div>

        <div className="space-y-3 font-mono text-[12px] leading-relaxed">
          {/* system */}
          <div className="px-3 py-2 bg-cream/8 border border-cream/15 rounded-md">
            <div className="text-[9px] uppercase tracking-[0.18em] text-butter/80 mb-1">
              system
            </div>
            <span className="text-cream/85">
              你是一名 HR 助手。请根据下面提供的资料回答问题，不要编。
            </span>
          </div>

          {/* context */}
          <div className="px-3 py-2 bg-butter/15 border-2 border-butter/30 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase tracking-[0.18em] text-butter">
                context · 检索到的 {TOP_K} 段
              </span>
              <FileText className="w-3 h-3 text-butter" />
            </div>
            <div className="space-y-2">
              {top.map((doc) => (
                <div key={doc.id} className="text-cream/80 text-[11.5px]">
                  <span className="text-butter/80">[{doc.id}]</span> {doc.body}
                </div>
              ))}
            </div>
          </div>

          {/* user */}
          <div className="px-3 py-2 bg-coral/15 border border-coral/30 rounded-md">
            <div className="text-[9px] uppercase tracking-[0.18em] text-coral mb-1">
              user
            </div>
            <span className="text-cream">{QUESTION}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Step 3 · Generate ---------- */

const StepGenerate: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
          模型基于提供的资料作答
        </div>
        <p className="text-[13.5px] text-ink/70 leading-relaxed mb-3">
          现在模型不需要「凭空想」，它的输入里已经有了具体材料。
          它只需要在材料里找答案、组织语言、加上引用。
        </p>
        <p className="text-[12.5px] text-ink/55 leading-relaxed">
          回答里的<strong className="text-ink/75">脚注角标</strong>表示它引用了哪段 ——
          这是 RAG 相比裸 LLM 多出来的关键能力：<strong className="text-ink/75">可追溯</strong>。
        </p>
      </div>

      <div className="lg:col-span-7 p-6 bg-cream border-2 border-ink rounded-2xl shadow-stamp-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-teal text-cream flex items-center justify-center border-2 border-ink">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
          <div className="font-display text-[14px] font-bold text-ink">模型回答</div>
        </div>

        <div className="text-[15px] text-ink leading-relaxed space-y-3">
          <p>
            刚入职不满 1 年的员工享有{" "}
            <span className="font-bold text-coral">5 天带薪年假</span>
            <Footnote n={1} />
            。首年按入职月份折算 ——
            比如 6 月入职，当年大约可享 5 × (7/12) ≈ <strong>3 天</strong>。
          </p>
          <p className="text-[13.5px] text-ink/65">
            另外，年假需要在系统里提前 3 个工作日提交申请，由直接主管审批
            <Footnote n={2} />。法定节假日不占年假额度。
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-ink/15">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-2">
            sources
          </div>
          <ul className="space-y-1">
            <li className="text-[11.5px] text-ink/65 font-mono">
              [1] HR 手册 · 第 4 章 · 假期制度
            </li>
            <li className="text-[11.5px] text-ink/65 font-mono">
              [2] HR 手册 · 第 4 章 · 申请流程
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Footnote: React.FC<{ n: number }> = ({ n }) => (
  <sup className="inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 mx-0.5 bg-ink text-cream rounded-full font-mono text-[9px] font-bold align-super">
    {n}
  </sup>
);

export default SectionThreeStep;
