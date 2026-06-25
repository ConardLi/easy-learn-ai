import React, { useMemo, useState } from "react";
import { AlertTriangle, Users } from "lucide-react";
import { DemoBadge, Meter, SectionHead } from "./SectionBits";

const GPU_BUDGET_GB = 24;

const SectionMemoryPressure: React.FC = () => {
  const [tokens, setTokens] = useState(8192);
  const [layers, setLayers] = useState(32);
  const [users, setUsers] = useState(8);
  const [bytes, setBytes] = useState(2);

  const stats = useMemo(() => {
    const kvGroups = 8;
    const groupWidth = 128;
    const bytesPerSequence = layers * kvGroups * groupWidth * 2 * bytes * tokens;
    const totalGB = (bytesPerSequence * users) / 1024 ** 3;
    return {
      totalGB,
      perUserGB: totalGB / users,
      percent: (totalGB / GPU_BUDGET_GB) * 100,
    };
  }, [tokens, layers, users, bytes]);

  const filled = Math.min(48, Math.ceil((stats.percent / 100) * 48));

  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1140px]">
        <SectionHead
          number="06"
          label="显存为什么上涨"
          title="对话更长、层数更多、同时聊天的人更多，缓存都会变大"
          intro={
            <>
              <p>
                KV Cache 通常放在显卡内存里。每个 token 在每一层都留数据，
                多个请求同时生成时，还要各存一份。
              </p>
              <p className="mt-3">
                这也是长对话常见的代价：模型少做重复计算，显存要腾出更多空间。
              </p>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] border-2 border-ink bg-white p-5 shadow-stamp-lg lg:col-span-5 lg:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">调整占用来源</h3>
              <DemoBadge />
            </div>
            <Slider
              label="每段对话长度"
              value={tokens}
              display={`${(tokens / 1024).toFixed(0)}K tokens`}
              min={1024}
              max={32768}
              step={1024}
              onChange={setTokens}
            />
            <Slider
              label="模型层数"
              value={layers}
              display={`${layers} 层`}
              min={16}
              max={80}
              step={8}
              onChange={setLayers}
            />
            <Slider
              label="同时生成的请求"
              value={users}
              display={`${users} 个`}
              min={1}
              max={48}
              step={1}
              onChange={setUsers}
            />
            <div className="mt-6">
              <div className="mb-2 text-sm font-bold">每个数字占多少空间</div>
              <div className="inline-flex rounded-full border-2 border-ink bg-cream p-1">
                <button
                  onClick={() => setBytes(2)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${bytes === 2 ? "bg-ink text-cream" : ""}`}
                >
                  2 字节
                </button>
                <button
                  onClick={() => setBytes(1)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${bytes === 1 ? "bg-ink text-cream" : ""}`}
                >
                  1 字节
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border-2 border-ink bg-butter-tint p-5 shadow-stamp-lg lg:col-span-7 lg:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-ink/50">
                  24 GB 显存中的 KV Cache
                </div>
                <div className="mt-2 font-display text-4xl font-extrabold">
                  {stats.totalGB.toFixed(1)} GB
                </div>
                <div className="mt-1 text-sm text-ink/60">
                  每个请求约 {stats.perUserGB.toFixed(2)} GB
                </div>
              </div>
              <Users className="h-9 w-9 text-coral" strokeWidth={2.2} />
            </div>

            <div className="mt-7 grid grid-cols-8 gap-2">
              {Array.from({ length: 48 }, (_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md border-2 border-ink transition-colors duration-250 ${
                    index < filled
                      ? stats.percent > 100
                        ? "bg-pop"
                        : "bg-teal"
                      : "bg-white"
                  }`}
                />
              ))}
            </div>
            <div className="mt-5">
              <Meter
                value={Math.min(stats.percent, 100)}
                tone={stats.percent > 100 ? "pop" : stats.percent > 75 ? "coral" : "teal"}
              />
            </div>
            {stats.percent > 100 ? (
              <div className="mt-5 flex gap-3 rounded-2xl border-2 border-ink bg-pop p-4 text-white">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-none" />
                <p className="text-sm leading-relaxed">
                  仅缓存的示意占用已经超过 24 GB。真实服务还要给模型参数和临时计算留空间，
                  因此能同时接的请求会更少。
                </p>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                当前 KV Cache 约占这张卡的 {Math.min(100, stats.percent).toFixed(0)}%。
                剩余空间还要放模型参数和计算过程中的临时数据。
              </p>
            )}
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-ink/45">
              缓存大小取决于层数、token 数、每层保存多少 K/V 数字，以及每个数字占多少字节。
              这里暂用“8 组、每组 128 个数字”演示；不同模型会使用不同数值。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Slider: React.FC<{
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}> = ({ label, value, display, min, max, step, onChange }) => (
  <label className="mt-6 block">
    <span className="flex items-center justify-between gap-3">
      <span className="text-sm font-bold">{label}</span>
      <span className="font-mono text-xs">{display}</span>
    </span>
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
      className="range-control mt-3"
    />
  </label>
);

export default SectionMemoryPressure;
