/**
 * Section 01 · Hero
 *
 * 直接放核心交互：右侧是一个真实 safetensors 文件的「拆开图」。
 * 用户点上面的张量名（pill），右边数据块高亮，下面 mono 显示这个张量存在文件哪个字节范围。
 * 第一秒就让用户摸到「这就是一个有目录的文件」。
 */
import React, { useState } from "react";
import { ArrowDown, FileLock2 } from "lucide-react";

/* 一个迷你模型的张量清单（仿真实 safetensors header） */
const TENSORS = [
  { name: "embed.weight", shape: "[32000, 768]", dtype: "F16", bytes: 49152000, color: "bg-teal" },
  { name: "layer0.attn.q", shape: "[768, 768]", dtype: "F16", bytes: 1179648, color: "bg-coral" },
  { name: "layer0.attn.k", shape: "[768, 768]", dtype: "F16", bytes: 1179648, color: "bg-butter-deep" },
  { name: "layer0.mlp.up", shape: "[768, 3072]", dtype: "F16", bytes: 4718592, color: "bg-pop" },
  { name: "norm.weight", shape: "[768]", dtype: "F32", bytes: 3072, color: "bg-ink" },
];

function fmtBytes(b: number): string {
  if (b >= 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + " MB";
  if (b >= 1024) return (b / 1024).toFixed(1) + " KB";
  return b + " B";
}

const SectionHero: React.FC = () => {
  const [active, setActive] = useState(0);

  /* 计算每个张量在数据区的起始偏移 */
  let offset = 0;
  const ranges = TENSORS.map((t) => {
    const start = offset;
    offset += t.bytes;
    return { ...t, start, end: offset };
  });
  const total = offset;
  const cur = ranges[active];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-coral border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Safetensors · 模型权重格式
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Safetensors
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
                <span className="relative z-10">
                  Safetensors 是一种保存模型权重的文件格式，加载时不会执行任何代码，所以安全；按地址直接读，所以快。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训练好的模型就是一大堆数字（权重）。这些数字得存进一个文件里，下次才能加载回来用。
              </p>
              <p>
                模型里这一块块数字，专业叫法是「张量」。Safetensors 就是装张量的「盒子」，给每个张量编好目录，写明叫什么、什么类型、放在文件哪个位置。
              </p>
              <p>
                它只装数字，不装任何能运行的东西。所以你下载别人的模型时，打开它不会有任何代码偷偷执行。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块就是一个 safetensors 文件拆开的样子。点不同的张量名，看它存在文件的哪一段。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-sans text-[13px] text-ink/55 leading-snug max-w-[260px]">
                先看一眼老格式埋了什么雷，再聊 safetensors 怎么躲开。
              </div>
            </div>
          </div>

          {/* 右：文件拆开图 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex items-center justify-center w-9 h-9 bg-teal border-2 border-ink rounded-xl">
                  <FileLock2 className="w-4 h-4 text-cream" strokeWidth={2.4} />
                </div>
                <div>
                  <div className="font-mono text-[13px] font-bold text-ink leading-none">
                    model.safetensors
                  </div>
                  <div className="font-mono text-[10px] text-ink/50 mt-1">
                    {fmtBytes(total)} · 5 个张量
                  </div>
                </div>
              </div>

              {/* 张量名 pill */}
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ① 这个文件里的张量（点一个）
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {ranges.map((t, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setActive(i)}
                      className={[
                        "px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                        on ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]" : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>

              {/* 数据区条带 */}
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ② 数据区里它占哪一段
              </div>
              <div className="flex h-12 w-full overflow-hidden rounded-lg border-2 border-ink mb-2">
                {ranges.map((t, i) => {
                  const on = i === active;
                  const w = (t.bytes / total) * 100;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setActive(i)}
                      title={t.name}
                      className={[
                        t.color,
                        "h-full transition-all duration-300 border-r-2 border-ink last:border-r-0",
                        on ? "opacity-100" : "opacity-35 hover:opacity-60",
                      ].join(" ")}
                      style={{ width: `${Math.max(w, 3)}%` }}
                    />
                  );
                })}
              </div>
              <p className="font-mono text-[10px] text-ink/45 mb-6">
                ↑ 每块宽度 = 它占的字节数。embed 最大，norm 最小。
              </p>

              {/* 当前张量详情 */}
              <div key={active} className="grid grid-cols-2 gap-3 pt-5 border-t border-ink/10 animate-enter-fade">
                <Detail label="名字" value={cur.name} />
                <Detail label="数据类型" value={cur.dtype} hint="数字用几位存，F16 比 F32 省一半空间" />
                <Detail label="形状 shape" value={cur.shape} hint="这块数字排成几行几列" />
                <Detail label="占用大小" value={fmtBytes(cur.bytes)} />
                <Detail
                  label="字节起点"
                  value={cur.start.toLocaleString()}
                  full
                  hint={`数据区第 ${cur.start.toLocaleString()} ~ ${cur.end.toLocaleString()} 字节`}
                />
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                示意文件，帮你感受结构 · 真实格式见 huggingface.co/docs/safetensors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Detail: React.FC<{ label: string; value: string; full?: boolean; hint?: string }> = ({
  label,
  value,
  full,
  hint,
}) => (
  <div className={full ? "col-span-2" : ""}>
    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-1">{label}</div>
    <div className="font-mono text-[14px] font-bold text-ink tabular-nums break-all">{value}</div>
    {hint && <div className="font-mono text-[10px] text-ink/45 mt-0.5">{hint}</div>}
  </div>
);

export default SectionHero;
