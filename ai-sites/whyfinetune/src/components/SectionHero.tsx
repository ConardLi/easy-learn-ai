/**
 * Section 01 · Hero
 *
 * 反模板：Hero 右卡不放"概念说明图"，放一个 mini 三选一决策器。
 * 用户进站 1 秒：左边读到「为什么要微调」的定义，右边点 5 个真实场景，
 * 立刻看到「这个场景 → 哪档亮 / 哪档 ok / 哪档不推荐」+ 一句理由。
 *
 * 这块 mini decider 是整站的入口；后面 SectionDiagnose 是它的"大版"。
 */
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";

type ForkKey = "context" | "rag" | "finetune";
type Verdict = "pick" | "ok" | "no";

interface Scenario {
  id: string;
  label: string;
  hint: string;
  verdicts: Record<ForkKey, { v: Verdict; why: string }>;
}

const SCENARIOS: Scenario[] = [
  {
    id: "pdf",
    label: "答 200 份公司 PDF",
    hint: "知识量大 · 半年小改 · 要溯源",
    verdicts: {
      context: { v: "no", why: "塞不下 200 份 + 每次重读太贵" },
      rag: { v: "pick", why: "建一次索引，能更新、能给页码" },
      finetune: { v: "no", why: "事实灌权重 → 容易幻觉" },
    },
  },
  {
    id: "json",
    label: "所有回答转固定 JSON",
    hint: "教行为 · 不教事实",
    verdicts: {
      context: { v: "ok", why: "塞 few-shot 能用，但漂移" },
      rag: { v: "no", why: "格式是行为，RAG 解决不了" },
      finetune: { v: "pick", why: "把 schema 锁进权重，永远不漂" },
    },
  },
  {
    id: "contract",
    label: "review 这份 80 页合同",
    hint: "一次性 · 单文档",
    verdicts: {
      context: { v: "pick", why: "20 万 token 一次塞完 · 零开发" },
      rag: { v: "ok", why: "切片有信息损失，单文档没必要" },
      finetune: { v: "no", why: "一次性任务，训了用不上第二次" },
    },
  },
  {
    id: "news",
    label: "实时财报问答",
    hint: "动态 · 高频更新 · 要引用",
    verdicts: {
      context: { v: "no", why: "数据按小时变，prompt 永远过期" },
      rag: { v: "pick", why: "改一行索引就生效，能贴原文" },
      finetune: { v: "no", why: "每次新数据都要重训" },
    },
  },
  {
    id: "tone",
    label: "客服回复全切粤式口吻",
    hint: "教风格 · 长期跑",
    verdicts: {
      context: { v: "ok", why: "few-shot 顶 70 分，长会话会漂" },
      rag: { v: "no", why: "风格不是文档，检索没用" },
      finetune: { v: "pick", why: "把口吻锁进权重，1000 条数据就够" },
    },
  },
];

const VERDICT_STYLE: Record<Verdict, { dot: string; ring: string; label: string; tone: string }> = {
  pick: { dot: "bg-teal", ring: "ring-2 ring-teal", label: "选这档", tone: "text-teal" },
  ok: { dot: "bg-butter-deep", ring: "ring-1 ring-ink/30", label: "凑合", tone: "text-ink/60" },
  no: { dot: "bg-coral", ring: "ring-1 ring-ink/15", label: "别用", tone: "text-coral" },
};

const FORK_META: Record<ForkKey, { name: string; sub: string }> = {
  context: { name: "长 context", sub: "塞 prompt" },
  rag: { name: "RAG", sub: "让它去查" },
  finetune: { name: "微调", sub: "改它的权重" },
};

const SectionHero: React.FC = () => {
  const [scenarioId, setScenarioId] = useState<string>("pdf");
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[8%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Long context · RAG · Fine-tune · 三选一
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-7 animate-enter-up leading-[1.04]">
              为什么
              <br />
              要微调？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  微调是改 LLM 自己的权重，让它学一件新事——和塞 prompt、RAG 并列的三选一。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                你有 100 个公司 PDF，想让 LLM 帮你答。三个选项摆在桌上：每次把全部资料塞进 prompt、建索引让它现查、拿数据训它一次。
              </p>
              <p>
                第一档叫长 context，零开发但 token 贵、还容易在中段把内容看丢。第二档叫 RAG，知识能更新能溯源，但要搭检索基建。第三档就是微调，把行为锁进权重，教格式风格无可替代，但训坏的风险高。
              </p>
              <p className="text-ink/55">
                这三档不是替代关系。99% 喊「我要微调」的需求其实该用 RAG —— 微调是最后一档，不是默认档。
              </p>
            </div>

            <p className="mt-7 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这张卡，是「三选一」的最小演示。
              点 5 个真实场景，看三档分别什么反应。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 章 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：mini 三选一决策器 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 卡顶 */}
              <div className="flex items-baseline justify-between mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  Mini decider · 试试看
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                  01 / 05
                </div>
              </div>

              {/* 场景 chip 阵列 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {SCENARIOS.map((s, i) => {
                  const on = s.id === scenario.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setScenarioId(s.id)}
                      className={[
                        "text-left px-3 py-2.5 rounded-xl border-2 border-ink transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-stamp -translate-x-0.5 -translate-y-0.5"
                          : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-[10px] opacity-60">
                          0{i + 1}
                        </span>
                        <span
                          className={[
                            "font-mono text-[9px] uppercase tracking-[0.18em]",
                            on ? "text-butter" : "text-ink/40",
                          ].join(" ")}
                        >
                          {s.hint.split(" · ")[0]}
                        </span>
                      </div>
                      <div className="font-semibold text-[14px] mt-0.5 leading-tight">
                        {s.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 三档结论 */}
              <div className="space-y-2.5" key={scenario.id}>
                {(["context", "rag", "finetune"] as ForkKey[]).map((k) => {
                  const r = scenario.verdicts[k];
                  const meta = FORK_META[k];
                  const sty = VERDICT_STYLE[r.v];
                  return (
                    <div
                      key={k}
                      className={[
                        "flex items-stretch gap-3 p-3 rounded-xl border-2 border-ink bg-cream/60 animate-enter-fade",
                        r.v === "pick" ? "bg-butter/40" : "",
                      ].join(" ")}
                    >
                      {/* 左竖条 + 状态点 */}
                      <div className="flex flex-col items-center justify-center w-9 shrink-0">
                        <span className={`w-3.5 h-3.5 rounded-full border-2 border-ink ${sty.dot}`} />
                        <span
                          className={`mt-1 font-mono text-[9px] uppercase tracking-[0.15em] ${sty.tone}`}
                        >
                          {sty.label}
                        </span>
                      </div>

                      {/* 主信息 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-bold text-[16px] text-ink">
                            {meta.name}
                          </span>
                          <span className="font-mono text-[10px] text-ink/40">
                            {meta.sub}
                          </span>
                        </div>
                        <div className="text-[13px] text-ink/75 mt-0.5 leading-snug">
                          {r.why}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 卡底注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40 leading-relaxed">
                决策基线来自 RAG vs Fine-Tuning 决策框架 2026 / NovaKit · DEV 社区 ·
                Anthropic Contextual Retrieval 2024-09
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
