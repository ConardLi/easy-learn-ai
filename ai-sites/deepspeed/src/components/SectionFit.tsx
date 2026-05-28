/**
 * Section 06 · 模型 × 集群 配置矩阵
 *
 * 区别于 quantization 的「双 chip 列表 + 推荐卡」（输出是 quant scheme）：
 *   这里用 5×6 矩阵热力图，点任一格看 DeepSpeed 配置建议。
 *   形式：matrix grid click → detail panel（L3）。
 *
 * 输入轴：
 *   ─ 行：模型大小 7B / 70B / 175B / 405B / 1T
 *   ─ 列：集群 1×A100 / 8×A100 / 8×H100 / 16×H100 / 64×H100 / 8 卡+CPU offload
 *
 * 数据来源：
 *   ZeRO-3 计算公式 12P/N · archiesengupta 2026
 *   Llama 3 405B 训练实际配置 · arXiv（meta llama3 paper）
 *   DeepSpeed-Chat OPT-66B 实测 · DeepSpeed blog 2023
 */
import React, { useState } from "react";
import { Check, AlertTriangle, X, ArrowDownToLine } from "lucide-react";

type ModelSize = "7B" | "70B" | "175B" | "405B" | "1T";
type Cluster = "1xA100" | "8xA100" | "8xH100" | "16xH100" | "64xH100" | "8H100off";

const MODELS: { id: ModelSize; b: number; label: string }[] = [
  { id: "7B", b: 7, label: "Llama 3 8B 量级" },
  { id: "70B", b: 70, label: "Llama 3 70B" },
  { id: "175B", b: 175, label: "GPT-3 / OPT-175B" },
  { id: "405B", b: 405, label: "Llama 3.1 405B" },
  { id: "1T", b: 1000, label: "MT-NLG 530B / 万亿级" },
];

const CLUSTERS: {
  id: Cluster;
  label: string;
  short: string;
  gpus: number;
  vramPerGpu: number;
  hasOffload: boolean;
}[] = [
  { id: "1xA100", label: "1× A100 80G", short: "1×A100", gpus: 1, vramPerGpu: 80, hasOffload: false },
  { id: "8xA100", label: "8× A100 80G", short: "8×A100", gpus: 8, vramPerGpu: 80, hasOffload: false },
  { id: "8xH100", label: "8× H100 80G", short: "8×H100", gpus: 8, vramPerGpu: 80, hasOffload: false },
  { id: "16xH100", label: "16× H100 80G", short: "16×H100", gpus: 16, vramPerGpu: 80, hasOffload: false },
  { id: "64xH100", label: "64× H100 80G", short: "64×H100", gpus: 64, vramPerGpu: 80, hasOffload: false },
  { id: "8H100off", label: "8× H100 + CPU 1TB", short: "8×H100+CPU", gpus: 8, vramPerGpu: 80, hasOffload: true },
];

type Verdict = {
  feasible: "good" | "tight" | "offload" | "no";
  stage: string;
  offload: string;
  perGpuGB: number;
  speed: string;
  note: string;
};

