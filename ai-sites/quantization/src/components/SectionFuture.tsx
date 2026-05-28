/**
 * Section 06 · 1-bit LLM 与未来
 *
 * 反模板结尾：不是讲"陷阱"，是讲"下一步"。
 *
 * 主交互（L4 实时）：
 *   ① slider 调模型参数规模 1B → 200B
 *   ② 三种精度（FP16 / Q4_K_M / BitNet 1.58）的内存 / 能耗 / 延迟实时算
 *   ③ toggle 切「能耗视角」/「延迟视角」
 *
 * 数据：BitNet b1.58 2B4T 实测（arXiv:2504.12285），其他按 BitNet baseline 线性外推。
 */
import React, { useMemo, useState } from "react";
import { Zap, Clock } from "lucide-react";

type View = "energy" | "latency";

const SectionFuture: React.FC = () => {
  const [params, setParams] = useState(70); // billions
  const [view, setView] = useState<View>("energy");

  /* 内存（GB） · 完全按 bit 数线性算 */
  const memFP16 = params * 2;
  const memQ4 = params * 0.5;
  const mem158 = params * 0.1975;

  /* 能耗（J/token） · 以 BitNet 2B 0.028 J 为基线，按 sqrt(params) 缩放 */
  const scale = Math.sqrt(params / 2);
  const energyFP16 = 0.258 * scale;
  const energyQ4 = 0.105 * scale;
  const energy158 = 0.028 * scale;

  /* 延迟（ms/token · CPU 解码） · 同理 */
  const latFP16 = 48 * scale;
  const latQ4 = 32 * scale;
  const lat158 = 29 * scale;

  const showEnergy = view === "energy";
  const trioMetric = useMemo(() => {
    if (showEnergy) {
      return {
        unit: "J/tok",
        title: "能耗 / token · 能量",
        values: [energyFP16, energyQ4, energy158],
        format: (v: number) => v.toFixed(2),
        maxRef: energyFP16,
      };
    }
    return {
      unit: "ms/tok",
      title: "延迟 / token · CPU 解码",
      values: [latFP16, latQ4, lat158],
      format: (v: number) => Math.round(v).toString(),
      maxRef: latFP16,
    };
  }, [showEnergy, energyFP16, energyQ4, energy158, latFP16, latQ4, lat158]);

  return (
    <section className="relative bg-ink text-cream px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-16 right-[8%] hidden lg:block animate-float-y">
        <div className="w-12 h-12 bg-coral border-2 border-cream rounded-2xl shadow-stamp -rotate-6" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-10 h-10 bg-butter border-2 border-cream rounded-full shadow-stamp" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="section-anchor">
          <span className="section-anchor-num text-butter">06</span>
          <span className="section-anchor-label text-cream/55">what's next</span>
        </div>

        <h2 className="font-display text-display-lg leading-tight mb-6 max-w-3xl">
          下一个问题：
          <br />
          能不能<span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10 text-ink">1 个 bit？</span>
          </span>
        </h2>
        <p className="max-w-2xl text-cream/70 text-[16px] mb-3 leading-relaxed">
          所有"PTQ"方法 —— GPTQ / AWQ / GGUF —— 都是把<strong className="text-cream">已经训好的</strong> FP16 模型压缩。
          它们的极限在 Q2 附近（再低质量崩塌）。
        </p>
        <p className="max-w-2xl text-cream/70 text-[16px] mb-10 leading-relaxed">
          2024 年微软放出 <strong className="text-butter">BitNet b1.58</strong> ——
          权重直接是 <code className="font-mono bg-cream/10 px-1.5 py-0.5 rounded text-butter">{"{-1, 0, +1}"}</code>，
          <strong className="text-cream">原生训练</strong>，不是压缩。
          这意味着推理时几乎全是"加法"，乘法可以扔掉。功耗、内存、延迟全部塌方下降。
        </p>

        {/* 计算器主卡 */}
        <div className="bg-cream text-ink rounded-3xl border-2 border-cream shadow-stamp-xl p-6 lg:p-8 mb-7">
          {/* slider 顶 */}
          <div className="flex items-baseline justify-between mb-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
              模型规模 · drag
            </div>
            <div className="font-display text-[28px] font-bold text-ink tabular-nums">
              {params}
              <span className="font-mono text-[12px] text-ink/55 ml-1">B 参数</span>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={200}
            step={1}
            value={params}
            onChange={(e) => setParams(Number(e.target.value))}
            className="w-full accent-coral cursor-pointer"
          />
          <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
            <span>1B</span>
            <span>70B</span>
            <span>200B</span>
          </div>

          {/* 内存条 · 三种精度并排 */}
          <div className="mt-7 space-y-2.5">
            <PrecisionBar
              label="FP16"
              sub="32 位浮点 · 老式裸跑"
              memory={memFP16}
              maxMem={memFP16}
              tone="coral"
            />
            <PrecisionBar
              label="Q4_K_M"
              sub="2026 主流 · 消费级甜蜜点"
              memory={memQ4}
              maxMem={memFP16}
              tone="butter"
            />
            <PrecisionBar
              label="BitNet 1.58-bit"
              sub="native ternary · 未来"
              memory={mem158}
              maxMem={memFP16}
              tone="teal"
              highlight
            />
          </div>

          {/* toggle 视角切换 + 三个数字对比 */}
          <div className="mt-7 pt-6 border-t border-ink/15">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                {trioMetric.title}
              </div>
              <div className="flex gap-1 p-0.5 bg-ink/8 rounded-lg border border-ink/15">
                <button
                  onClick={() => setView("energy")}
                  className={[
                    "px-2.5 py-1 rounded-md font-mono text-[10px] font-bold flex items-center gap-1 transition-colors",
                    showEnergy ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
                  ].join(" ")}
                >
                  <Zap className="w-3 h-3" strokeWidth={2.5} /> 能耗
                </button>
                <button
                  onClick={() => setView("latency")}
                  className={[
                    "px-2.5 py-1 rounded-md font-mono text-[10px] font-bold flex items-center gap-1 transition-colors",
                    !showEnergy ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
                  ].join(" ")}
                >
                  <Clock className="w-3 h-3" strokeWidth={2.5} /> 延迟
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["FP16", "Q4_K_M", "1.58-bit"] as const).map((name, i) => (
                <div
                  key={name}
                  className={[
                    "p-3 rounded-xl border-2 border-ink",
                    i === 2 ? "bg-teal/15" : "bg-white",
                  ].join(" ")}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    {name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={[
                        "font-display text-[22px] font-bold tabular-nums",
                        i === 2 ? "text-teal" : "text-ink",
                      ].join(" ")}
                    >
                      {trioMetric.format(trioMetric.values[i])}
                    </span>
                    <span className="font-mono text-[10px] text-ink/45">{trioMetric.unit}</span>
                  </div>
                  {i === 2 && (
                    <div className="mt-1 font-mono text-[10px] text-teal font-bold">
                      ↓{(trioMetric.values[0] / trioMetric.values[2]).toFixed(1)}× 对比 FP16
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 font-mono text-[10px] text-ink/40">
            能耗/延迟以 BitNet 2B 实测（CPU 解码 29 ms, 0.028 J/tok）为基线，按 √params 缩放估算
          </p>
        </div>

        {/* BitNet 2B 实测跑分对比 */}
        <div className="bg-cream/5 border-2 border-cream/15 rounded-2xl p-5 lg:p-6 mb-8">
          <h3 className="font-display text-[20px] font-bold text-cream mb-1">
            "但 1-bit 真的够用吗？"
          </h3>
          <p className="text-cream/65 text-[14.5px] leading-relaxed mb-5 max-w-2xl">
            BitNet b1.58 2B 在 4T tokens 上训练，下面是它跟同尺寸全精度模型在公开 benchmark 上的实际跑分（数据来自论文 Table 1）：
          </p>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-left">
              <thead>
                <tr className="text-cream/45 border-b border-cream/15">
                  <th className="font-mono text-[10px] uppercase tracking-[0.16em] font-normal py-2 px-2">benchmark</th>
                  <th className="font-mono text-[10px] uppercase tracking-[0.16em] font-normal py-2 px-2 text-right">Llama 3.2 1B</th>
                  <th className="font-mono text-[10px] uppercase tracking-[0.16em] font-normal py-2 px-2 text-right">Qwen2.5 1.5B</th>
                  <th className="font-mono text-[10px] uppercase tracking-[0.16em] font-normal py-2 px-2 text-right text-butter">BitNet 1.58 · 2B</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {[
                  { name: "ARC-Challenge", a: 37.80, b: 46.67, c: 49.91, best: "c" },
                  { name: "WinoGrande", a: 59.51, b: 62.83, c: 71.90, best: "c" },
                  { name: "GSM8K", a: 38.21, b: 56.79, c: 58.38, best: "c" },
                  { name: "MMLU", a: 45.58, b: 60.25, c: 53.17, best: "b" },
                  { name: "Average", a: 44.90, b: 55.23, c: 54.19, best: "b", bold: true },
                ].map((r) => (
                  <tr key={r.name} className="border-b border-cream/8">
                    <td className={["py-2 px-2 text-cream/80", r.bold ? "font-display font-bold text-cream" : ""].join(" ")}>{r.name}</td>
                    <td className={`py-2 px-2 text-right tabular-nums ${r.best === "a" ? "text-butter font-bold" : "text-cream/70"}`}>
                      {r.a.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 text-right tabular-nums ${r.best === "b" ? "text-butter font-bold" : "text-cream/70"}`}>
                      {r.b.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 text-right tabular-nums ${r.best === "c" ? "text-butter font-bold" : "text-cream/85"}`}>
                      {r.c.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[10px] text-cream/40">
            arXiv:2504.12285 Table 1 · 2025/04
          </p>
        </div>

        {/* 收尾 */}
        <div className="max-w-2xl">
          <p className="text-cream/75 text-[16px] leading-relaxed mb-3">
            BitNet 不是孤例。Blackwell B200 给到原生 <strong className="text-butter">FP4</strong> 张量核，
            <strong className="text-butter">MXFP4</strong> 共享缩放因子格式正在跑训练实验，
            <strong className="text-butter">FP6</strong>、<strong className="text-butter">FP4 训练</strong> 都进入预印本。
          </p>
          <p className="text-cream/75 text-[16px] leading-relaxed mb-8">
            过去 5 年，每年都有人说"再压就压不动了"。每年都被打脸。
            <br />
            <span className="text-butter font-display text-[18px] font-bold">
              如果 1-bit 真的可以 scale 到 70B+，那一切都得重写。
            </span>
          </p>

          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
            — handbook · end —
          </div>
        </div>
      </div>
    </section>
  );
};

const PrecisionBar: React.FC<{
  label: string;
  sub: string;
  memory: number;
  maxMem: number;
  tone: "coral" | "butter" | "teal";
  highlight?: boolean;
}> = ({ label, sub, memory, maxMem, tone, highlight }) => {
  const pct = (memory / maxMem) * 100;
  const colors = {
    coral: { bar: "bg-coral", text: "text-coral" },
    butter: { bar: "bg-butter-deep", text: "text-butter-deep" },
    teal: { bar: "bg-teal", text: "text-teal" },
  }[tone];

  return (
    <div
      className={[
        "p-3 border-2 rounded-xl transition-all duration-300",
        highlight ? "border-teal bg-teal/8" : "border-ink/15 bg-white",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="flex items-baseline gap-2">
          <span className={`font-display text-[14px] font-bold ${highlight ? "text-teal" : "text-ink"}`}>
            {label}
          </span>
          <span className="font-mono text-[10px] text-ink/45">{sub}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`font-display text-[18px] font-bold tabular-nums ${colors.text}`}>
            {memory.toFixed(memory < 10 ? 1 : 0)}
          </span>
          <span className="font-mono text-[10px] text-ink/55">GB</span>
        </div>
      </div>
      <div className="h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/10">
        <div
          className={`h-full ${colors.bar} transition-all duration-400 ease-spring`}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
    </div>
  );
};

export default SectionFuture;
