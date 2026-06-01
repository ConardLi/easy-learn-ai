/**
 * Section 06 · 2026 NLP 任务地图
 *
 * 8 个传统 NLP 任务卡。每张标注：
 *   - 被 LLM zero-shot 吃掉的程度 (0–100%)
 *   - 2026 生产里独立存在的场景
 *   - 老的代表方法 vs 现在的做法
 *
 * 用户可按「被 LLM 吃掉程度」「production 重要性」两种轴排序。
 * 卡点开展开看详情（accordion）。
 *
 * 反模板：quantization 也有 accordion + sort，但是按"模型 × 硬件适配"的二维卡阵列，
 *        排序 4 个轴；这里是任务卡 + 单维双向排序，节奏不同。
 */
import React, { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

type Task = {
  id: string;
  name: string;
  en: string;
  /** 0–100，被 LLM zero-shot 吃掉的程度 */
  eaten: number;
  /** 0–100，2026 生产管线里还独立做的重要性 */
  important: number;
  legacy: string;
  modern: string;
  /** 一句话：2026 仍独立的场景（如果 ≥ 50） */
  stillAlive: string;
  /** 一句话：被吃的实证（如果 < 50） */
  killed?: string;
};

const TASKS: Task[] = [
  {
    id: "sentiment",
    name: "情感分析",
    en: "Sentiment",
    eaten: 92,
    important: 30,
    legacy: "SVM / fine-tuned BERT 二分类，准确率 ~93%",
    modern: "GPT-4 zero-shot ~95% · 不用训",
    stillAlive: "大规模日志离线分类还跑 BERT，便宜 100×。",
    killed: "在线评论 / chatbot 直接 LLM 一把抓。",
  },
  {
    id: "translate",
    name: "机器翻译",
    en: "Translation",
    eaten: 88,
    important: 55,
    legacy: "Google NMT / Marian seq2seq",
    modern: "GPT-5 / Claude 端到端，BLEU 反超传统系统",
    stillAlive: "Google Translate / DeepL 仍跑专用模型 —— 延迟 < 200ms 是硬需求。",
  },
  {
    id: "summary",
    name: "文本摘要",
    en: "Summarization",
    eaten: 95,
    important: 25,
    legacy: "Pointer-Generator / BART fine-tune",
    modern: "提示词写一句就行",
    stillAlive: "新闻聚合类产品仍训自家小模型，主要为成本。",
    killed: "几乎完全被 LLM 接管。",
  },
  {
    id: "qa",
    name: "问答",
    en: "Question Answering",
    eaten: 80,
    important: 60,
    legacy: "BERT + SQuAD 抽取式 QA",
    modern: "RAG + LLM，对知识截止时间敏感",
    stillAlive: "企业内部知识库强依赖 RAG —— LLM 不知道你公司事。",
  },
  {
    id: "ner",
    name: "命名实体识别",
    en: "NER",
    eaten: 55,
    important: 85,
    legacy: "BiLSTM-CRF / spaCy / BERT-NER",
    modern: "LLM zero-shot 准但贵 100×",
    stillAlive: "结构化抽取仍跑 fine-tuned BERT —— 简历、病历、合同每天百万条，调 LLM 烧钱。",
  },
  {
    id: "classify",
    name: "文本分类",
    en: "Text Classification",
    eaten: 50,
    important: 90,
    legacy: "TF-IDF + LR / fastText / BERT",
    modern: "LLM zero-shot 可用，fine-tuned 仍领先",
    stillAlive: "内容安全审核每天数十亿条，毫秒级响应 —— LLM 用不起也跟不上。",
  },
  {
    id: "embed",
    name: "向量召回",
    en: "Dense Retrieval",
    eaten: 10,
    important: 95,
    legacy: "BM25 / TF-IDF 关键词召回",
    modern: "Gemini Embedding / Voyage / BGE 等专用 embedding 模型",
    stillAlive: "RAG / 搜索 / 推荐的地基。LLM 替代不了 —— 这俩干的活根本不重叠。",
  },
  {
    id: "speech",
    name: "语音转写",
    en: "ASR",
    eaten: 35,
    important: 80,
    legacy: "Wav2Vec / Whisper / Kaldi",
    modern: "GPT-4o Realtime / Gemini Live 多模态原生",
    stillAlive: "Whisper 仍是离线最强开源；多模态 LLM 适合实时对话场景。",
  },
];

type SortKey = "eaten" | "important";

const SectionTasksToday: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>("eaten");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [openId, setOpenId] = useState<string | null>("embed");

  const sorted = useMemo(() => {
    const arr = [...TASKS];
    arr.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      return order === "desc" ? vb - va : va - vb;
    });
    return arr;
  }, [sortKey, order]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-white border-t-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 06</span>
          <span className="section-anchor-label">tasks in production · 2026</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          8 个传统 NLP 任务，<br className="hidden md:block" />
          被 LLM 吃掉的程度差得很远。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          有的（摘要、情感）几乎完全被一锅端；有的（向量召回、文本分类）在 2026 比以前更刚需。 按两个轴排序看一看。
        </p>

        {/* 控制栏 */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            按
          </span>
          <button
            onClick={() => setSortKey("eaten")}
            className={[
              "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
              sortKey === "eaten"
                ? "bg-coral text-cream shadow-stamp"
                : "bg-white text-ink hover:bg-cream",
            ].join(" ")}
          >
            被 LLM 吃掉的程度
          </button>
          <button
            onClick={() => setSortKey("important")}
            className={[
              "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
              sortKey === "important"
                ? "bg-teal text-cream shadow-stamp"
                : "bg-white text-ink hover:bg-cream",
            ].join(" ")}
          >
            2026 产线重要性
          </button>
          <button
            onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink bg-white text-ink font-mono text-[11px] font-bold hover:bg-butter shadow-stamp transition-all duration-200 ease-spring"
            aria-label="切换升降序"
          >
            <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={2.5} />
            {order === "desc" ? "降序" : "升序"}
          </button>
        </div>

        {/* 任务列表 */}
        <div className="space-y-3">
          {sorted.map((t) => {
            const open = openId === t.id;
            const eatenColor =
              t.eaten >= 80
                ? "bg-coral"
                : t.eaten >= 50
                  ? "bg-butter"
                  : "bg-teal";
            const impColor =
              t.important >= 80
                ? "bg-teal"
                : t.important >= 50
                  ? "bg-butter"
                  : "bg-cream";
            return (
              <div
                key={t.id}
                className="bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden transition-all duration-300 ease-spring"
              >
                <button
                  onClick={() => setOpenId(open ? null : t.id)}
                  className="w-full px-5 py-4 flex flex-col sm:grid sm:grid-cols-[1fr_140px_140px_28px] gap-3 sm:gap-4 sm:items-center text-left hover:bg-cream transition-colors duration-200"
                >
                  <div>
                    <div className="font-display font-extrabold text-[17px] text-ink leading-tight">
                      {t.name}
                    </div>
                    <div className="font-mono text-[10px] text-ink/45 uppercase tracking-wider mt-0.5">
                      {t.en}
                    </div>
                  </div>
                  <Bar
                    label="LLM 吃掉"
                    value={t.eaten}
                    tone={eatenColor}
                  />
                  <Bar
                    label="产线重要性"
                    value={t.important}
                    tone={impColor}
                  />
                  <ChevronDown
                    className={[
                      "w-5 h-5 text-ink/60 transition-transform duration-300 ease-spring shrink-0",
                      open ? "rotate-180" : "",
                    ].join(" ")}
                    strokeWidth={2.2}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5 pt-1 border-t-2 border-dashed border-ink/15 grid md:grid-cols-2 gap-4 animate-enter-fade">
                    <div className="bg-cream border border-ink/15 rounded-xl p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
                        以前怎么做
                      </div>
                      <div className="font-sans text-[13.5px] text-ink leading-snug">
                        {t.legacy}
                      </div>
                    </div>
                    <div className="bg-cream border border-ink/15 rounded-xl p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-1">
                        现在怎么做
                      </div>
                      <div className="font-sans text-[13.5px] text-ink leading-snug">
                        {t.modern}
                      </div>
                    </div>
                    <div className="md:col-span-2 bg-ink rounded-xl p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-butter/80 mb-1">
                        {t.eaten >= 80 ? "已被吃掉的实证" : "2026 仍独立的场景"}
                      </div>
                      <div className="font-sans text-[13.5px] text-cream leading-snug">
                        {t.eaten >= 80 && t.killed ? t.killed : t.stillAlive}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 硬规则结语 */}
        <div className="mt-14 grid md:grid-cols-[1fr_auto] gap-6 items-center bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-7 lg:p-9">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              2026 NLP 一句话
            </div>
            <p className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink leading-snug">
              2026 年做 NLP：任务层主要是调 LLM；但切 token 和算 embedding 这两步仍然绕不开。
            </p>
            <p className="mt-3 font-sans text-[14px] text-ink/75 max-w-xl leading-relaxed">
              全行业 BPE 一统；OpenAI o200k 200K vocab；Llama 3 128K；Gemini Embedding 001 在 MTEB 连霸 4 个月 68.32。 模型可以换，前两步不能省。
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3 shrink-0">
            <Stat num="200K" cap="GPT-5 vocab" tone="coral" />
            <Stat num="68.32" cap="MTEB #1 4 个月" tone="ink" />
            <Stat num="1×" cap="LLM call 替 6 步" tone="teal" />
          </div>
        </div>

        <p className="mt-6 font-mono text-[10.5px] text-ink/45 max-w-3xl">
          数据：MTEB Rankings 2026/04 · Llama 3 paper arXiv 2407.21783 · OpenAI tiktoken docs · GLUE 官方 / sciencedirect S2667305323001333
        </p>
      </div>
    </section>
  );
};

const Bar: React.FC<{ label: string; value: number; tone: string }> = ({
  label,
  value,
  tone,
}) => {
  return (
    <div>
      <div className="font-mono text-[9.5px] uppercase tracking-wider text-ink/45 mb-1 flex justify-between">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div className="h-3 bg-cream border border-ink/30 rounded-full overflow-hidden">
        <div
          className={["h-full border-r border-ink/40 transition-all duration-500 ease-spring", tone].join(" ")}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const Stat: React.FC<{ num: string; cap: string; tone: "coral" | "ink" | "teal" }> = ({
  num,
  cap,
  tone,
}) => {
  const bg = tone === "coral" ? "bg-coral" : tone === "ink" ? "bg-ink" : "bg-teal";
  return (
    <div
      className={["border-2 border-ink rounded-xl px-3 py-2 text-cream", bg].join(" ")}
    >
      <div className="font-display font-extrabold text-[18px] leading-none tabular-nums">
        {num}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-wider opacity-80 mt-1">
        {cap}
      </div>
    </div>
  );
};

export default SectionTasksToday;
