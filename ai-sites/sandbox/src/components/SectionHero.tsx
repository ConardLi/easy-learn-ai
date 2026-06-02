/**
 * SectionHero · Agent 沙箱是什么？
 *
 * Hero 开场纪律：
 *   1. eyebrow tag
 *   2. H1「Agent 沙箱是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）
 *   4. 白话铺垫：rm -rf 风险 + Prompt 注入威胁
 *   5. 视觉锚：围栏（虚线方框）里一个 Agent 小角色，外部箭头试图穿入被弹回
 *   6. 过渡句 + 滚动提示
 *
 * 跟相邻 Agent / AgentLoop / AgentMemory 拉开：
 *   - 它们：圆 / 椭圆 / 抽屉柜
 *   - 这里：方形围栏 + 弹回箭头，整体偏「边界 + 阻挡」语义
 */
import React from "react";
import { ArrowDown, ExternalLink, ShieldAlert } from "lucide-react";

const BLOCKED_ARROWS = [
  { angle: -120, label: "rm -rf ~/" },
  { angle: -60, label: "curl evil.com" },
  { angle: 60, label: "cat ~/.ssh/id_rsa" },
  { angle: 120, label: "echo >> .bashrc" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：左上散落小方块（呼应「围栏」语义） */}
      <div className="absolute top-16 left-[6%] hidden md:grid grid-cols-3 gap-2 pointer-events-none opacity-55">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 border-2 border-ink/35"
            style={{ transform: `rotate(${i * 7}deg)` }}
          />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Agent Sandbox · 智能体沙箱
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Agent 沙箱
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[640px] text-ink">
            给 AI Agent 划一块{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">安全围栏</span>
            </span>
            ：里面随便干，出了围栏就碰壁。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你让 Agent 帮你跑一段脚本，它老老实实跑了。
              要是这段脚本里藏着一句{" "}
              <code className="font-mono text-[14.5px] text-pop">rm -rf ~/</code>
              ，或者偷偷把你的 SSH 私钥发到远程服务器呢？
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              Agent 的本事是「帮你执行操作」—— 读文件、写文件、跑命令、发请求（围栏圈住的就是 Agent 的这副手脚，想先搞懂这副手脚怎么来的，看{" "}
              <a
                href="../agent/index.html"
                className="font-semibold underline decoration-coral/40 underline-offset-2 hover:decoration-coral"
              >
                《Agent》
              </a>
              ）。
              <span className="text-ink/65">
                Prompt 注入 = 坏人把恶意指令藏进你发给 Agent 的文字或代码里，Agent 误以为是你的意思就去执行。
              </span>
              一旦被 Prompt 注入劫持，Agent 权限就是你的权限 —— 它就是一个拥有你全部权限的攻击者。
              <span className="font-bold text-ink">沙箱要解决的事就一句话：让 Agent 干活的同时，确保它搞不了破坏。</span>
            </p>
          </div>

          {/* 互链卡：围栏管「能不能干」，模式管「点不点头」→ Agent Modes */}
          <a
            href="../agent-modes/index.html"
            className="mt-8 inline-flex items-start gap-3 max-w-[580px] px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
              <span className="font-bold text-ink">围栏是底线，松紧档位看运行模式。</span>
              <span className="text-ink/65">
                {" "}
                这站管「能碰哪些文件、连哪些网」，每步要不要点头由模式定 → 去《Agent Modes》那一站，两层叠起来才完整。
              </span>
            </span>
          </a>

          {/* 过渡句 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一段被弹窗逼瞎眼的现场，再聊围栏怎么围、谁来强制、什么时候不够用。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>往下滚 · ~12 分钟</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 围栏 + Agent + 弹回箭头 ─── */}
        <div className="lg:col-span-5">
          <div className="relative h-[440px] flex items-center justify-center">
            <svg viewBox="0 0 360 360" className="w-full h-full max-w-[420px]">
              {/* 围栏外标签 */}
              <g transform="translate(180,32)">
                <rect x="-44" y="-12" width="88" height="22" rx="4" fill="#241C15" />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="10"
                  fontWeight="800"
                  letterSpacing="1.8"
                  fill="#FBEFE3"
                >
                  SANDBOX
                </text>
              </g>

              {/* 围栏阴影 */}
              <rect
                x="56"
                y="56"
                width="248"
                height="248"
                rx="22"
                fill="#241C15"
                opacity="0.85"
                transform="translate(4,4)"
              />
              {/* 围栏主体（虚线） */}
              <rect
                x="56"
                y="56"
                width="248"
                height="248"
                rx="22"
                fill="#FBE891"
                fillOpacity="0.55"
                stroke="#241C15"
                strokeWidth="2.5"
                strokeDasharray="9 6"
              />

              {/* 四个角的「✕」防护标 */}
              {[
                { x: 56, y: 56 },
                { x: 304, y: 56 },
                { x: 56, y: 304 },
                { x: 304, y: 304 },
              ].map((c, i) => (
                <g key={i} transform={`translate(${c.x},${c.y})`}>
                  <circle cx="0" cy="0" r="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
                  <path
                    d="M -4 -4 L 4 4 M 4 -4 L -4 4"
                    stroke="#241C15"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              ))}

              {/* 外部攻击箭头（被围栏弹回） */}
              {BLOCKED_ARROWS.map((arrow, i) => {
                const rad = (arrow.angle * Math.PI) / 180;
                const startR = 175;
                const endR = 132;
                const sx = 180 + Math.cos(rad) * startR;
                const sy = 180 + Math.sin(rad) * startR;
                const ex = 180 + Math.cos(rad) * endR;
                const ey = 180 + Math.sin(rad) * endR;
                const labelR = 188;
                const lx = 180 + Math.cos(rad) * labelR;
                const ly = 180 + Math.sin(rad) * labelR;
                return (
                  <g key={i}>
                    {/* 入向箭头 */}
                    <line
                      x1={sx}
                      y1={sy}
                      x2={ex}
                      y2={ey}
                      stroke="#E07A5F"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="6 4"
                    />
                    {/* 箭头头 */}
                    <g transform={`translate(${ex},${ey}) rotate(${(arrow.angle + 180)})`}>
                      <path d="M -6 -4 L 0 0 L -6 4 Z" fill="#E07A5F" />
                    </g>
                    {/* 弹回标 */}
                    <g transform={`translate(${ex},${ey})`}>
                      <circle cx="0" cy="0" r="9" fill="#FBEFE3" stroke="#E07A5F" strokeWidth="2" />
                      <path
                        d="M -3.5 -3.5 L 3.5 3.5 M 3.5 -3.5 L -3.5 3.5"
                        stroke="#E07A5F"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </g>
                    {/* 攻击命令标签 */}
                    <g transform={`translate(${lx},${ly})`}>
                      <text
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="9"
                        fontWeight="700"
                        fill="#5A5147"
                      >
                        {arrow.label}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* 中央 Agent 小角色 */}
              <g transform="translate(180,180)">
                {/* 阴影 */}
                <rect x="-36" y="-32" width="72" height="64" rx="14" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
                {/* 主体 */}
                <rect x="-36" y="-32" width="72" height="64" rx="14" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />
                {/* 天线 */}
                <line x1="0" y1="-32" x2="0" y2="-44" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="0" cy="-46" r="4" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
                {/* 眼睛 */}
                <circle cx="-11" cy="-10" r="4" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
                <circle cx="-11" cy="-10" r="1.8" fill="#241C15" />
                <circle cx="11" cy="-10" r="4" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
                <circle cx="11" cy="-10" r="1.8" fill="#241C15" />
                {/* 嘴 */}
                <path d="M -7 8 Q 0 14 7 8" fill="none" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
                {/* 标签 */}
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9"
                  fontWeight="800"
                  letterSpacing="1.5"
                  fill="#FBEFE3"
                >
                  AGENT
                </text>
              </g>

              {/* 围栏内的小标语 */}
              <g transform="translate(180,290)">
                <rect x="-58" y="-10" width="116" height="20" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9"
                  fontWeight="700"
                  fill="#241C15"
                >
                  里面 · 干活自由
                </text>
              </g>
            </svg>

            {/* 底部图例 */}
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 inline-flex items-center gap-3 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full shadow-stamp">
              <ShieldAlert className="w-4 h-4 text-butter" strokeWidth={2.4} />
              <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase">
                越界请求 · 一律弹回
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
