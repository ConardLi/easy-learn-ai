/**
 * Section 04 · 装不下就往下挪：offload
 *
 * 3 段 toggle：GPU only · ZeRO-Offload (+CPU) · ZeRO-Infinity (+NVMe)
 * 视觉 = 三层金字塔 / 阶梯（自上而下 GPU HBM → CPU RAM → NVMe SSD），
 * 当前 toggle 决定优化器状态停在哪一层。
 *
 * 不重复任何前面 section 的视觉语言（前 3 节是 N 柱 / 4 段水平柱 / 4×3 网格）。
 *
 * 速度数据来源：
 *   ZeRO-Offload tutorial · deepspeed.ai 2024-2026
 *   ZeRO-Infinity arXiv:2104.07857
 *   Saturn Cloud Blog 2026: 「CPU offload throughput 通常下降 20-40%」
 */
import React, { useState } from "react";
import { Cpu, HardDrive, Layers } from "lucide-react";

type Mode = "gpu" | "cpu" | "nvme";

type ModeData = {
  id: Mode;
  label: string;
  shortLabel: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** 哪些状态被 offload */
  offloadOpt: boolean;
  offloadParam: boolean;
  /** 单卡 GPU HBM 占用（70B 模型 · ZeRO-3 起点 105 GB） */
  gpuGB: number;
  /** CPU RAM 占用 */
  cpuGB: number;
  /** NVMe 占用 */
  nvmeGB: number;
  /** 相对 GPU only 的训练吞吐 */
  speedFactor: number;
  /** 8× H100 (80GB) 集群上能训的最大模型 */
  maxModel: string;
  costNote: string;
  bestWhen: string;
};

const MODES: ModeData[] = [
  {
    id: "gpu",
    label: "GPU only · 全装显存里",
    shortLabel: "GPU 全装",
    Icon: Layers,
    offloadOpt: false,
    offloadParam: false,
    gpuGB: 105,
    cpuGB: 0,
    nvmeGB: 0,
    speedFactor: 1.0,
    maxModel: "70B（刚好）",
    costNote: "通信全在 NVLink，最快",
    bestWhen: "卡够，模型也压得进显存",
  },
  {
    id: "cpu",
    label: "ZeRO-Offload · 优化器丢 CPU",
    shortLabel: "+CPU",
    Icon: Cpu,
    offloadOpt: true,
    offloadParam: false,
    gpuGB: 35,
    cpuGB: 560,
    nvmeGB: 0,
    speedFactor: 0.7,
    maxModel: "175B",
    costNote: "每步都要把算好的权重经 PCIe（显卡和 CPU 之间的通道，比显存慢）拷回显卡",
    bestWhen: "想训比显存大 2-3 倍的模型",
  },
  {
    id: "nvme",
    label: "ZeRO-Infinity · 优化器 + 参数全 NVMe",
    shortLabel: "+NVMe",
    Icon: HardDrive,
    offloadOpt: true,
    offloadParam: true,
    gpuGB: 8,
    cpuGB: 80,
    nvmeGB: 1200,
    speedFactor: 0.25,
    maxModel: "1T+（8 卡）",
    costNote: "NVMe 顺序读写 7 GB/s，每层都要先拉回来",
    bestWhen: "卡装不下，预算也加不动",
  },
];

