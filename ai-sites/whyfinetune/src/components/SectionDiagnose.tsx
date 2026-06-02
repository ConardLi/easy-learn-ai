/**
 * Section 03 · Diagnose · 场景诊断器
 *
 * 整站灵魂交互（L4 拼装编辑器）：用户调 5 个维度，实时跑三档得分 + 推荐理由。
 *
 * 反 rlhf 站红线：不复制 SFT→RM→PPO 三步流水线那种 trace。这里是
 * 「多控件 → 实时雷达 + 推荐」结构。
 *
 * 评分基线（来自 DEV 决策框架 2025 / RAG vs FT 决策框架 2026 /
 * 个人经验，权重为 5 维度组合，分数 0-100）
 */
import React, { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

type ForkKey = "context" | "rag" | "finetune";

type Choice<T extends string> = { id: T; label: string; sub?: string };

type DataAmount = "S" | "M" | "L" | "XL";
type Fresh = "once" | "month" | "week" | "day";
type Teach = "facts" | "style" | "format" | "reasoning";
type Scale = "tiny" | "small" | "mid" | "huge";
type Budget = "lo" | "mid" | "hi";

const DATA_AMOUNT: Choice<DataAmount>[] = [
  { id: "S", label: "< 100", sub: "例子很少" },
  { id: "M", label: "100-1k", sub: "够 RAG 起步" },
  { id: "L", label: "1k-10k", sub: "够微调起步" },
  { id: "XL", label: "10k+", sub: "数据丰富" },
];
const FRESH: Choice<Fresh>[] = [
  { id: "once", label: "一次性", sub: "不会再改" },
  { id: "month", label: "月级", sub: "季度小改" },
  { id: "week", label: "周级", sub: "周周更新" },
  { id: "day", label: "日级", sub: "每天甚至每小时" },
];
const TEACH: Choice<Teach>[] = [
  { id: "facts", label: "事实 / 知识", sub: "员工手册、产品参数" },
  { id: "style", label: "风格 / 口吻", sub: "客服语气、品牌腔" },
  { id: "format", label: "格式 / 结构", sub: "固定 JSON、API 调用" },
  { id: "reasoning", label: "推理 / 决策", sub: "诊断、判罚、路由" },
];
const SCALE: Choice<Scale>[] = [
  { id: "tiny", label: "< 10 篇", sub: "几份长文档" },
  { id: "small", label: "10-100", sub: "中小知识库" },
  { id: "mid", label: "100-1k", sub: "一家公司体量" },
  { id: "huge", label: "1k+", sub: "几年的数据" },
];
const BUDGET: Choice<Budget>[] = [
  { id: "lo", label: "紧", sub: "个人 / demo" },
  { id: "mid", label: "中", sub: "小团队产品" },
  { id: "hi", label: "高", sub: "企业 / 高频" },
];

const FORK_META: Record<ForkKey, { name: string; sub: string; color: string; barClass: string }> = {
  context: { name: "长 context", sub: "塞 prompt", color: "text-ink", barClass: "bg-butter" },
  rag: { name: "RAG", sub: "让它去查", color: "text-coral", barClass: "bg-coral" },
  finetune: { name: "微调", sub: "改它的权重", color: "text-teal", barClass: "bg-teal" },
};

interface Inputs {
  data: DataAmount;
  fresh: Fresh;
  teach: Teach;
  scale: Scale;
  budget: Budget;
}

/** 评分核心：每档 base 50，5 个维度按规则加减；clamp 到 0-100 */
function score(inputs: Inputs): Record<ForkKey, number> {
  const { data, fresh, teach, scale, budget } = inputs;

  let ctx = 50;
  let rag = 50;
  let ft = 50;

  // 数据量
  ctx += { S: 25, M: 10, L: -10, XL: -25 }[data];
  rag += { S: -10, M: 15, L: 20, XL: 20 }[data];
  ft += { S: -35, M: -5, L: 20, XL: 30 }[data];

  // 知识动态性
  ctx += { once: 25, month: 5, week: -20, day: -30 }[fresh];
  rag += { once: -5, month: 15, week: 25, day: 30 }[fresh];
  ft += { once: 10, month: 15, week: -15, day: -30 }[fresh];

  // 教什么
  ctx += { facts: 5, style: -10, format: -10, reasoning: 5 }[teach];
  rag += { facts: 25, style: -30, format: -15, reasoning: 5 }[teach];
  ft += { facts: -25, style: 30, format: 30, reasoning: 10 }[teach];

  // 知识体量
  ctx += { tiny: 25, small: 10, mid: -25, huge: -40 }[scale];
  rag += { tiny: -10, small: 15, mid: 25, huge: 25 }[scale];
  ft += { tiny: -10, small: 0, mid: 10, huge: 15 }[scale];

  // 预算（紧偏 long context，hi 允许微调）
  ctx += { lo: 15, mid: 5, hi: -5 }[budget];
  rag += { lo: -5, mid: 10, hi: 10 }[budget];
  ft += { lo: -25, mid: 0, hi: 15 }[budget];

  return {
    context: Math.max(0, Math.min(100, ctx)),
    rag: Math.max(0, Math.min(100, rag)),
    finetune: Math.max(0, Math.min(100, ft)),
  };
}

/** 给某档生成"推荐 / 拒绝"理由（句式严格，按 inputs 拼） */
function reason(fork: ForkKey, inputs: Inputs, isWinner: boolean): string {
  const { data, fresh, teach, scale, budget } = inputs;
  if (fork === "context") {
    if (isWinner) {
      return `${SCALE.find((s) => s.id === scale)!.label} 文档配 ${FRESH.find((f) => f.id === fresh)!.label} 更新——直接塞 prompt 最省事`;
    }
    if (scale === "mid" || scale === "huge") return "知识体量太大，每次都重读太烧 token";
    if (fresh === "week" || fresh === "day") return "知识变得太勤，prompt 永远是过期版本";
    if (teach === "style" || teach === "format") return "行为类需求，few-shot 顶不住长会话漂移";
    return "可选项但非首选，能用 RAG 就先 RAG";
  }
  if (fork === "rag") {
    if (isWinner) {
      return `${teach === "facts" ? "知识答" : "动态信息"} + ${FRESH.find((f) => f.id === fresh)!.label}更新——索引一改就生效，还能给出处`;
    }
    if (teach === "style" || teach === "format") return "格式 / 风格是行为，检索不到「该用什么语气」";
    if (data === "S" && scale === "tiny") return "知识太少，搭一套 RAG 基建不划算";
    if (budget === "lo" && scale === "huge") return "向量库 + reranker 的运行成本会咬预算";
    return "次优选项，可以等 long context 不够再上";
  }
  // finetune
  if (isWinner) {
    return `${TEACH.find((t) => t.id === teach)!.label}——把行为锁进权重，1k+ 数据一次训完`;
  }
  if (teach === "facts") return "事实灌权重，模型容易把错答案讲得很坚定（幻觉）";
  if (data === "S" || data === "M") return "训练数据太少，过拟合 + 把原能力训坏";
  if (fresh === "week" || fresh === "day") return "数据周更，每次新一批就要重训一遍";
  if (budget === "lo") return "训练 + 托管费会把预算打穿";
  return "需要前两档都搞不定 + 数据 1k+ 才合理";
}

const SectionDiagnose: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    data: "M",
    fresh: "week",
    teach: "facts",
    scale: "mid",
    budget: "mid",
  });

  const scores = useMemo(() => score(inputs), [inputs]);
  const winner: ForkKey = (Object.entries(scores) as [ForkKey, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">diagnose</span>
        </div>

        <div className="flex items-end justify-between gap-4 mb-3 flex-wrap">
          <h2 className="font-display text-display-lg text-ink max-w-3xl">
            把你的场景填进来，看哪档赢
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-butter border-2 border-ink rounded-full shadow-stamp">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.4} />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink font-bold">
              填你的场景
            </span>
          </div>
        </div>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-9">
          调左边 5 个开关，右边三条 bar 实时跑。胜出档亮起，另两档下面写「为什么不选它」。
        </p>

        <div className="grid lg:grid-cols-12 gap-7">
          {/* 左：5 个 segmented 控件 */}
          <div className="lg:col-span-7 space-y-5">
            <Segmented
              num="1"
              title="训练数据量 · 仅微调才用得上"
              choices={DATA_AMOUNT}
              value={inputs.data}
              onChange={(v) => setInputs({ ...inputs, data: v })}
            />
            <Segmented
              num="2"
              title="知识更新频率"
              choices={FRESH}
              value={inputs.fresh}
              onChange={(v) => setInputs({ ...inputs, fresh: v })}
            />
            <Segmented
              num="3"
              title="想教什么"
              choices={TEACH}
              value={inputs.teach}
              onChange={(v) => setInputs({ ...inputs, teach: v })}
            />
            <Segmented
              num="4"
              title="知识体量（文档数）"
              choices={SCALE}
              value={inputs.scale}
              onChange={(v) => setInputs({ ...inputs, scale: v })}
            />
            <Segmented
              num="5"
              title="预算"
              choices={BUDGET}
              value={inputs.budget}
              onChange={(v) => setInputs({ ...inputs, budget: v })}
            />
          </div>

          {/* 右：评分输出 */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6">
              {/* 顶：推荐档大字 */}
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-1.5">
                  recommendation
                </div>
                <div className="flex items-baseline gap-3" key={winner}>
                  <span
                    className={`font-display text-[36px] lg:text-[44px] font-bold leading-none ${FORK_META[winner].color} animate-enter-pop`}
                  >
                    {FORK_META[winner].name}
                  </span>
                  <span className="font-mono text-[11px] text-ink/45">
                    {FORK_META[winner].sub}
                  </span>
                </div>
              </div>

              {/* 三条 bar */}
              <div className="space-y-3" key={`bars-${winner}-${scores.context}-${scores.rag}-${scores.finetune}`}>
                {(["context", "rag", "finetune"] as ForkKey[]).map((k) => {
                  const s = scores[k];
                  const isWin = k === winner;
                  const r = reason(k, inputs, isWin);
                  return (
                    <div
                      key={k}
                      className={[
                        "px-3.5 py-3 border-2 rounded-xl transition-all duration-300 ease-spring",
                        isWin ? "border-ink bg-butter-tint shadow-stamp" : "border-ink/15 bg-cream/50",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <div className="flex items-baseline gap-2">
                          <span className={`font-display font-bold text-[15px] ${FORK_META[k].color}`}>
                            {FORK_META[k].name}
                          </span>
                          {isWin && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 bg-butter px-1.5 py-0.5 rounded border border-ink/30">
                              picked
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[12px] font-bold text-ink tabular-nums">
                          {Math.round(s)}
                        </span>
                      </div>
                      <div className="h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15 mb-2">
                        <div
                          className={`h-full ${FORK_META[k].barClass} transition-all duration-500 ease-spring`}
                          style={{ width: `${s}%` }}
                        />
                      </div>
                      <p className="text-[12px] text-ink/70 leading-snug">{r}</p>
                    </div>
                  );
                })}
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40 leading-relaxed">
                打分规则基于 RAG vs FT 决策框架 · NovaKit 2026 ·
                Anthropic 决策指南 2024-09 · 仅供初筛
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Segmented 子组件 ───
interface SegmentedProps<T extends string> {
  num: string;
  title: string;
  choices: Choice<T>[];
  value: T;
  onChange: (v: T) => void;
}
function Segmented<T extends string>({
  num,
  title,
  choices,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-mono text-[9.5px] text-ink/45 bg-cream border border-ink/20 px-1.5 py-0.5 rounded">
          {num}
        </span>
        <span className="font-display font-bold text-[14px] text-ink">{title}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {choices.map((c) => {
          const on = c.id === value;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className={[
                "text-left px-2.5 py-2 rounded-lg border-2 border-ink transition-all duration-250 ease-spring",
                on
                  ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                  : "bg-white text-ink hover:bg-butter-tint",
              ].join(" ")}
            >
              <div className="font-semibold text-[12.5px] leading-tight">
                {c.label}
              </div>
              {c.sub && (
                <div
                  className={[
                    "font-mono text-[9px] mt-0.5",
                    on ? "text-butter" : "text-ink/40",
                  ].join(" ")}
                >
                  {c.sub}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SectionDiagnose;
