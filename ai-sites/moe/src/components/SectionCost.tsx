/**
 * Section 06 · MoE 不是免费午餐
 *
 * 反模板结尾：
 *   ─ quantization Section 06 用 slider 调模型参数规模 + 多视角
 *   ─ Section 05 (前一节) 已经用了 pill + slider，这里换成 hardware preset cards
 *   ─ 故事：选你的硬件 → 看你能跑哪些 2026 真实 MoE → 给你看显存账有多坑
 *
 * 主张：
 *   MoE 把"算力账"压下去了，但代价是
 *   ─ 显存账（全部参数必须装内存）
 *   ─ 通信账（all-to-all 把 token 发到不同 GPU）
 *   ─ 不稳定（路由会塌缩 / 个别专家罢工）
 *
 * 可动元素：
 *   ① 选硬件 · 6 张 hardware card（L2 select）
 *   ② 选精度 · 3 个 chip · 影响每参数字节（L2）
 */
import React, { useState, useMemo } from "react";
import { HardDrive, Wifi, AlertOctagon } from "lucide-react";

type Precision = "fp16" | "fp8" | "q4";

const PRECISION: Record<Precision, { label: string; bytesPerParam: number; sub: string }> = {
  fp16: { label: "FP16", bytesPerParam: 2, sub: "裸跑 · 老式标准" },
  fp8: { label: "FP8", bytesPerParam: 1, sub: "H100/B200 原生 · 2026 服务化" },
  q4: { label: "Q4", bytesPerParam: 0.5, sub: "量化推理 · GGUF/AWQ" },
};

type RunModel = {
  id: string;
  name: string;
  totalB: number;
  activeB: number;
};

const MODELS: RunModel[] = [
  { id: "mix8x7", name: "Mixtral 8×7B", totalB: 47, activeB: 13 },
  { id: "scout", name: "Llama 4 Scout", totalB: 109, activeB: 17 },
  { id: "gpt-oss-120", name: "GPT-OSS 120B", totalB: 117, activeB: 5.1 },
  { id: "qwen3-235", name: "Qwen3 235B-A22B", totalB: 235, activeB: 22 },
  { id: "maverick", name: "Llama 4 Maverick", totalB: 400, activeB: 17 },
  { id: "ds-v3", name: "DeepSeek V3", totalB: 671, activeB: 37 },
  { id: "kimi", name: "Kimi K2", totalB: 1000, activeB: 32 },
];

const OVERHEAD = 1.15; // KV cache 余量

type Hardware = { id: string; label: string; sub: string; vram: number };

const HARDWARES: Hardware[] = [
  { id: "4090", label: "RTX 4090", sub: "消费级 · 单卡", vram: 24 },
  { id: "m4-max", label: "Mac M4 Max", sub: "本地工作站", vram: 128 },
  { id: "h100", label: "H100 80G", sub: "数据中心单卡", vram: 80 },
  { id: "a6000x2", label: "2× A6000", sub: "小工作站", vram: 96 },
  { id: "h100x4", label: "4× H100", sub: "中等推理集群", vram: 320 },
  { id: "h100x8", label: "8× H100", sub: "Mixtral 系列标配", vram: 640 },
];

