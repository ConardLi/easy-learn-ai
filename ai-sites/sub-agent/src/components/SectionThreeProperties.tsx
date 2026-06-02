/**
 * SectionThreeProperties · SubAgent 的三个核心属性（L3 动画回放）
 *
 * 主交互（L3 多状态播放器）：
 *   - 4 帧动画演示 SubAgent 完整生命周期 idle → spawn → working → return
 *   - Play / Pause / Step / Reset 控件，自动播放每 1.6s 推一帧
 *   - 每一帧高亮对应的核心属性，让用户「看着这条属性发生在哪一步」
 *   - 主对话 / 子 Agent 两个面板并排，气泡 + 工具 trace 实时 enter 动画
 *
 * 三属性 chip 既是说明开关，也是「跳到该属性最相关那帧」的快捷键。
 *
 * 跟相邻 SectionContextRot（slider）拉开：那是单参数实时反馈，
 * 这里是时间轴动画 + 多面板联动。
 */
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  ShieldCheck,
  FileText,
  Play,
  Pause,
  StepForward,
  RotateCcw,
  ArrowRight,
  User,
  Bot,
  Wrench,
  ExternalLink,
} from "lucide-react";

type PropKey = "isolation" | "tools" | "summary";

type FrameKey = "idle" | "spawn" | "working" | "return";

const PROPS: Record<
  PropKey,
  {
    label: string;
    en: string;
    icon: React.ReactNode;
    tone: string; // 选中态色
    accent: string; // 文字色
    headline: string;
    whatItMeans: string;
    activeFrames: FrameKey[]; // 这条属性在哪几帧最该高亮
    jumpFrame: FrameKey;
  }
> = {
  isolation: {
    label: "独立上下文",
    en: "Isolated Context",
    icon: <Box className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    accent: "text-butter-deep",
    headline: "子 Agent 有它自己一块空地",
    whatItMeans:
      "干活的过程不会渗回主对话。主 Agent 永远只看到「问 → 摘要」，没有「问 → 翻 12 个文件 → 试 3 个工具 → 摘要」。",
    activeFrames: ["spawn", "working"],
    jumpFrame: "spawn",
  },
  tools: {
    label: "受限工具集",
    en: "Restricted Tools",
    icon: <ShieldCheck className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    accent: "text-coral",
    headline: "想越权也越不了",
    whatItMeans:
      "子 Agent 能调的工具通常比主 Agent 少。代码审查的子 Agent 只给 Read + Grep，不给 Write —— 它想改你代码，框架层就拒。",
    activeFrames: ["working"],
    jumpFrame: "working",
  },
  summary: {
    label: "摘要返回",
    en: "Summary Return",
    icon: <FileText className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    accent: "text-teal",
    headline: "只交一张 A4 纸",
    whatItMeans:
      "子 Agent 干完，主 Agent 只看到一条短回复（技术上是一次 tool 返回），中间几百行翻文件记录不会进主聊天。",
    activeFrames: ["return"],
    jumpFrame: "return",
  },
};

const ORDER: PropKey[] = ["isolation", "tools", "summary"];

const FRAME_ORDER: FrameKey[] = ["idle", "spawn", "working", "return"];

const FRAME_LABELS: Record<FrameKey, { num: string; cap: string; hint: string }> = {
  idle: { num: "01", cap: "主对话收到任务", hint: "干净状态，准备外包。" },
  spawn: { num: "02", cap: "派出子 Agent", hint: "在独立空间里起一份消息列表。" },
  working: { num: "03", cap: "子 Agent 在自己空间干活", hint: "翻文件、跑工具 —— 主对话看不见。" },
  return: { num: "04", cap: "只交回一句摘要", hint: "中间过程留在子空间，不污染主对话。" },
};

const TOOL_TRACE = [
  { tool: "Grep", arg: "calculate_tax in src/" },
  { tool: "Read", arg: "src/checkout.py:42" },
  { tool: "Read", arg: "src/invoice.py:18" },
  { tool: "Read", arg: "tests/test_tax.py" },
  { tool: "Grep", arg: "calculate_tax usage" },
];