const SectionOffload: React.FC = () => {
  const [mode, setMode] = useState<Mode>("gpu");
  const d = MODES.find((m) => m.id === mode)!;

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">offload</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          ZeRO-3 还是装不下？
          <br />
          把状态搬到
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">CPU 或硬盘</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          这一招叫 <strong className="text-ink">offload（卸载）</strong>：显卡装不下时，把一部分东西临时搬到 CPU 内存（普通内存条），还不够就再搬到硬盘（NVMe SSD）。
          代价是变慢。三档切一下，看 70B 的训练状态怎么从显存里一层层挪出去。
        </p>

        {/* mode toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          {MODES.map((m) => {
            const on = m.id === mode;
            const Icon = m.Icon;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={[
                  "flex items-center gap-3 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : "bg-white text-ink hover:bg-cream hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-9 h-9 rounded-xl border-2 border-ink flex items-center justify-center shrink-0",
                    on ? "bg-butter" : "bg-cream",
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4 text-ink" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[13.5px] font-bold leading-tight">
                    {m.shortLabel}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] mt-0.5 truncate",
                      on ? "text-cream/55" : "text-ink/50",
                    ].join(" ")}
                  >
                    {m.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 主体：左 = 三层阶梯 · 右 = 数字面板 */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* 三层阶梯 */}
          <div className="lg:col-span-7 bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
              70B 训练状态 · 三层存储分布
            </div>
            <p className="text-[11.5px] text-ink/55 leading-snug mb-4">
              从上到下：越往下空间越大、越便宜，但读写越慢。东西尽量往上放，放不下才往下挪。
            </p>

            <div className="space-y-2.5" key={mode}>
              <Tier
                tier="GPU HBM"
                sub="显卡上的高速内存"
                speed="≈ 3 TB/s"
                capacity="80 GB / 卡"
                accent="bg-coral"
                fillGB={d.gpuGB}
                capGB={80}
                contents={["参数（永远在）", d.offloadOpt ? null : "优化器", d.offloadOpt ? null : "梯度", "激活"].filter(Boolean) as string[]}
              />
              <Tier
                tier="CPU RAM"
                sub="普通内存条"
                speed="≈ 200 GB/s"
                capacity="512 GB / 节点"
                accent="bg-butter-deep"
                fillGB={d.cpuGB}
                capGB={512}
                contents={d.offloadOpt && !d.offloadParam ? ["优化器（搬到这）"] : d.offloadOpt && d.offloadParam ? ["参数中转（staging）"] : []}
              />
              <Tier
                tier="NVMe SSD"
                sub="固态硬盘"
                speed="≈ 7 GB/s"
                capacity="2 TB"
                accent="bg-teal"
                fillGB={d.nvmeGB}
                capGB={2000}
                contents={d.offloadParam ? ["优化器（常驻这）", "参数分片（按层临时拉回）"] : []}
              />
            </div>

            <p className="mt-5 font-mono text-[10px] text-ink/45">
              来源 · ZeRO-Infinity arXiv:2104.07857 · DeepSpeed v0.19 docs
            </p>
          </div>

          {/* 数字面板 */}
          <div className="lg:col-span-5 space-y-3">
            {/* 速度 dial */}
            <div className="bg-ink text-cream rounded-3xl shadow-stamp-lg p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-2">
                训练吞吐 · 相对 GPU only
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-[40px] font-bold tabular-nums leading-none text-butter">
                  {(d.speedFactor * 100).toFixed(0)}
                </span>
                <span className="font-mono text-[14px] text-cream/55">%</span>
                <span className="ml-auto font-mono text-[11px] text-coral">
                  {d.speedFactor === 1 ? "基准" : `↓ ${Math.round((1 - d.speedFactor) * 100)}%`}
                </span>
              </div>
              <div className="h-3 bg-cream/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-butter transition-all duration-500 ease-spring"
                  style={{ width: `${d.speedFactor * 100}%` }}
                />
              </div>
              <p className="mt-3 text-[13px] text-cream/85 leading-relaxed">{d.costNote}</p>
            </div>

            {/* 能训多大 */}
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                8× H100（80GB）能训的最大模型
              </div>
              <div className="font-display text-[26px] lg:text-[30px] font-bold text-ink leading-tight">
                {d.maxModel}
              </div>
              <div className="mt-3 px-3 py-2 bg-cream border-2 border-ink/15 rounded-lg">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 mb-0.5">
                  适合
                </div>
                <p className="text-[12.5px] text-ink/75 leading-snug">{d.bestWhen}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Tier: React.FC<{
  tier: string;
  sub?: string;
  speed: string;
  capacity: string;
  accent: string;
  fillGB: number;
  capGB: number;
  contents: string[];
}> = ({ tier, sub, speed, capacity, accent, fillGB, capGB, contents }) => {
  const pct = Math.min(100, (fillGB / capGB) * 100);
  return (
    <div className="bg-white border-2 border-ink rounded-2xl p-3.5">
      <div className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
        <div className="flex items-baseline gap-2">
          <span className={`inline-block w-2.5 h-2.5 ${accent} border border-ink rounded-sm`} />
          <span className="font-display text-[15px] font-bold text-ink">{tier}</span>
          {sub && <span className="font-sans text-[11px] text-ink/45">{sub}</span>}
        </div>
        <div className="flex items-baseline gap-3 font-mono text-[10px] text-ink/50">
          <span>{speed}</span>
          <span>{capacity}</span>
        </div>
      </div>

      {/* 进度条 + 数字 */}
      <div className="relative h-7 bg-cream border border-ink/20 rounded overflow-hidden">
        <div
          className={`${accent} h-full transition-all duration-500 ease-spring`}
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <span className="font-mono text-[10px] font-bold text-ink/75 tabular-nums">
            {fillGB > 0 ? `${fillGB} GB` : "—"}
          </span>
          <span className="font-mono text-[9px] text-ink/45">
            {fillGB > 0 ? `${pct.toFixed(0)}%` : "未用"}
          </span>
        </div>
      </div>

      {/* 该层内容 */}
      {contents.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {contents.map((c) => (
            <span
              key={c}
              className="px-1.5 py-0.5 bg-cream border border-ink/20 rounded font-mono text-[10px] text-ink/70"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionOffload;
