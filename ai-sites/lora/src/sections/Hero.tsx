import React from "react";
import { ChevronDown, Lock, ExternalLink } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6 md:px-12 lg:px-24 pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-12 items-start">
        <div>
          <p className="eyebrow mb-6">
            Low-Rank Adaptation（低秩 = 补丁很窄）· Microsoft 2021
          </p>
          <h1 className="font-display text-display-xl text-ink leading-[1.04] mb-8">
            LoRA 是什么？
          </h1>

          <p className="text-2xl md:text-3xl font-display leading-snug">
            <span className="bg-butter px-2 box-decoration-clone">
              LoRA = 把原模型上亿个权重冻住不动，旁边加一条很窄的「补丁通道」，只练这条补丁，几十 MB 就够。
            </span>
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-secondary max-w-xl">
            <p>
              想微调一个大模型，最常走的就是 LoRA。它省显存、省时间，几十 MB 的小文件就能改模型行为。
            </p>
            <p>
              原模型那张上亿数字的大表一个都不改，旁边并上一条又细又窄的补丁。训练只动这条补丁 —— 要改的数字少了一两个数量级，单张消费级显卡就跑得动。
            </p>
            <p>
              训完，这条补丁单独存成一个几十 MB 的小文件，叫 <span className="font-semibold text-ink">adapter（适配器）</span>。换个任务就换一个 adapter，底模一直不用动。下面几节讲清：挂在哪几层、训完怎么部署、有哪些变体。
            </p>
            <p className="text-ink-tertiary text-base">
              右边这张图就是 LoRA 的全部秘密：大表锁住不动，只在旁边练一条窄补丁，最后把两边结果加起来。
            </p>
          </div>

          <a
            href="../finetune/index.html"
            className="mt-7 flex items-start gap-3 max-w-xl card-stamp p-5 bg-butter/40 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-4 h-4 text-ink" />
            </span>
            <span className="text-sm leading-relaxed text-ink-secondary">
              <span className="font-semibold text-ink">LoRA 是《微调方法》6 种里最常用的一种。</span>
              {" "}那一站把全参、LoRA、QLoRA… 6 种摆一起横向对比；这一站只讲 LoRA，把它讲透。
              <span className="font-semibold text-ink"> → 去《微调方法》</span>
            </span>
          </a>

          <a
            href="../lora-rank/index.html"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-coral transition-colors"
          >
            那条补丁到底开多宽（秩 r）、α 怎么配 → 去《LoRA Rank》
          </a>

          <div className="mt-8 flex items-center gap-3 text-ink-tertiary text-sm">
            <ChevronDown className="w-4 h-4 animate-pulse-dot" />
            <span>继续往下看：挂哪层、训完怎么部署、有哪些变体</span>
          </div>
        </div>

        <div>
          <div className="card-stamp p-6 md:p-7 bg-white">
            <div className="flex items-center gap-2 mb-5">
              <span className="px-2 py-0.5 rounded-md bg-ink text-butter font-mono text-[10px] tracking-widest">原理图</span>
              <span className="font-mono text-xs text-ink-tertiary">LoRA 怎么改模型的一层</span>
            </div>

            <svg
              viewBox="0 0 420 272"
              className="w-full h-auto"
              role="img"
              aria-label="LoRA 旁路补丁原理图：原权重冻结，旁边并联一条窄补丁，结果相加"
            >
              <defs>
                <marker id="lora-arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
                  <path d="M0 0 L7 3 L0 6 Z" fill="#241C15" />
                </marker>
              </defs>

              {/* 主干：输入照常乘原权重 W（粗线，灰，不变） */}
              <path d="M58 132 L118 90" stroke="#241C15" strokeOpacity={0.35} strokeWidth={5} fill="none" />
              <path d="M294 90 L330 122" stroke="#241C15" strokeOpacity={0.35} strokeWidth={5} fill="none" markerEnd="url(#lora-arrow)" />

              {/* 旁路：补丁通道（细线，高亮，在学） */}
              <path d="M54 146 L128 196" stroke="#E07A5F" strokeWidth={2.5} fill="none" />
              <path d="M196 209 L214 209" stroke="#E07A5F" strokeWidth={2.5} fill="none" />
              <path d="M284 198 L342 150" stroke="#E07A5F" strokeWidth={2.5} fill="none" markerEnd="url(#lora-arrow)" />

              {/* 流动点：只在补丁路径上跑，强调「只有这条在训」 */}
              <circle r={4} fill="#E07A5F">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M54 146 L161 209 L249 209 L342 150" />
              </circle>

              {/* 输入 x */}
              <circle cx={42} cy={135} r={16} fill="#FBEFE3" stroke="#241C15" strokeWidth={2.5} />
              <text x={42} y={140} textAnchor="middle" fill="#241C15" fontSize={14} fontWeight={700}>x</text>
              <text x={42} y={172} textAnchor="middle" fill="#241C15" fillOpacity={0.55} fontSize={10}>输入</text>

              {/* 原权重 W（大表，冻结） */}
              <rect x={118} y={42} width={176} height={70} rx={12} fill="#241C15" fillOpacity={0.08} stroke="#241C15" strokeWidth={2.5} />
              <text x={216} y={74} textAnchor="middle" fill="#241C15" fontSize={15} fontWeight={700}>原权重 W</text>
              <text x={216} y={94} textAnchor="middle" fill="#241C15" fillOpacity={0.6} fontSize={10}>80 亿数字 · 一个都不改</text>
              {/* 锁 */}
              <g transform="translate(130 50)">
                <rect x={0} y={6} width={13} height={10} rx={2} fill="#241C15" />
                <path d="M2.5 6 V3.5 a4 4 0 0 1 8 0 V6" stroke="#241C15" strokeWidth={2} fill="none" />
              </g>
              <text x={150} y={130} textAnchor="middle" fill="#241C15" fillOpacity={0.45} fontSize={9.5}>照常乘一遍，不变</text>

              {/* 补丁通道 A·B */}
              <text x={205} y={184} textAnchor="middle" fill="#E07A5F" fontSize={11.5} fontWeight={700}>LoRA 补丁（A · B）</text>
              <rect x={130} y={194} width={66} height={32} rx={8} fill="#E07A5F" stroke="#241C15" strokeWidth={2.5} />
              <text x={163} y={214} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight={700}>A</text>
              <rect x={214} y={194} width={66} height={32} rx={8} fill="#1B4B5A" stroke="#241C15" strokeWidth={2.5} />
              <text x={247} y={214} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight={700}>B</text>
              <text x={205} y={250} textAnchor="middle" fill="#241C15" fillOpacity={0.6} fontSize={10}>又窄又小，只训这两条 · 占 0.5%</text>

              {/* 相加 */}
              <circle cx={348} cy={135} r={17} fill="#F4D35E" stroke="#241C15" strokeWidth={2.5} />
              <text x={348} y={141} textAnchor="middle" fill="#241C15" fontSize={18} fontWeight={700}>+</text>
              <path d="M366 135 L406 135" stroke="#241C15" strokeWidth={2.5} fill="none" markerEnd="url(#lora-arrow)" />
              <text x={388} y={122} textAnchor="middle" fill="#241C15" fillOpacity={0.55} fontSize={10}>输出</text>
            </svg>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Stat label="只训" value="0.5%" tone="coral" />
              <Stat label="补丁文件" value="~40MB" tone="teal" />
              <Stat label="训练显存" value="↓ 10×" tone="ink" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-ink-tertiary">
              <Lock className="w-3.5 h-3.5" />
              <span>灰色大表全程锁住，只有彩色补丁在学</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "coral" | "teal" | "ink" }) {
  const bg = tone === "coral" ? "bg-coral text-white" : tone === "teal" ? "bg-teal text-white" : "bg-ink text-butter";
  return (
    <div>
      <div className={`${bg} border-2 border-ink rounded-xl py-2 font-display text-xl font-bold`}>{value}</div>
      <div className="mt-1 text-[10px] font-mono text-ink-tertiary tracking-widest uppercase">{label}</div>
    </div>
  );
}