const SUMMARY_LINE =
  "这函数被 12 处调用（其中 3 处是测试）。核心路径：checkout → calculate_tax → invoice。invoice 那条假设返回 Decimal。";

const SectionThreeProperties: React.FC = () => {
  const [active, setActive] = useState<PropKey>("isolation");
  const [frame, setFrame] = useState<FrameKey>("idle");
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const timerRef = useRef<number | null>(null);

  const p = PROPS[active];
  const frameIdx = FRAME_ORDER.indexOf(frame);

  // 当 frame 切换时同步高亮的属性（仅在 playing 时跟随，避免跟用户 chip 选择打架）
  useEffect(() => {
    if (!playing) return;
    if (frame === "spawn") setActive("isolation");
    else if (frame === "working") setActive("tools");
    else if (frame === "return") setActive("summary");
  }, [frame, playing]);

  // 自动播放循环
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setFrame((f) => {
        const i = FRAME_ORDER.indexOf(f);
        if (i >= FRAME_ORDER.length - 1) {
          setPlaying(false); // 走到末尾停下
          return f;
        }
        return FRAME_ORDER[i + 1];
      });
      setTick((t) => t + 1);
    }, frame === "working" ? 2200 : 1500);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [playing, frame, tick]);

  const stepForward = () => {
    setPlaying(false);
    setFrame((f) => {
      const i = FRAME_ORDER.indexOf(f);
      return i >= FRAME_ORDER.length - 1 ? f : FRAME_ORDER[i + 1];
    });
  };

  const reset = () => {
    setPlaying(false);
    setFrame("idle");
  };

  const togglePlay = () => {
    if (frame === FRAME_ORDER[FRAME_ORDER.length - 1]) {
      // 末帧再点 play 等于从头重播
      setFrame("idle");
      setPlaying(true);
      setTick((t) => t + 1);
    } else {
      setPlaying((v) => !v);
    }
  };

  const pickProperty = (k: PropKey) => {
    setActive(k);
    setPlaying(false);
    setFrame(PROPS[k].jumpFrame);
  };

  // 当前帧下要显示的子 Agent trace 条数
  const traceVisible =
    frame === "idle"
      ? 0
      : frame === "spawn"
      ? 1
      : frame === "working"
      ? TOOL_TRACE.length
      : TOOL_TRACE.length;

  const showSummaryBubble = frame === "return";
  const showInflyOrb = frame === "spawn";
  const showReturnOrb = frame === "return";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">What · 骨架三件事</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          就靠这{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">三件事</span>
          </span>
          ，撑起整个机制。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          各家产品名字不一样，但干的事就三件：分开聊、少给工具、只交摘要。
          <span className="font-bold text-ink"> 缺一个就不叫 SubAgent</span>。
          下面这段动画把一次外包从头到尾走给你看，
          <span className="font-bold text-ink"> 哪一步对应哪条属性，画面里直接亮给你 </span>。
        </p>

        {/* 三属性 chip · 既是开关也是跳帧 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {ORDER.map((key) => {
            const item = PROPS[key];
            const isActive = active === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => pickProperty(key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] tracking-[0.16em] uppercase transition-all duration-250 ease-spring ${
                  isActive
                    ? `${item.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                    : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                <span className={isActive ? "opacity-70" : "opacity-50"}>· {item.en}</span>
              </button>
            );
          })}
        </div>

        {/* 当前属性说明卡 */}
        <div key={active} className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 animate-enter-fade">
          <div className={`md:col-span-5 ${p.tone} border-2 border-ink rounded-2xl shadow-stamp p-5`}>
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-75 mb-1.5">
              这条属性
            </div>
            <div className="font-display font-extrabold text-[22px] leading-tight">
              {p.headline}
            </div>
          </div>
          <div className="md:col-span-7 card-stamp p-5">
            <p className="font-sans text-[14.5px] leading-[1.75] text-ink/85">{p.whatItMeans}</p>
            {active === "isolation" && (
              <>
                <p className="font-sans text-[13px] leading-[1.7] text-ink/70 mt-3 pt-3 border-t-2 border-dashed border-ink/15">
                  SubAgent 用独立的{" "}
                  <span className="font-semibold text-ink">上下文窗口</span>
                  ，不挤占主对话。
                </p>
                {/* 跨站入口·紧凑邮戳卡 → Context Window */}
                <a
                  href="../context-window/index.html"
                  className="mt-3 flex items-start gap-2.5 px-4 py-3 bg-white border-2 border-ink rounded-xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-ink mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="text-[13px] text-ink/75 leading-relaxed">
                    想搞清「上下文窗口」到底是什么
                    <span className="font-semibold text-ink"> → 去《Context Window》</span>。
                  </span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* 播放器：时间轴 + 控件 */}
        <div className="mt-10 card-stamp p-6 lg:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
              生命周期 · 4 帧回放
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-ink text-cream rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                {playing ? (
                  <>
                    <Pause className="w-3.5 h-3.5" strokeWidth={2.5} />
                    暂停
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" strokeWidth={2.5} />
                    {frame === "return" ? "重播" : "播放"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={stepForward}
                disabled={frameIdx >= FRAME_ORDER.length - 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <StepForward className="w-3.5 h-3.5" strokeWidth={2.5} />
                下一帧
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                aria-label="重置"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* 帧步骤条 */}
          <div className="flex items-stretch gap-2 mb-5">
            {FRAME_ORDER.map((f, i) => {
              const isActiveFrame = frame === f;
              const isPast = i < frameIdx;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setFrame(f);
                  }}
                  className={`flex-1 text-left border-2 border-ink rounded-xl px-3 py-2.5 transition-all duration-300 ease-spring ${
                    isActiveFrame
                      ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                      : isPast
                      ? "bg-butter/55 text-ink shadow-stamp"
                      : "bg-cream text-ink/55 shadow-stamp hover:text-ink"
                  }`}
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-70">
                    Frame {FRAME_LABELS[f].num}
                  </div>
                  <div className="font-display font-bold text-[13.5px] leading-tight mt-0.5">
                    {FRAME_LABELS[f].cap}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 主舞台：左 主对话 / 中 桥 / 右 子 Agent */}
          <div className="grid grid-cols-12 gap-3 lg:gap-4">
            {/* 左：主对话 */}
            <div className="col-span-12 md:col-span-5">
              <PanelHeader label="MAIN AGENT · 主对话" icon={<User className="w-3 h-3" strokeWidth={2.5} />} />
              <div className="border-2 border-ink rounded-2xl bg-cream p-4 min-h-[280px] flex flex-col gap-2.5">
                {/* 用户问题 */}
                <Bubble who="user" text="改一下 calculate_tax 这个函数。" />
                {/* idle 时只到这里 */}
                {frame === "idle" && (
                  <div className="mt-auto pt-2 font-mono text-[11px] text-ink/45 tracking-[0.05em]">
                    主 Agent 决定：派子 Agent 先去探一探。
                  </div>
                )}
                {/* spawn 时已经派出 */}
                {(frame === "spawn" || frame === "working") && (
                  <Bubble
                    who="agent"
                    text="我先派一个子 Agent 去摸清调用链。"
                    dim={frame === "working"}
                  />
                )}
                {/* return 时把摘要塞进主对话 */}
                {frame === "return" && (
                  <>
                    <Bubble who="agent" text="我先派一个子 Agent 去摸清调用链。" dim />
                    <Bubble who="tool" text="↩ SubAgent 返回" />
                    <Bubble who="agent" text={SUMMARY_LINE} highlight />
                  </>
                )}
              </div>
            </div>

            {/* 中：桥（动效层） */}
            <div className="col-span-12 md:col-span-2 relative min-h-[280px] flex items-center justify-center">
              <svg viewBox="0 0 100 280" className="absolute inset-0 w-full h-full">
                {/* 主轴线 */}
                <line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="260"
                  stroke="#241C15"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity={frame === "idle" ? 0.2 : 0.55}
                />
                {/* 出发点 / 终点圆 */}
                <circle cx="50" cy="20" r="5" fill="#241C15" />
                <circle cx="50" cy="260" r="5" fill="#241C15" />

                {/* 派出动画：从左飞向右（top 节点向右下方滑） */}
                {showInflyOrb && (
                  <g
                    key={`out-${tick}`}
                    style={{ transformOrigin: "50px 140px" }}
                  >
                    <circle cx="50" cy="140" r="9" fill="#F4D35E" stroke="#241C15" strokeWidth="2">
                      <animate attributeName="cy" from="40" to="240" dur="1.1s" fill="freeze" />
                      <animate attributeName="cx" from="20" to="80" dur="1.1s" fill="freeze" />
                    </circle>
                    <text
                      x="50"
                      y="125"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1.2"
                      fill="#241C15"
                      opacity="0.65"
                    >
                      SPAWN →
                    </text>
                  </g>
                )}

                {/* 工作中：节奏脉冲 */}
                {frame === "working" && (
                  <g>
                    <circle cx="50" cy="140" r="4" fill="#E07A5F" className="animate-pulse-dot" />
                    <circle cx="50" cy="100" r="3" fill="#E07A5F" opacity="0.5" className="animate-pulse-dot" />
                    <circle cx="50" cy="180" r="3" fill="#E07A5F" opacity="0.5" className="animate-pulse-dot" />
                    <text
                      x="50"
                      y="60"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1.2"
                      fill="#241C15"
                      opacity="0.5"
                    >
                      WORKING
                    </text>
                  </g>
                )}

                {/* 返回动画：从右飞回左 */}
                {showReturnOrb && (
                  <g key={`back-${tick}`}>
                    <circle cx="50" cy="140" r="9" fill="#1B4B5A" stroke="#241C15" strokeWidth="2">
                      <animate attributeName="cy" from="240" to="40" dur="1.1s" fill="freeze" />
                      <animate attributeName="cx" from="80" to="20" dur="1.1s" fill="freeze" />
                    </circle>
                    <text
                      x="50"
                      y="125"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1.2"
                      fill="#241C15"
                      opacity="0.65"
                    >
                      ← RETURN
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* 右：子 Agent 空间 */}
            <div className="col-span-12 md:col-span-5">
              <PanelHeader
                label="SUBAGENT · 独立空间"
                icon={<Bot className="w-3 h-3" strokeWidth={2.5} />}
                dim={frame === "idle"}
                done={frame === "return"}
              />
              <div
                className={`border-2 rounded-2xl p-4 min-h-[280px] flex flex-col gap-2 transition-all duration-300 ${
                  frame === "idle"
                    ? "bg-ink/[0.04] border-dashed border-ink/30 text-ink/45"
                    : frame === "return"
                    ? "bg-teal/15 border-teal"
                    : "bg-butter-tint border-ink"
                }`}
              >
                {frame === "idle" && (
                  <div className="m-auto text-center">
                    <div className="font-mono text-[11px] text-ink/55 tracking-[0.18em] uppercase">
                      还没开张
                    </div>
                    <div className="font-sans text-[13px] text-ink/55 mt-1">
                      点「播放」让主 Agent 派单。
                    </div>
                  </div>
                )}

                {/* tool 受限提示条（working 帧最明显） */}
                {frame !== "idle" && (
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border-2 transition-all duration-300 ${
                      frame === "working"
                        ? "bg-coral text-white border-coral shadow-stamp"
                        : "bg-cream text-ink/70 border-ink/30"
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-90">
                      tools 受限
                    </span>
                    <span className="font-mono text-[11px] font-bold">
                      Read · Grep · Glob
                      <span className="opacity-65"> · Write ✗</span>
                    </span>
                  </div>
                )}

                {/* trace 列表 */}
                {frame !== "idle" && !showSummaryBubble && (
                  <ul className="space-y-1.5 mt-1">
                    {TOOL_TRACE.slice(0, traceVisible).map((step, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 px-2.5 py-1.5 bg-cream border-2 border-ink/30 rounded-lg animate-enter-fade"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <Wrench className="w-3 h-3 text-ink/65" strokeWidth={2.4} />
                        <span className="font-mono text-[11px] text-ink/70">
                          <span className="text-coral font-bold">{step.tool}</span>{" "}
                          <span className="opacity-75">{step.arg}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* return 帧的摘要 */}
                {showSummaryBubble && (
                  <div className="m-auto text-center px-2">
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-teal mb-2">
                      SUMMARY · 一句话
                    </div>
                    <p className="font-sans text-[13.5px] leading-[1.65] text-ink">
                      {SUMMARY_LINE}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] text-ink/55 tracking-[0.18em] uppercase">
                      所有 trace 不带回主对话
                      <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </div>
                  </div>
                )}

                {/* 当前帧 footer */}
                {frame !== "idle" && !showSummaryBubble && (
                  <div className="mt-auto pt-2 border-t-2 border-dashed border-ink/15 font-mono text-[10.5px] text-ink/55 tracking-[0.05em]">
                    {FRAME_LABELS[frame].hint}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 当前帧 / 当前属性联动注释 */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {ORDER.map((key) => {
              const item = PROPS[key];
              const isHi = item.activeFrames.includes(frame);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pickProperty(key)}
                  className={`text-left border-2 border-ink rounded-2xl px-4 py-3 transition-all duration-300 ease-spring ${
                    isHi
                      ? `${item.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                      : "bg-cream text-ink/65 shadow-stamp"
                  }`}
                >
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-75 mb-0.5">
                    属性
                  </div>
                  <div className="flex items-center gap-2 font-display font-extrabold text-[15.5px] leading-tight">
                    {item.icon}
                    {item.label}
                  </div>
                  <div className="font-mono text-[10.5px] tracking-[0.05em] mt-1 opacity-75">
                    {isHi ? "← 这帧正在演" : "其他帧演这条"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const PanelHeader: React.FC<{
  label: string;
  icon: React.ReactNode;
  dim?: boolean;
  done?: boolean;
}> = ({ label, icon, dim, done }) => (
  <div className="flex items-center justify-between mb-2 px-1">
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.18em] uppercase border-2 ${
        dim
          ? "bg-cream text-ink/45 border-ink/30 border-dashed"
          : done
          ? "bg-teal text-cream border-ink"
          : "bg-ink text-cream border-ink"
      }`}
    >
      {icon}
      {label}
    </span>
    {done && (
      <span className="font-mono text-[9.5px] text-teal tracking-[0.18em] uppercase">
        DONE
      </span>
    )}
  </div>
);

const Bubble: React.FC<{
  who: "user" | "agent" | "tool";
  text: string;
  dim?: boolean;
  highlight?: boolean;
}> = ({ who, text, dim, highlight }) => {
  const label = who === "user" ? "USER" : who === "agent" ? "AGENT" : "TOOL";
  const tone =
    who === "user"
      ? "bg-ink text-cream"
      : highlight
      ? "bg-teal text-cream border-2 border-ink"
      : "bg-white border-2 border-ink text-ink";
  return (
    <div className={`flex items-start gap-2 ${dim ? "opacity-55" : ""} animate-enter-fade`}>
      <span
        className={`flex-shrink-0 mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded-full font-mono text-[9px] tracking-[0.18em] uppercase border ${
          who === "user"
            ? "bg-ink text-cream border-ink"
            : who === "agent"
            ? "bg-butter text-ink border-ink"
            : "bg-cream text-ink/55 border-ink/40"
        }`}
      >
        {label}
      </span>
      <div className={`flex-1 px-3 py-1.5 rounded-xl font-sans text-[13px] leading-snug ${tone}`}>
        {text}
      </div>
    </div>
  );
};

export default SectionThreeProperties;
