/**
 * Section 06 · 该挑哪个 loss · 3 道小测 + 4 条硬规则
 *
 * 反相邻：上一节是 tab + view 切换。这里换成 quiz chip（每题 4 选项，选完即时反馈）+ 收尾 callout。
 *
 * 教育意图：让用户拿前 5 节学的东西，对真实工程场景做选择。错也没关系，看解释。
 */
import React, { useState } from "react";
import { Check, X } from "lucide-react";

type Option = { id: string; label: string };

type Quiz = {
  id: string;
  scene: string;
  hint: string;
  options: Option[];
  correct: string;
  why: string;
};

const QUIZZES: Quiz[] = [
  {
    id: "medical",
    scene: "医学影像识别罕见癌细胞 · 正样本占 1%",
    hint: "数据 99% 是「正常」背景 · 模型很容易学到「永远说没事」",
    options: [
      { id: "mse", label: "MSE" },
      { id: "bce", label: "普通 BCE" },
      { id: "focal", label: "Focal Loss · γ=2" },
      { id: "huber", label: "Huber" },
    ],
    correct: "focal",
    why: "类别极度不均衡时，普通 BCE 的梯度被海量「容易的负样本」淹没。Focal 的 (1−pₜ)^γ 因子把「已经分对了」的样本自动降权（pₜ→1 时因子→0），让模型把力气花在难的少数类上。RetinaNet 论文默认 γ=2, α=0.25。",
  },
  {
    id: "outlier",
    scene: "房价预测 · 历史数据里混进几个标错的天价",
    hint: "干净的 95% 样本你信，剩下 5% 是脏数据",
    options: [
      { id: "mse", label: "MSE" },
      { id: "mae", label: "MAE" },
      { id: "huber", label: "Huber · δ=1.0" },
      { id: "ce", label: "Cross-Entropy" },
    ],
    correct: "huber",
    why: "MSE 对离群点平方放大 —— 几个错标就把模型整体往离群方向带。MAE 完全等比例但梯度不连续。Huber 在 |error|<δ 用 MSE 的光滑性，|error|>δ 切到 MAE 的鲁棒性，是工程默认选项。PyTorch 的 SmoothL1Loss 是同一族。",
  },
  {
    id: "style",
    scene: "教 base 模型学会礼貌回答 · 手上有 8 K 条人类示范对话",
    hint: "已经有「应该这么说」的样本，还没有「A 比 B 好」的偏好对",
    options: [
      { id: "pretrain", label: "Pretrain CE · 全词训练" },
      { id: "sft", label: "SFT · CE + prompt mask" },
      { id: "dpo", label: "DPO" },
      { id: "grpo", label: "GRPO" },
    ],
    correct: "sft",
    why: "只有「这样回答是对的」的示范，没有「这样比那样好」的对比。SFT 用 CE 但只在 assistant 回复 token 算 loss，prompt 全 mask 掉 —— 不让模型浪费容量去学 prompt 怎么写。8 K 条规模 1-3 epoch 收，再多就开始背训练集。",
  },
];

const RULES = [
  {
    n: "01",
    title: "看数据再选 loss",
    body: "脏数据用 MAE / Huber，干净数据用 MSE；二分类用 BCE，多分类用 CE，类不均衡套 Focal。",
  },
  {
    n: "02",
    title: "loss 降到 0 不是好事",
    body: "训练 loss 太低通常是过拟合 —— 把训练集背完了。永远盯着 val / 测试集 loss 拐点。",
  },
  {
    n: "03",
    title: "曲线震荡先砍 LR",
    body: "loss 抖到天花板 95% 是 LR 太大或没 warmup。先 ×0.3，再 clip_grad_norm=1.0 兜底。",
  },
  {
    n: "04",
    title: "LLM 看 loss 不够",
    body: "next-token NLL 一直降不代表模型变聪明，要在 benchmark 上挑 checkpoint。这就是 loss-task gap。",
  },
];

const SectionPickRules: React.FC = () => {
  const [picks, setPicks] = useState<Record<string, string>>({});

  const pick = (qid: string, oid: string) => {
    setPicks((p) => ({ ...p, [qid]: oid }));
  };

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">your turn · pick a loss</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          3 个场景，
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">你来挑 loss</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          看完前 5 节，下面 3 道场景题。挑一个 chip 看解释 —— 错了也没事，关键是看为什么。
        </p>

        {/* 3 道题 */}
        <div className="space-y-5 mb-12">
          {QUIZZES.map((q, qi) => {
            const picked = picks[q.id];
            const right = picked === q.correct;
            return (
              <div
                key={q.id}
                className="p-5 lg:p-6 bg-cream border-2 border-ink rounded-2xl shadow-stamp"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-ink text-cream rounded-full font-mono text-[12px] font-bold">
                    Q{qi + 1}
                  </span>
                  <div className="font-display text-[18px] font-bold text-ink leading-tight">
                    {q.scene}
                  </div>
                </div>
                <div className="ml-10 font-mono text-[11px] text-ink/55 mb-4">
                  {q.hint}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 ml-10">
                  {q.options.map((o) => {
                    const isPicked = picked === o.id;
                    const isCorrect = o.id === q.correct;
                    const showAns = !!picked;
                    let cls =
                      "p-3 rounded-xl border-2 border-ink text-left font-display text-[13px] font-bold transition-all duration-250 ease-spring shadow-[2px_2px_0_0_#241C15] hover:shadow-stamp";
                    if (!showAns) {
                      cls += " bg-white text-ink hover:bg-butter";
                    } else if (isCorrect) {
                      cls += " bg-teal text-cream";
                    } else if (isPicked && !isCorrect) {
                      cls += " bg-coral text-cream";
                    } else {
                      cls += " bg-white text-ink/55";
                    }
                    return (
                      <button
                        key={o.id}
                        onClick={() => pick(q.id, o.id)}
                        className={cls}
                        disabled={!!picked}
                      >
                        <div className="flex items-center gap-1.5">
                          {showAns && isCorrect && (
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          )}
                          {showAns && isPicked && !isCorrect && (
                            <X className="w-3.5 h-3.5" strokeWidth={3} />
                          )}
                          <span>{o.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {picked && (
                  <div className="ml-10 p-4 bg-white border-2 border-ink rounded-xl animate-enter-fade">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={[
                          "inline-flex items-center justify-center w-5 h-5 rounded-full",
                          right ? "bg-teal text-cream" : "bg-coral text-cream",
                        ].join(" ")}
                      >
                        {right ? (
                          <Check className="w-3 h-3" strokeWidth={3} />
                        ) : (
                          <X className="w-3 h-3" strokeWidth={3} />
                        )}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65 font-semibold">
                        {right ? "对了" : "再想想"} · 正解是{" "}
                        {q.options.find((o) => o.id === q.correct)?.label}
                      </span>
                    </div>
                    <p className="text-[14px] text-ink/85 leading-relaxed">
                      {q.why}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 4 条硬规则 */}
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-3 font-semibold">
            带走的 4 条硬规则
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {RULES.map((r) => (
              <div
                key={r.n}
                className="p-5 bg-ink text-cream rounded-2xl border-2 border-ink shadow-stamp"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-[11px] text-butter font-bold tracking-wider">
                    {r.n}
                  </span>
                  <span className="font-display text-[16px] font-bold">
                    {r.title}
                  </span>
                </div>
                <p className="text-[14px] text-cream/85 leading-relaxed">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPickRules;
