/**
 * Section 01 · Hero
 *
 * 进站第一秒：「Agent 运行模式是什么？」
 *  - eyebrow + H1（3-5 字 + 问号）
 *  - 一句话定义（butter underlay 高亮，完整陈述句）
 *  - 白话铺垫（2-3 段，每段 ≤ 2 句）
 *  - 视觉锚：变速杆三档（Plan/Default/Auto），跟 AgentCover 的「角色+循环」拉开
 *  - 滚动提示
 */
import React from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-28 overflow-hidden">
      {/* 背景装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[10%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-24 left-[8%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Agent Modes · 运行模式
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Agent 运行模式是什么？
            </h1>

            <p className="max-w-2xl font-display text-[22px] lg:text-[26px] font-bold text-ink leading-snug mb-6 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3.5 lg:h-5 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  控制本地 Coding Agent 自主权的三档：Plan 只看 / Default 边做边问 / Auto 自己跑。
                </span>
              </span>
            </p>

            <div className="max-w-xl space-y-3 text-[15.5px] lg:text-[16.5px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                敲一句「帮我重构这个模块」，几秒后十几个文件已经被改了 ——
                兴奋也后怕。
              </p>
              <p>
                本地 Agent 直接动你的文件和终端，跟聊天 AI 不同，它有「手」（这只手怎么来的、怎么转，去{" "}
                <a
                  href="../agent/index.html"
                  className="font-semibold underline decoration-coral/40 underline-offset-2 hover:decoration-coral"
                >
                  《Agent》
                </a>
                看）。
                <strong className="text-ink"> 模式就是给这只手套的三档缰绳。</strong>
              </p>
              <p>
                这类工具都是装在你电脑上的 Coding Agent —— 能读改你项目文件、在终端跑命令，比 ChatGPT 多一双手。
                常见有三家：Claude Code、Codex CLI、OpenCode，档位思路一样。
              </p>
              <p>
                往下拖滑块、点档位、勾操作 —— 你会摸到这三档分别让 Agent 能做什么。
              </p>
            </div>

            {/* 互链卡：模式管「点不点头」，围栏管「能不能干」→ Agent 沙箱 */}
            <a
              href="../agent-sandbox/index.html"
              className="mt-8 inline-flex items-start gap-3 max-w-[580px] px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">松紧靠模式，硬围栏看沙箱。</span>
                <span className="text-ink/65">
                  {" "}
                  这站管「每步要不要点头」，越界能不能干由围栏定 → 去《Agent 沙箱》那一站，两层搭着用最稳。
                </span>
              </span>
            </a>

            <div className="mt-10 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
              </div>
            </div>
          </div>

          {/* 右：视觉锚 —— 三档变速杆 */}
          <div className="lg:col-span-5">
            <GearStickIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 视觉锚：变速杆三档 ─── */
const GearStickIllustration: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative aspect-square bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
        <div className="absolute inset-0 bg-butter/25" aria-hidden />
        {/* 网格 */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g stroke="#241C15" strokeWidth="0.4" opacity="0.06">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="200" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
            ))}
          </g>
        </svg>

        {/* 主图：变速杆 */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {/* 底座 */}
          <rect
            x="48"
            y="148"
            width="104"
            height="20"
            rx="6"
            fill="#241C15"
            opacity="0.85"
            transform="translate(3,3)"
          />
          <rect
            x="48"
            y="148"
            width="104"
            height="20"
            rx="6"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="2.5"
          />
          {/* 三档轨道 */}
          <line
            x1="60"
            y1="158"
            x2="140"
            y2="158"
            stroke="#241C15"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            opacity="0.5"
          />
          {/* 三个档位标记点 */}
          {[
            { x: 60, label: "PLAN", color: "#F4D35E" },
            { x: 100, label: "DEFAULT", color: "#E07A5F" },
            { x: 140, label: "AUTO", color: "#1B4B5A" },
          ].map((p) => (
            <g key={p.label}>
              <circle
                cx={p.x}
                cy={158}
                r="3.5"
                fill="#241C15"
                opacity="0.6"
              />
            </g>
          ))}

          {/* 杆 */}
          <g>
            <line
              x1="100"
              y1="158"
              x2="100"
              y2="60"
              stroke="#241C15"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* 握把：旋钮 */}
            <circle
              cx="100"
              cy="56"
              r="20"
              fill="#241C15"
              opacity="0.85"
              transform="translate(3,3)"
            />
            <circle
              cx="100"
              cy="56"
              r="20"
              fill="#E07A5F"
              stroke="#241C15"
              strokeWidth="2.5"
            />
            <text
              x="100"
              y="60"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9"
              fontWeight="800"
              letterSpacing="1.2"
              fill="#FBEFE3"
            >
              MODE
            </text>
          </g>

          {/* 三档标签条 */}
          <g transform="translate(100,180)">
            <text
              x="-40"
              y="6"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#241C15"
              opacity="0.75"
            >
              PLAN
            </text>
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#241C15"
            >
              DEFAULT
            </text>
            <text
              x="40"
              y="6"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#241C15"
              opacity="0.75"
            >
              AUTO
            </text>
          </g>

          {/* 三盏信号灯 */}
          <g transform="translate(38,30)">
            <rect
              x="-12"
              y="-8"
              width="24"
              height="86"
              rx="6"
              fill="#FBEFE3"
              stroke="#241C15"
              strokeWidth="2"
            />
            <circle cx="0" cy="6" r="6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
            <circle cx="0" cy="30" r="6" fill="#E07A5F" stroke="#241C15" strokeWidth="1.5" />
            <circle cx="0" cy="54" r="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
          </g>
        </svg>

        {/* 标签贴 */}
        <div
          aria-hidden
          className="absolute top-3 left-3 px-2 py-0.5 bg-ink text-cream rounded-md font-mono text-[9px] uppercase tracking-[0.2em] z-20"
        >
          fig · 01
        </div>
        <div
          aria-hidden
          className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-dot" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
            three gears
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