function recommend(model: { b: number; id: ModelSize }, cluster: typeof CLUSTERS[number]): Verdict {
  /* 训练总状态 (Adam BF16): 12P + 激活 2P = 14P 字节 / 参数 */
  const totalGB = model.b * 14;
  const totalVram = cluster.gpus * cluster.vramPerGpu;

  /* 尝试 ZeRO 各阶段 */
  /* ZeRO-2: 单卡 = 2P (params) + 2P/N + 8P/N */
  const z2 = 2 * model.b + (2 * model.b) / cluster.gpus + (8 * model.b) / cluster.gpus + 2 * model.b * 0.3;
  /* ZeRO-3: 单卡 = 12P/N + 2P*0.3 (activation w/ ckpt) */
  const z3 = (12 * model.b) / cluster.gpus + 2 * model.b * 0.3;

  /* 单卡情况：1 卡只能跑得起 7B FP16 */
  if (cluster.gpus === 1) {
    if (model.b <= 7) {
      return {
        feasible: "tight",
        stage: "ZeRO-2 + LoRA",
        offload: "无",
        perGpuGB: 22,
        speed: "适合微调 · 不适合预训练",
        note: "单卡训 7B 全参数其实勉强，主流是 QLoRA + ZeRO-2 微调。",
      };
    }
    if (model.b <= 70 && cluster.hasOffload) {
      return {
        feasible: "offload",
        stage: "ZeRO-3",
        offload: "CPU offload + LoRA",
        perGpuGB: 40,
        speed: "极慢 · 仅适合演示",
        note: "单卡 + offload 训 70B 只是技术上能跑，不是生产配置。",
      };
    }
    return {
      feasible: "no",
      stage: "—",
      offload: "—",
      perGpuGB: 0,
      speed: "—",
      note: "单卡训不动这个规模。换多卡或开 QLoRA。",
    };
  }

  /* 多卡 */
  if (z2 < cluster.vramPerGpu * 0.85) {
    return {
      feasible: "good",
      stage: "ZeRO-2",
      offload: "无",
      perGpuGB: Math.round(z2),
      speed: "全速 · 推荐",
      note: "ZeRO-2 通信开销小，多数训练首选。",
    };
  }
  if (z3 < cluster.vramPerGpu * 0.85) {
    return {
      feasible: "good",
      stage: "ZeRO-3",
      offload: "无",
      perGpuGB: Math.round(z3),
      speed: "通信 +50% · 但能装下",
      note: "参数也拆。每层 forward 前现 AllGather。",
    };
  }
  if (cluster.hasOffload) {
    return {
      feasible: "offload",
      stage: "ZeRO-3",
      offload: "CPU offload (优化器)",
      perGpuGB: Math.round(cluster.vramPerGpu * 0.6),
      speed: "下降 ~30%",
      note: "把 Adam 状态丢 CPU，每步走 PCIe，慢一点但能训。",
    };
  }
  if (model.b >= 405) {
    return {
      feasible: cluster.gpus >= 64 ? "good" : "no",
      stage: cluster.gpus >= 64 ? "ZeRO-3 + TP=8 + PP=8" : "—",
      offload: "—",
      perGpuGB: cluster.gpus >= 64 ? 75 : 0,
      speed: cluster.gpus >= 64 ? "全速 · 但要 512+ GPU" : "—",
      note: cluster.gpus >= 64
        ? "Llama 3 405B 真实配置走 3D 并行，单 ZeRO 不够。"
        : "无 offload 装不下，需要更多卡或加 CPU 内存。",
    };
  }
  if (model.b >= 1000) {
    return {
      feasible: "no",
      stage: "—",
      offload: "—",
      perGpuGB: 0,
      speed: "—",
      note: "1T 模型需要 NVMe offload (ZeRO-Infinity) 或上 256+ GPU。",
    };
  }
  return {
    feasible: "no",
    stage: "—",
    offload: "—",
    perGpuGB: 0,
    speed: "—",
    note: "装不下。加卡、开 offload、或上 ZeRO-Infinity NVMe。",
  };
}

