/**
 * Section 01 · Hero「批量大小是什么？」
 *
 * Hero 开场纪律：
 *   - H1 = 「批量大小是什么？」
 *   - 一句话定义 = 完整陈述句、零比喻、零否定式
 *   - 反直觉钩子降到 hero 末尾过渡句 / Section 03
 *
 * 反模板：核心可视化是「连续 batch slider + 4 个数轴实时联动」，
 *   不抢 quantization 的 7-pill 离散选择 / distill 的温度 slider。
 *
 * 4 个数轴：
 *   ① 梯度噪声（小 batch 噪声大）
 *   ② 一次更新看多少 token（横向条 + 显存关联）
 *   ③ 训练 10 B tokens 需要的更新步数（log scale 条）
 *   ④ 泛化倾向（flat → sharp → collapse 4 状态）
 *
 * 可动元素：
 *   - 主 slider（L3 连续）
 *   - 4 个 quick-pick chip（"消费级 / 论文 / Llama-3 / 极端"），不算 hover 联动
 *   - hover：每个数轴右侧补一条解释（基础礼貌，不算 2 个可动之一）
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

/** 用对数 idx → batch_tokens 的映射，slider 走 0..N-1，每格 ×2 */
const BATCH_TABLE: { tokens: number; label: string }[] = [
  { tokens: 32 * 1024, label: "32K" },
  { tokens: 128 * 1024, label: "128K" },
  { tokens: 512 * 1024, label: "512K" },
  { tokens: 2 * 1024 * 1024, label: "2M" },
  { tokens: 4 * 1024 * 1024, label: "4M" },
  { tokens: 8 * 1024 * 1024, label: "8M" },
  { tokens: 16 * 1024 * 1024, label: "16M" },
  { tokens: 32 * 1024 * 1024, label: "32M" },
  { tokens: 60 * 1024 * 1024, label: "60M" },
];

/** 4 个 quick-pick 场景（slider 直接跳到对应 idx） */
const QUICK_PICKS: { idx: number; name: string; note: string }[] = [
  { idx: 0, name: "消费级微调", note: "RTX 4090 上跑 LoRA · 32K tokens" },
  { idx: 2, name: "学术小规模", note: "论文里跑 ResNet · 512K 量级" },
  { idx: 6, name: "Llama 3 405B", note: "Meta 实际预训练 · 16M tokens" },
  { idx: 8, name: "DeepSeek V3", note: "60M tokens 一步 · 15360 序列" },
];

