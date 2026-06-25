import React, { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { DemoBadge, Meter, SectionHead } from "./SectionBits";

const SectionComputeSaved: React.FC = () => {
  const [inputLength, setInputLength] = useState(256);
  const [outputLength, setOutputLength] = useState(128);

  const stats = useMemo(() => {
    let withoutCache = 0;
    for (let step = 0; step < outputLength; step += 1) {
      withoutCache += inputLength + step;
    }
    const withCache = inputLength + outputLength;
    return {
      withoutCache,
      withCache,
      saved: 1 - withCache / withoutCache,
    };
  }, [inputLength, outputLength]);

  return (
    <section className="border-y-2 border-ink bg-teal px-4 py-20 text-cream sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="05"
          label="省下多少计算"
          title="回答越长，重复计算越快堆起来"
          inverse
          intro={
            <>
              <p>
                生成回答分两段：先整体处理用户输入，这一步叫 Prefill（预填充）；
                随后一次生成一个 token，这一步叫 Decode（逐步生成）。关闭缓存时，Decode 每一步都重做前文；
                开启缓存后，每步只处理新 token。
              </p>
              <p className="mt-3">
                真实速度还会受到模型结构、硬件和同时处理多少请求的影响，这里只看重复工作的趋势。
              </p>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] border-2 border-ink bg-cream p-5 text-ink shadow-stamp-lg lg:col-span-5 lg:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">调一段对话</h3>
              <DemoBadge />
            </div>
            <RangeRow
              label="输入长度"
              value={inputLength}
              min={32}
              max={2048}
              step={32}
              unit="tokens"
              onChange={setInputLength}
            />
            <RangeRow
              label="输出长度"
              value={outputLength}
              min={16}
              max={512}
              step={16}
              unit="tokens"
              onChange={setOutputLength}
            />
            <div className="mt-6 rounded-2xl border-2 border-ink bg-butter p-4">
              <Calculator className="h-6 w-6" />
              <p className="mt-3 text-sm leading-relaxed">
                这组输入下，缓存让“重复处理 token”的示意工作量减少
              </p>
              <div className="mt-1 font-display text-4xl font-extrabold">
                {(stats.saved * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border-2 border-ink bg-white p-5 text-ink shadow-stamp-lg lg:col-span-7 lg:p-7">
            <WorkBar
              label="关闭 KV Cache"
              value={stats.withoutCache}
              max={stats.withoutCache}
              tone="coral"
              note="每一步都重读前文"
            />
            <WorkBar
              label="开启 KV Cache"
              value={stats.withCache}
              max={stats.withoutCache}
              tone="teal"
              note="输入算一次，之后只算新增"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Stat label="关闭缓存" value={formatWork(stats.withoutCache)} />
              <Stat label="开启缓存" value={formatWork(stats.withCache)} />
              <Stat label="相差" value={`${Math.max(1, stats.withoutCache / stats.withCache).toFixed(0)}×`} />
            </div>
            <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-ink/45">
              示意算法：关闭缓存 = 每轮处理“输入 + 已生成”；开启缓存 = 输入处理一次 + 每个新 token 一次。
              这组数字用于理解增长趋势，不代表实际耗时。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const RangeRow: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step, unit, onChange }) => (
  <label className="mt-6 block">
    <span className="flex items-center justify-between gap-3">
      <span className="text-sm font-bold">{label}</span>
      <span className="font-mono text-xs">
        {value.toLocaleString()} {unit}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="range-control mt-3"
    />
  </label>
);

const WorkBar: React.FC<{
  label: string;
  value: number;
  max: number;
  tone: "teal" | "coral";
  note: string;
}> = ({ label, value, max, tone, note }) => (
  <div className="mb-8">
    <div className="mb-2 flex items-end justify-between gap-4">
      <div>
        <div className="font-display text-lg font-bold">{label}</div>
        <div className="text-xs text-ink/55">{note}</div>
      </div>
      <div className="font-mono text-xs font-bold">{formatWork(value)}</div>
    </div>
    <Meter value={value} max={max} tone={tone} />
  </div>
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-xl border-2 border-ink bg-cream p-3">
    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/50">{label}</div>
    <div className="mt-1 font-display text-2xl font-bold">{value}</div>
  </div>
);

const formatWork = (value: number) =>
  value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(1)}M`
    : value >= 1000
      ? `${(value / 1000).toFixed(value >= 10_000 ? 0 : 1)}K`
      : value.toLocaleString();

export default SectionComputeSaved;
