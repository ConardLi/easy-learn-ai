/**
 * Section 04 · 为什么加载快（零拷贝 / 内存映射）
 *
 * 概念：老格式加载要「解包 → 复制一份到内存」；safetensors 因为目录里写明了每个张量
 * 在文件的精确位置，可以直接「内存映射」——让内存指向硬盘上的那段，不用先复制。
 *
 * 交互：pill 切换「老格式 / safetensors」，看两条加载流水线的步骤差异 + 一个加载耗时对比条。
 */
import React, { useState } from "react";
import { HardDrive, Cpu, Zap } from "lucide-react";

type Mode = "old" | "safe";

const FLOW: Record<Mode, { steps: { icon: "disk" | "copy" | "ram"; text: string }[]; time: number; note: string }> = {
  old: {
    steps: [
      { icon: "disk", text: "把整个文件读进来" },
      { icon: "copy", text: "解包 pickle，重建对象" },
      { icon: "copy", text: "再复制一份到模型用的内存" },
      { icon: "ram", text: "终于能用了" },
    ],
    time: 100,
    note: "中间多了「解包 + 复制」两道工序，文件越大越慢。",
  },
  safe: {
    steps: [
      { icon: "disk", text: "读一眼目录，知道每个张量在哪" },
      { icon: "ram", text: "让内存直接指向硬盘上那段（内存映射）" },
      { icon: "ram", text: "用到哪块才读哪块，不复制" },
    ],
    time: 28,
    note: "省掉了解包和复制，几乎是「指过去就能用」。这叫零拷贝。",
  },
};

const ICONS = {
  disk: HardDrive,
  copy: Cpu,
  ram: Zap,
};

const SectionZeroCopy: React.FC = () => {
  const [mode, setMode] = useState<Mode>("safe");
  const data = FLOW[mode];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">why it's fast</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          为什么 safetensors 加载还特别快？
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          因为目录里写明了每个张量的精确位置，程序可以直接「指过去读」，省掉老格式那两道搬运工序。
        </p>

        {/* pill 切换 */}
        <div className="inline-flex gap-1.5 p-1.5 bg-cream border-2 border-ink rounded-full mb-7">
          {(["old", "safe"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={[
                "px-5 py-2 rounded-full font-bold text-[13px] transition-all duration-250 ease-spring",
                mode === m ? "bg-ink text-cream shadow-stamp" : "text-ink/60 hover:text-ink",
              ].join(" ")}
            >
              {m === "old" ? "老格式 .bin" : "safetensors"}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* 流水线 */}
          <div className="lg:col-span-3 bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-4">
              加载这个模型，要走几步
            </div>
            <div key={mode} className="space-y-2.5">
              {data.steps.map((s, idx) => {
                const Icon = ICONS[s.icon];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-ink rounded-2xl animate-enter-up"
                    style={{ animationDelay: `${idx * 70}ms` }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-cream border-2 border-ink rounded-xl shrink-0">
                      <Icon className="w-4 h-4 text-ink" strokeWidth={2.3} />
                    </div>
                    <span className="font-mono text-[11px] text-ink/40 shrink-0">{idx + 1}</span>
                    <span className="text-[14px] text-ink/80 font-medium">{s.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 耗时对比 + 说明 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-teal border-2 border-ink rounded-3xl shadow-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/70 mb-2">
                相对加载耗时（示意）
              </div>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="font-display text-[44px] font-bold text-cream leading-none tabular-nums">
                  {data.time}
                </span>
                <span className="font-mono text-[13px] text-cream/60">/ 100</span>
              </div>
              <div className="h-3 bg-cream/20 rounded-full overflow-hidden border border-cream/30">
                <div
                  className="h-full bg-butter transition-all duration-500 ease-spring"
                  style={{ width: `${data.time}%` }}
                />
              </div>
            </div>

            <div className="bg-cream border-2 border-ink rounded-2xl p-5">
              <p className="text-[14.5px] text-ink/80 leading-relaxed">{data.note}</p>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink/45 max-w-2xl">
          「内存映射 / 零拷贝」= 不把数据复制到新地方，而是让程序直接用硬盘上原来那份。示意对比，真实倍率随硬件和模型大小而变。
        </p>
      </div>
    </section>
  );
};

export default SectionZeroCopy;