const SectionFit: React.FC = () => {
  const [modelIdx, setModelIdx] = useState(1); // 70B
  const [clusterIdx, setClusterIdx] = useState(2); // 8xH100

  const model = MODELS[modelIdx];
  const cluster = CLUSTERS[clusterIdx];
  const v = recommend(model, cluster);

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">configurator</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          点一个
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">格子</span>
          </span>
          ，
          <br />
          看你的卡能不能训。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          5 个模型规模 × 6 种集群配置 = 30 种真实场景。
          颜色越绿越好训，越红越要省着用。点任一格看推荐的 DeepSpeed 配置。
        </p>

        {/* 矩阵 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 mb-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 align-bottom">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    模型 \ 集群
                  </div>
                </th>
                {CLUSTERS.map((c) => (
                  <th key={c.id} className="p-1 text-center align-bottom">
                    <div className="font-mono text-[10px] font-bold text-ink leading-tight">
                      {c.short.split("+")[0]}
                    </div>
                    {c.hasOffload && (
                      <div className="font-mono text-[9px] text-coral mt-0.5 inline-flex items-center gap-0.5">
                        <ArrowDownToLine className="w-2.5 h-2.5" strokeWidth={3} />
                        offload
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m, mi) => (
                <tr key={m.id}>
                  <td className="p-2 align-middle">
                    <div className="font-display text-[15px] font-bold text-ink">
                      {m.id}
                    </div>
                    <div className="font-mono text-[9px] text-ink/45 leading-tight">
                      {m.label}
                    </div>
                  </td>
                  {CLUSTERS.map((c, ci) => {
                    const verdict = recommend(m, c);
                    const on = mi === modelIdx && ci === clusterIdx;
                    return (
                      <td key={c.id} className="p-1">
                        <button
                          onClick={() => {
                            setModelIdx(mi);
                            setClusterIdx(ci);
                          }}
                          className={[
                            "w-full aspect-square min-w-[44px] border-2 rounded-lg flex items-center justify-center transition-all duration-200 ease-spring",
                            cellStyle(verdict.feasible),
                            on
                              ? "border-ink shadow-[3px_3px_0_0_#241C15] -translate-y-0.5"
                              : "border-ink/40 hover:border-ink hover:-translate-y-0.5",
                          ].join(" ")}
                          title={`${m.id} on ${c.label}`}
                        >
                          <VerdictIcon kind={verdict.feasible} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* 图例 */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 text-ink/65">
              <span className="w-3 h-3 bg-teal/70 border border-ink rounded" />
              ZeRO-2/3 直接训
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink/65">
              <span className="w-3 h-3 bg-butter border border-ink rounded" />
              紧 · 还能挤
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink/65">
              <span className="w-3 h-3 bg-coral/80 border border-ink rounded" />
              要 offload
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink/65">
              <span className="w-3 h-3 bg-ink/30 border border-ink rounded" />
              这卡装不下
            </span>
          </div>
        </div>

        {/* 详情卡 */}
        <div className="bg-ink text-cream rounded-3xl shadow-stamp-xl p-6 lg:p-8" key={`${modelIdx}-${clusterIdx}`}>
          <div className="flex items-baseline gap-3 mb-4 flex-wrap">
            <span className="px-2 py-0.5 bg-butter text-ink rounded font-mono text-[10px] font-bold tracking-wide">
              recommended
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
              {model.id} on {cluster.label}
            </span>
          </div>

          <h3 className="font-display text-[28px] lg:text-[34px] font-bold leading-tight mb-3">
            {v.feasible === "no" ? (
              <>训不动 · 换硬件</>
            ) : (
              <>
                <span className="text-butter">{v.stage}</span>
                {v.offload !== "无" && v.offload !== "—" && (
                  <span className="text-cream/85 font-display text-[20px] lg:text-[24px] block mt-1">
                    + {v.offload}
                  </span>
                )}
              </>
            )}
          </h3>

          <p className="text-[14.5px] text-cream/85 leading-relaxed mb-5 max-w-2xl">
            {v.note}
          </p>

          {v.feasible !== "no" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Metric label="单卡显存占用" value={`${v.perGpuGB}`} unit="GB" tone="butter" />
              <Metric label="集群 GPU 数" value={`${cluster.gpus}`} unit="卡" tone="cream" />
              <Metric label="训练速度" value={v.speed} unit="" tone="coral" small />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function cellStyle(f: Verdict["feasible"]) {
  switch (f) {
    case "good":
      return "bg-teal/70 hover:bg-teal text-cream";
    case "tight":
      return "bg-butter text-ink";
    case "offload":
      return "bg-coral/80 text-cream";
    case "no":
      return "bg-ink/25 text-ink/55";
  }
}

const VerdictIcon: React.FC<{ kind: Verdict["feasible"] }> = ({ kind }) => {
  if (kind === "good") return <Check className="w-4 h-4" strokeWidth={3} />;
  if (kind === "tight") return <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.8} />;
  if (kind === "offload") return <ArrowDownToLine className="w-3.5 h-3.5" strokeWidth={3} />;
  return <X className="w-3.5 h-3.5" strokeWidth={3} />;
};

const Metric: React.FC<{
  label: string;
  value: string;
  unit: string;
  tone: "butter" | "cream" | "coral";
  small?: boolean;
}> = ({ label, value, unit, tone, small }) => {
  const color = { butter: "text-butter", cream: "text-cream", coral: "text-coral" }[tone];
  return (
    <div className="px-3 py-2.5 bg-cream/8 rounded-lg border border-cream/15">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/55 mb-0.5">
        {label}
      </div>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span
          className={[
            "font-display font-bold tabular-nums",
            small ? "text-[13px]" : "text-[22px]",
            color,
          ].join(" ")}
        >
          {value}
        </span>
        {unit && <span className="font-mono text-[10px] text-cream/45">{unit}</span>}
      </div>
    </div>
  );
};

export default SectionFit;