const SectionWhatIs: React.FC = () => {
  const [idx, setIdx] = useState(3); // 默认 2M

  const cur = BATCH_TABLE[idx];

  /* 梯度噪声 σ ∝ 1/√batch ，按 batch=32K 时 σ=1 归一 */
  const noise = useMemo(() => {
    const ref = BATCH_TABLE[0].tokens;
    return Math.sqrt(ref / cur.tokens);
  }, [cur]);

  /* 训练 10 B tokens 需要的更新步数 */
  const totalTokens = 10_000_000_000;
  const steps = Math.round(totalTokens / cur.tokens);

  /* 显存压力（相对 32K 时算 1 单位）—— 实际线性于 batch tokens */
  const vramFactor = cur.tokens / BATCH_TABLE[0].tokens;
  const vramPct = Math.min(100, 100 * Math.log10(1 + vramFactor) / 3); // log 压一下

  /* 泛化倾向：参考 Keskar 2017 + Llama 3 实证 */
  const verdict = useMemo(() => {
    if (idx <= 1) return { tag: "flat", color: "teal", note: "梯度抖，但容易跳出 sharp 谷" };
    if (idx <= 4) return { tag: "good", color: "ink", note: "现代 LLM 预训练的甜区" };
    if (idx <= 6) return { tag: "borderline", color: "butter-deep", note: "要配 linear scaling + warmup" };
    return { tag: "sharp risk", color: "coral", note: "Keskar 2017：易陷 sharp minima" };
  }, [idx]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div aria-hidden className="absolute top-24 right-[7%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-9 h-9 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Batch Size · 批量大小
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              批量大小
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  训练时，模型每更新一次参数之前先看过的样本数量。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训练就是反复做三件事：看一堆样本、算平均错在哪、按这个错改一次参数。
              </p>
              <p>
                这堆样本一次有多大？这就是 batch size。可以是 32 张图、可以是 16M 个 token。
              </p>
              <p>
                这个数一旦动，损失曲线的抖动、训练要多少步、用多少显存、最后泛化好不好，全都跟着变。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，就是「改 batch size」这个动作本身。拖动 slider，看 4 条数轴一起动。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：4 轴联动卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 顶部 slider header */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  drag · batch size
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[34px] lg:text-[40px] font-bold text-ink leading-none tabular-nums">
                    {cur.label}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">
                    tokens / step
                  </span>
                </div>
              </div>

              {/* 主 slider（连续） */}
              <input
                type="range"
                min={0}
                max={BATCH_TABLE.length - 1}
                step={1}
                value={idx}
                onChange={(e) => setIdx(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
                <span>32K</span>
                <span>1M</span>
                <span>16M</span>
                <span>60M</span>
              </div>

              {/* 4 个 quick-pick chip */}
              <div className="grid grid-cols-4 gap-1.5 mt-4 mb-7">
                {QUICK_PICKS.map((q) => {
                  const on = q.idx === idx;
                  return (
                    <button
                      key={q.name}
                      onClick={() => setIdx(q.idx)}
                      className={[
                        "px-2 py-2 rounded-md border-2 border-ink font-mono text-[10px] font-bold transition-all duration-250 ease-spring text-left leading-tight",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {q.name}
                    </button>
                  );
                })}
              </div>
              <p className="-mt-5 mb-5 font-mono text-[10px] text-ink/45">
                ↑ 选一个真实场景 · {QUICK_PICKS[idx === 0 ? 0 : idx === 2 ? 1 : idx === 6 ? 2 : idx === 8 ? 3 : -1]?.note ?? "拖 slider 调任意值"}
              </p>

              {/* 4 个数轴 · 网格布局 */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-ink/10">
                {/* ① 梯度噪声 */}
                <Axis
                  label="① 梯度噪声 σ"
                  big={`${noise.toFixed(2)}×`}
                  hint={noise > 1 ? "抖得猛" : noise > 0.4 ? "中等" : "几乎平滑"}
                  pct={Math.min(100, noise * 60)}
                  color="coral"
                />

                {/* ② 显存压力 */}
                <Axis
                  label="② 一步显存"
                  big={`${vramFactor < 1024 ? vramFactor.toFixed(0) : (vramFactor / 1024).toFixed(1) + "K"}×`}
                  hint={vramFactor > 256 ? "需要 grad accum" : vramFactor > 32 ? "塞得下 H100" : "单卡 ok"}
                  pct={vramPct}
                  color="teal"
                />

                {/* ③ 更新步数（log 显示） */}
                <Axis
                  label="③ 训 10 B tokens · 步"
                  big={formatSteps(steps)}
                  hint={steps > 100_000 ? "训练时间长" : steps > 5_000 ? "正常" : "很快但不稳"}
                  pct={Math.min(100, (Math.log10(steps) - 1) * 22)}
                  color="ink"
                />

                {/* ④ 泛化倾向 · 文字状态 */}
                <div className="relative bg-cream border-2 border-ink rounded-2xl p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    ④ 泛化倾向
                  </div>
                  <div
                    className={[
                      "font-display text-[20px] font-bold tabular-nums leading-tight",
                      verdict.color === "teal"
                        ? "text-teal"
                        : verdict.color === "butter-deep"
                          ? "text-ink"
                          : verdict.color === "coral"
                            ? "text-coral"
                            : "text-ink",
                    ].join(" ")}
                  >
                    {verdict.tag}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-ink/55 leading-snug">
                    {verdict.note}
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：Llama 3 herd arXiv:2407.21783 / DeepSeek V3 arXiv:2412.19437 · Keskar et al. 2017 (arXiv:1609.04836)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 子组件：单轴条 ─────────────────────────────────── */
const Axis: React.FC<{
  label: string;
  big: string;
  hint: string;
  pct: number;
  color: "coral" | "teal" | "ink";
}> = ({ label, big, hint, pct, color }) => {
  const barCls = color === "coral" ? "bg-coral" : color === "teal" ? "bg-teal" : "bg-ink";
  return (
    <div className="bg-cream border-2 border-ink rounded-2xl p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
        {label}
      </div>
      <div className="font-display text-[20px] font-bold text-ink tabular-nums leading-tight">
        {big}
      </div>
      <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
        <div
          className={`h-full ${barCls} transition-all duration-400 ease-spring`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 font-mono text-[10px] text-ink/55">{hint}</div>
    </div>
  );
};

function formatSteps(s: number): string {
  if (s >= 1_000_000) return (s / 1_000_000).toFixed(1) + "M";
  if (s >= 1_000) return (s / 1_000).toFixed(1) + "K";
  return s.toString();
}

export default SectionWhatIs;