const SectionCost: React.FC = () => {
  const [hwId, setHwId] = useState("m4-max");
  const [precision, setPrecision] = useState<Precision>("q4");

  const hw = HARDWARES.find((h) => h.id === hwId)!;
  const vram = hw.vram;
  const bpp = PRECISION[precision].bytesPerParam;

  const runs = useMemo(
    () =>
      MODELS.map((m) => {
        const totalGB = m.totalB * bpp * OVERHEAD;
        const activeGB = m.activeB * bpp * OVERHEAD;
        const fits = totalGB <= vram;
        return { ...m, totalGB, activeGB, fits };
      }),
    [bpp, vram],
  );

  const fitsCount = runs.filter((r) => r.fits).length;

  return (
    <section className="relative bg-ink text-cream px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      {/* 装饰 */}
      <div aria-hidden className="absolute top-16 right-[7%] hidden lg:block animate-float-y">
        <div className="w-12 h-12 bg-coral border-2 border-cream rounded-2xl shadow-stamp -rotate-6" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-10 h-10 bg-butter border-2 border-cream rounded-full shadow-stamp" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="section-anchor">
          <span className="section-anchor-num text-butter">06</span>
          <span className="section-anchor-label text-cream/55">no free lunch</span>
        </div>

        <h2 className="font-display text-display-lg leading-tight mb-6 max-w-3xl">
          MoE 把
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-coral -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10 text-cream">算力账</span>
          </span>
          压下去了。
          <br />
          钱{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 rotate-1" aria-hidden />
            <span className="relative z-10 text-ink">没消失</span>
          </span>
          ，只是换了科目。
        </h2>
        <p className="max-w-2xl text-cream/70 text-[16px] mb-10 leading-relaxed">
          Mixtral 8×7B 算力 13B、看起来便宜。但你 GPU 上得装下全部 47B 参数才能跑 ——
          算力账省的，<strong className="text-butter">显存账原封不动</strong>。
          这只是三笔账中的一笔。
        </p>

        {/* 三笔账 cards */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          <CostCard
            Icon={HardDrive}
            tag="账本 1 · 显存"
            title="算力 ÷ K，显存 ×1"
            body="Mixtral 8×7B 总 47B 参数，top-2 routing 算力等同 13B dense（dense＝每次全部参数都参与计算）。可是显存得装全部 47B —— 算力省了 3.6×，显存一分钱没省。"
          />
          <CostCard
            Icon={Wifi}
            tag="账本 2 · 通信"
            title="all-to-all 把 token 发去找专家"
            body="训练时 token 要发到不同 GPU 上的专家算，再收回来。DeepSeek V3 在 H800 上用 node-limited routing（每 token ≤ 4 节点）才扛得住。"
          />
          <CostCard
            Icon={AlertOctagon}
            tag="账本 3 · 不稳定"
            title="router 不学好就塌"
            body="Switch Transformer 论文报告 α=0.01 是甜蜜点，差一个数量级就崩。DeepSeek V3 改用 bias 偏置，bias update speed γ 同样得细调。"
          />
        </div>

        {/* 显存模拟器 */}
        <div className="bg-cream text-ink rounded-3xl border-2 border-cream shadow-stamp-xl p-6 lg:p-8 mb-7">
          <div className="flex items-baseline justify-between mb-4">
            <div className="font-display text-[24px] font-bold text-ink leading-tight">
              你的硬件 vs 7 个真实 MoE
            </div>
            <div className="font-mono text-[10px] text-coral font-bold">
              {fitsCount} / {MODELS.length} 个能跑
            </div>
          </div>

          {/* 硬件卡片 grid */}
          <div className="mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              ① 你的硬件
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HARDWARES.map((h) => {
                const on = h.id === hwId;
                return (
                  <button
                    key={h.id}
                    onClick={() => setHwId(h.id)}
                    className={[
                      "px-3 py-2 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-stamp"
                        : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#241C15]",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="font-display text-[13px] font-bold leading-none">{h.label}</span>
                      <span className={["font-mono text-[11px] font-bold tabular-nums", on ? "text-butter" : "text-coral"].join(" ")}>
                        {h.vram}G
                      </span>
                    </div>
                    <div className={["font-mono text-[9.5px]", on ? "text-cream/55" : "text-ink/55"].join(" ")}>
                      {h.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* precision pills */}
          <div className="flex items-baseline gap-2 mb-5 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-1">
              ② 精度
            </span>
            {(Object.keys(PRECISION) as Precision[]).map((p) => {
              const on = p === precision;
              const info = PRECISION[p];
              return (
                <button
                  key={p}
                  onClick={() => setPrecision(p)}
                  className={[
                    "px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink hover:-translate-y-0.5",
                  ].join(" ")}
                  title={info.sub}
                >
                  {info.label}
                </button>
              );
            })}
            <span className="font-mono text-[10px] text-ink/45 ml-1">
              · {PRECISION[precision].bytesPerParam} byte / 参数 · {PRECISION[precision].sub}
            </span>
          </div>

          {/* 7 个模型条对比 */}
          <div className="space-y-1.5">
            {runs.map((r) => (
              <ModelRow key={r.id} run={r} vram={vram} precision={precision} />
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] text-ink/45">
            含 ~15% KV cache 余量 · 实际部署还要算 batch size / 上下文长度
          </p>
        </div>

        {/* 收尾 */}
        <div className="max-w-2xl">
          <p className="text-cream/75 text-[16px] leading-relaxed mb-3">
            算力账 vs 显存账，这是 MoE 给大模型时代的真正贡献：
            <strong className="text-butter">同样的计算预算下，能训出更聪明的模型</strong>。
            代价是你得有装得下全部参数的硬件 —— 对数据中心是赚，对手机端是亏。
          </p>
          <p className="text-cream/75 text-[16px] leading-relaxed mb-8">
            所以 2026 年是开源 MoE 的爆发期，本地跑 MoE 还得靠
            <strong className="text-butter"> 量化（量化能把 47B 压到 24GB）</strong>—— 它跟 MoE 是两套互补的省钱手段。
          </p>

          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
            — handbook · end —
          </div>
        </div>
      </div>
    </section>
  );
};

const CostCard: React.FC<{
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tag: string;
  title: string;
  body: string;
}> = ({ Icon, tag, title, body }) => (
  <div className="bg-cream/8 border-2 border-cream/20 rounded-2xl p-5">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-md border-2 border-butter bg-cream/10 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-butter" strokeWidth={2.4} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter font-bold">
        {tag}
      </span>
    </div>
    <div className="font-display text-[16px] font-bold text-cream mb-1.5 leading-snug">
      {title}
    </div>
    <p className="text-[13px] text-cream/65 leading-relaxed">{body}</p>
  </div>
);

const ModelRow: React.FC<{
  run: RunModel & { totalGB: number; activeGB: number; fits: boolean };
  vram: number;
  precision: Precision;
}> = ({ run, vram }) => {
  /* 用 1500 GB 做 max 标尺，所有条共用 */
  const SCALE = 1500;
  const totalPct = (run.totalGB / SCALE) * 100;
  const activePct = (run.activeGB / SCALE) * 100;
  const vramPct = (vram / SCALE) * 100;

  return (
    <div
      className={[
        "px-3 py-2 rounded-lg border-2 transition-colors",
        run.fits ? "bg-white border-ink/20" : "bg-cream border-ink/10 opacity-65",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between mb-1">
        <span className="font-display text-[13px] font-bold text-ink">
          {run.name}
        </span>
        <span className="font-mono text-[10.5px] tabular-nums">
          <span className={run.fits ? "text-teal font-bold" : "text-coral font-bold"}>
            {run.fits ? "✓ 能跑" : "✗ 装不下"}
          </span>
          <span className="ml-2 text-ink/55">{run.totalGB.toFixed(0)} GB</span>
        </span>
      </div>
      {/* 双段条：active 实色 + total - active 半透明 + VRAM 线 */}
      <div className="relative h-2.5 bg-ink/8 rounded-full overflow-hidden border border-ink/10">
        {/* total */}
        <div
          className="absolute inset-y-0 left-0 bg-ink/25"
          style={{ width: `${totalPct}%` }}
        />
        {/* active (亮) */}
        <div
          className="absolute inset-y-0 left-0 bg-coral"
          style={{ width: `${activePct}%` }}
        />
        {/* VRAM cutoff line */}
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-ink"
          style={{ left: `${Math.min(99.5, vramPct)}%` }}
          title={`VRAM ${vram} GB`}
        />
      </div>
      <div className="flex justify-between mt-0.5 font-mono text-[9px] text-ink/45 tabular-nums">
        <span>active {run.activeGB.toFixed(1)} GB</span>
        <span>VRAM ↑ {vram} GB</span>
      </div>
    </div>
  );
};

export default SectionCost;
