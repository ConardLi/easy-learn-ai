/**
 * Section 01 · Hero
 *
 * 核心交互直接放 hero：右侧选一个精度格式，看一个数字用多少位存、
 * 占多少空间、能存多准。第一秒摸到「精度格式 = 一个数字用多少位、怎么切分」。
 */
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";

type Fmt = {
  id: string;
  name: string;
  bits: number;
  sign: number;
  exp: number;
  mant: number;
  stored: string; // 一个示例数被这种格式存下来后的近似值
  tone: string;
};

const FORMATS: Fmt[] = [
  { id: "fp32", name: "FP32", bits: 32, sign: 1, exp: 8, mant: 23, stored: "3.14159265", tone: "bg-teal" },
  { id: "fp16", name: "FP16", bits: 16, sign: 1, exp: 5, mant: 10, stored: "3.14063", tone: "bg-coral" },
  { id: "bf16", name: "BF16", bits: 16, sign: 1, exp: 8, mant: 7, stored: "3.140625", tone: "bg-butter-deep" },
  { id: "fp8", name: "FP8", bits: 8, sign: 1, exp: 4, mant: 3, stored: "3.0", tone: "bg-pop" },
];

const SectionHero: React.FC = () => {
  const [fid, setFid] = useState("bf16");
  const f = FORMATS.find((x) => x.id === fid)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-butter-deep border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                精度格式 · FP32 / BF16 / FP16 / FP8
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              精度格式
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
                <span className="relative z-10">
                  精度格式说的是：模型里每个数字用多少个二进制位来存，以及这些位怎么切分。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                模型说到底就是几十亿个小数拼起来的。每个小数都得用一串 0 和 1（二进制位）来表示。
              </p>
              <p>
                用的位越多，数字存得越准、范围越大，但也越占空间。FP32 用 32 位，FP16 / BF16 用 16 位，FP8 只用 8 位。
              </p>
              <p>
                选哪种，是在「存得准不准」和「省不省空间、跑得快不快」之间做取舍。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边选不同格式，看同一个数 π 用它存下来变成什么样。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-sans text-[13px] text-ink/55 leading-snug max-w-[260px]">
                先看清一个浮点数到底由哪三部分拼成。
              </div>
            </div>
          </div>

          {/* 右：格式卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 选格式 */}
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ① 选一种格式
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-7">
                {FORMATS.map((x) => {
                  const on = x.id === fid;
                  return (
                    <button
                      key={x.id}
                      onClick={() => setFid(x.id)}
                      className={[
                        "py-2.5 rounded-md border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                        on ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]" : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {x.name}
                    </button>
                  );
                })}
              </div>

              {/* 位格子可视化 */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 一共 {f.bits} 个位，这么切
                </div>
                <span className="font-display text-[28px] font-bold text-ink leading-none tabular-nums">
                  {f.bits}<span className="font-mono text-[12px] text-ink/50 ml-1">位</span>
                </span>
              </div>
              <BitStrip key={fid} f={f} />

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 mb-7 font-mono text-[11px]">
                <Legend color="bg-ink" label={`符号 ${f.sign} 位`} />
                <Legend color="bg-coral" label={`指数 ${f.exp} 位 · 管范围`} />
                <Legend color="bg-butter-deep" label={`尾数 ${f.mant} 位 · 管精度`} />
              </div>

              {/* 存 π 的示例 */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-ink/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    想存的数 π
                  </div>
                  <div className="font-mono text-[18px] font-bold text-ink tabular-nums">3.14159265</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    用 {f.name} 存下来变成
                  </div>
                  <div className="font-mono text-[18px] font-bold text-coral tabular-nums">{f.stored}</div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/45">
                ↑ 位越少，能存的小数位越少，越「凑整」。示意近似值。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BitStrip: React.FC<{ f: Fmt }> = ({ f }) => {
  const cells: string[] = [
    ...Array(f.sign).fill("bg-ink"),
    ...Array(f.exp).fill("bg-coral"),
    ...Array(f.mant).fill("bg-butter-deep"),
  ];
  return (
    <div className="flex flex-wrap gap-1 animate-enter-fade">
      {cells.map((c, i) => (
        <div
          key={i}
          className={[c, "h-6 flex-1 min-w-[10px] max-w-[22px] rounded-[3px] border border-ink/40"].join(" ")}
        />
      ))}
    </div>
  );
};

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5 text-ink/65">
    <span className={[color, "w-3 h-3 rounded-[3px] border border-ink/40"].join(" ")} />
    {label}
  </span>
);

export default SectionHero;
