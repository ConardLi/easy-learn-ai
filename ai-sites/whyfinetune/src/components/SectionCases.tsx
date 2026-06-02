/**
 * Section 07 · Cases · 把案例分到三个桶里
 *
 * L3 拖拽风分类。用户点选 chip → 点 bucket → 系统判对错。错了给一句正解原因。
 * 12 个真实案例（产品文档 / 翻译 / 客服 / 代码 / 财报 / JSON / 风格 / 推理）。
 *
 * 不复制 cases 列表静态展示。强制用户做决策、做错改正、最后看自己几分。
 */
import React, { useState, useMemo } from "react";
import { Check, X, RotateCcw, ExternalLink } from "lucide-react";

type ForkKey = "context" | "rag" | "finetune";

interface CaseItem {
  id: string;
  text: string;
  answer: ForkKey;
  why: string;
}

const CASES: CaseItem[] = [
  {
    id: "c1",
    text: "把所有客服回复改成简体粤式口吻",
    answer: "finetune",
    why: "风格 = 行为，1000 条数据训进去最稳",
  },
  {
    id: "c2",
    text: "答 5 万份产品手册的问题，每周加新品",
    answer: "rag",
    why: "动态知识 + 体量大，索引随更新生效",
  },
  {
    id: "c3",
    text: "一次性 review 这份 60 页投资协议",
    answer: "context",
    why: "单文档 · 一次性，塞 prompt 不查不训",
  },
  {
    id: "c4",
    text: "实时财报 QA，需要给出文档段落出处",
    answer: "rag",
    why: "动态 + 可溯源，正是 RAG 的强项",
  },
  {
    id: "c5",
    text: "所有响应必须严格符合一个 JSON schema",
    answer: "finetune",
    why: "格式是行为，FT 把 schema 锁进权重永不漂",
  },
  {
    id: "c6",
    text: "把 3 页报告里关键人物列成表格",
    answer: "context",
    why: "上下文很短 + 一次性，prompt 直接来",
  },
  {
    id: "c7",
    text: "公司全部 SQL 表结构 + 200 篇 BI 报告问答",
    answer: "rag",
    why: "100+ 文档，每次只用其中几篇，RAG 检索",
  },
  {
    id: "c8",
    text: "教模型用医生独有的诊断推理顺序",
    answer: "finetune",
    why: "推理 rhythm 用 prompt 写不清，靠权重内化",
  },
  {
    id: "c9",
    text: "支持中-小学的 100 道历史选择题在线测验",
    answer: "context",
    why: "题量小 + 知识稳定，few-shot 就够",
  },
  {
    id: "c10",
    text: "10 万条工单分类到 8 个意图标签",
    answer: "finetune",
    why: "稳定分类任务 + 10w 数据，FT 最快最便宜",
  },
  {
    id: "c11",
    text: "答用户：「我能退货吗？」基于公司 200 页政策",
    answer: "rag",
    why: "查事实 + 政策季度更新，FT 容易编新条款",
  },
  {
    id: "c12",
    text: "翻译这份 8 页技术文档（要术语一致）",
    answer: "context",
    why: "单文档一次性，术语写 prompt 里就够",
  },
];

const FORK_META: Record<
  ForkKey,
  { name: string; sub: string; bgClass: string; ringClass: string }
> = {
  context: {
    name: "长 context",
    sub: "塞 prompt",
    bgClass: "bg-butter",
    ringClass: "ring-butter",
  },
  rag: {
    name: "RAG",
    sub: "让它去查",
    bgClass: "bg-coral",
    ringClass: "ring-coral",
  },
  finetune: {
    name: "微调",
    sub: "改它的权重",
    bgClass: "bg-teal",
    ringClass: "ring-teal",
  },
};

interface FeedbackState {
  caseId: string;
  correct: boolean;
  yourPick: ForkKey;
  truth: ForkKey;
  why: string;
}

const SectionCases: React.FC = () => {
  // placement: caseId → bucket | null
  const [placement, setPlacement] = useState<Record<string, ForkKey | null>>(
    () => Object.fromEntries(CASES.map((c) => [c.id, null])),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const placedCount = Object.values(placement).filter((v) => v !== null).length;
  const correctCount = useMemo(
    () =>
      CASES.filter(
        (c) => placement[c.id] !== null && placement[c.id] === c.answer,
      ).length,
    [placement],
  );

  const allDone = placedCount === CASES.length;

  // 未分类的 cases
  const pool = CASES.filter((c) => placement[c.id] === null);
  const byBucket: Record<ForkKey, CaseItem[]> = {
    context: CASES.filter((c) => placement[c.id] === "context"),
    rag: CASES.filter((c) => placement[c.id] === "rag"),
    finetune: CASES.filter((c) => placement[c.id] === "finetune"),
  };

  function handleDrop(bucket: ForkKey) {
    if (!selectedId) return;
    const c = CASES.find((x) => x.id === selectedId)!;
    const correct = c.answer === bucket;
    if (correct) {
      setPlacement({ ...placement, [c.id]: bucket });
      setFeedback({
        caseId: c.id,
        correct: true,
        yourPick: bucket,
        truth: c.answer,
        why: c.why,
      });
    } else {
      // 错了：原地不动，给反馈
      setFeedback({
        caseId: c.id,
        correct: false,
        yourPick: bucket,
        truth: c.answer,
        why: c.why,
      });
    }
    setSelectedId(null);
    setTimeout(() => setFeedback(null), 3200);
  }

  function reset() {
    setPlacement(Object.fromEntries(CASES.map((c) => [c.id, null])));
    setSelectedId(null);
    setFeedback(null);
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:pt-28 lg:pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">drag · test</span>
        </div>

        <h2 className="font-display text-display-lg text-ink max-w-3xl mb-3">
          12 道真实场景，你来分桶
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-7">
          先点一个案例，再点下方 3 个桶之一。放错会告诉你哪档才是正解 + 一句理由。
          看你能拿几分。
        </p>

        {/* 进度条 */}
        <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span className="font-display font-bold text-[22px] text-ink tabular-nums">
              {correctCount}
              <span className="font-mono text-[14px] text-ink/40 font-normal">
                /{CASES.length}
              </span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
              {allDone ? "全部分桶完成" : `还剩 ${pool.length} 个未分`}
            </span>
          </div>
          <button
            onClick={reset}
            disabled={placedCount === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink bg-white text-ink hover:bg-cream transition-all duration-200 text-[12px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
            重新来
          </button>
        </div>
        <div className="h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15 mb-7">
          <div
            className="h-full bg-pop transition-all duration-400 ease-spring"
            style={{ width: `${(placedCount / CASES.length) * 100}%` }}
          />
        </div>

        {/* 反馈条 */}
        {feedback && (
          <div
            className={[
              "mb-6 px-4 py-3 rounded-2xl border-2 border-ink flex items-start gap-3 animate-enter-up",
              feedback.correct ? "bg-butter-tint" : "bg-coral/15",
            ].join(" ")}
          >
            <span
              className={[
                "inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-ink shrink-0",
                feedback.correct ? "bg-teal text-cream" : "bg-coral text-white",
              ].join(" ")}
            >
              {feedback.correct ? (
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              ) : (
                <X className="w-3.5 h-3.5" strokeWidth={3} />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-[14px] text-ink leading-snug">
                {feedback.correct ? "对了" : "差一点"}
                <span className="font-normal text-ink/60 ml-2">
                  正解 ·{" "}
                  <span className="font-bold">
                    {FORK_META[feedback.truth].name}
                  </span>
                </span>
              </div>
              <div className="text-[12.5px] text-ink/75 mt-0.5 leading-snug">
                {feedback.why}
              </div>
            </div>
          </div>
        )}

        {/* 未分类池 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 mb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-3">
            ① 点一个案例
          </div>
          {pool.length === 0 ? (
            <div className="py-6 text-center font-mono text-[12px] text-ink/45">
              池子空了 · 翻到下面看看每桶都装了啥
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pool.map((c) => {
                const on = selectedId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() =>
                      setSelectedId(on ? null : c.id)
                    }
                    className={[
                      "px-3 py-2 rounded-xl border-2 border-ink text-left transition-all duration-200 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-stamp -translate-y-0.5"
                        : "bg-cream/60 text-ink hover:bg-butter-tint",
                    ].join(" ")}
                  >
                    <span className="font-semibold text-[12.5px] leading-snug">
                      {c.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 三个 bucket */}
        <div className="grid md:grid-cols-3 gap-4">
          {(["context", "rag", "finetune"] as ForkKey[]).map((k) => {
            const meta = FORK_META[k];
            const items = byBucket[k];
            const hot = selectedId !== null;
            return (
              <button
                key={k}
                onClick={() => handleDrop(k)}
                disabled={!selectedId}
                className={[
                  "card-stamp p-4 text-left min-h-[180px] flex flex-col transition-all duration-300",
                  hot
                    ? "ring-4 ring-offset-2 ring-offset-cream cursor-pointer hover:-translate-y-1 " +
                      meta.ringClass
                    : "cursor-default",
                ].join(" ")}
              >
                {/* bucket 顶 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-ink ${meta.bgClass}`} />
                    <span className="font-display font-bold text-[15px] text-ink">
                      {meta.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-ink/50 tabular-nums">
                    {items.length}
                  </span>
                </div>

                {/* 桶里的 chip */}
                <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                  {items.length === 0 ? (
                    <div
                      className={[
                        "w-full text-center py-6 font-mono text-[10.5px] uppercase tracking-[0.18em] rounded-lg border-2 border-dashed border-ink/25",
                        hot ? "text-ink/65 bg-cream/40" : "text-ink/30",
                      ].join(" ")}
                    >
                      {hot ? "点这里放进来" : "空桶"}
                    </div>
                  ) : (
                    items.map((c) => (
                      <span
                        key={c.id}
                        className="px-2 py-1 bg-cream border border-ink/20 rounded-md text-[11.5px] text-ink/85 leading-snug"
                      >
                        {c.text}
                      </span>
                    ))
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 全部完成的结尾硬规则 */}
        {allDone && (
          <div className="mt-10 p-6 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl animate-enter-up">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-2">
              三条硬规则
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <div className="font-display font-bold text-[16px] mb-1.5">
                  教事实，用 RAG
                </div>
                <p className="text-[13px] text-cream/75 leading-snug">
                  事实灌权重容易幻觉，且每次更新都重训。
                  能溯源的需求几乎只能是 RAG。
                </p>
              </div>
              <div>
                <div className="font-display font-bold text-[16px] mb-1.5">
                  教行为，用 FT
                </div>
                <p className="text-[13px] text-cream/75 leading-snug">
                  格式、风格、口吻、固定流程——这些靠 prompt 撑不住长会话，
                  只能锁进权重。
                </p>
              </div>
              <div>
                <div className="font-display font-bold text-[16px] mb-1.5">
                  一次性 · 短文档，用长 context
                </div>
                <p className="text-[13px] text-cream/75 leading-snug">
                  低于 50 万 token 的单文档、单任务，
                  prompt 直接塞最省事，不上 RAG 不上 FT。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 链条收尾：选好了去哪 */}
        <div className="mt-12 pt-8 border-t-2 border-ink/10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-4">
            选好了？下一步去这儿
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="../finetune/index.html"
              className="inline-flex items-start gap-3 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">决定微调了？</span>
                <span className="text-ink/70">
                  {" "}
                  下一步是选方法——全参、LoRA 还是 QLoRA。去《微调方法》挑一种。
                </span>
              </span>
            </a>
            <a
              href="../rag/index.html"
              className="inline-flex items-start gap-3 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">决定用 RAG？</span>
                <span className="text-ink/70">
                  {" "}
                  怎么搭一套「先搜再答」的系统，去《RAG》那一站讲透。
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCases;
