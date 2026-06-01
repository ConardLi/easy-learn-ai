/**
 * Section 01 · Hero
 *
 * 反直觉钩子：模型从不调用任何函数 —— 它只是「填了一张调用单」交给你的代码。
 *
 * 主交互（L3 · 4 步动画 trace）：
 *   ① 点 play 按 cursor 推进 4 个气泡
 *   ② 第 2 步气泡里展开一张「调用单」卡（餐厅点单条样式）
 *   ③ reset 回到起点
 *
 * 区别于本站后续：
 *   ─ Hero 用「角色 lifeline + 概念卡片」，**完全无 raw JSON / 代码块**
 *   ─ raw response 字段细节让 §02 messages round-trip 去讲
 *   ─ §02 是 messages 数组堆叠 · 这里是 4 步对话气泡
 */
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowDown,
  ExternalLink,
  User,
  Sparkles,
  Wrench,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

type Actor = "user" | "model" | "code";

type Step = {
  actor: Actor;
  /** 气泡里说的话 */
  text: string;
  /** 第 2 步专属：调用单卡片 */
  card?: {
    fn: string;
    args: { k: string; v: string }[];
  };
  /** 第 3 步专属：跑出来的结果（结果卡）*/
  result?: { k: string; v: string }[];
  /** 这一步在解释什么（给气泡下面的小灰字）*/
  caption?: string;
};

const STEPS: Step[] = [
  {
    actor: "user",
    text: "今天北京要带伞吗？",
    caption: "用户开口提问",
  },
  {
    actor: "model",
    text: "我不直接回答 —— 我填一张「调用单」交给你的代码。",
    card: {
      fn: "get_weather",
      args: [
        { k: "城市", v: "北京" },
        { k: "日期", v: "今天" },
      ],
    },
    caption: "模型「想用工具」时的真实长相",
  },
  {
    actor: "code",
    text: "拿到调用单 → 真的去查 OpenWeather API。",
    result: [
      { k: "温度", v: "18–24°C" },
      { k: "降雨概率", v: "60%" },
      { k: "开始时间", v: "今天 11:00" },
    ],
    caption: "执行调用的是你的代码，不是模型",
  },
  {
    actor: "model",
    text: "今天 11 点起有 60% 几率下雨，18–24°C，建议带伞。",
    caption: "模型拿到结果，再用一句话回答你",
  },
];

const STEP_LABEL: Record<Actor, { name: string; sub: string }> = {
  user: { name: "你", sub: "提问 / 阅读" },
  model: { name: "模型", sub: "出意图 / 出答案" },
  code: { name: "你的代码", sub: "执行调用" },
};

const ACTOR_COLOR: Record<Actor, { dot: string; ring: string }> = {
  user: { dot: "bg-coral", ring: "ring-coral/40" },
  model: { dot: "bg-butter", ring: "ring-butter/55" },
  code: { dot: "bg-teal", ring: "ring-teal/45" },
};

const PLAY_INTERVAL_MS = 1700;

const SectionHero: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (cursor >= STEPS.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setCursor((c) => c + 1), PLAY_INTERVAL_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, cursor]);

  const togglePlay = () => {
    if (cursor >= STEPS.length - 1) {
      setCursor(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  };

  const reset = () => {
    setPlaying(false);
    setCursor(0);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[6%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-2xl shadow-stamp -rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-28 left-[5%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-9 h-9 bg-coral border-2 border-ink rounded-full shadow-stamp rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Function Calling · 函数调用
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Function Calling
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  让大模型「填一张调用单」交给你的代码：调哪个工具、参数填什么。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                你提前写一份说明书告诉模型：我这边有 <strong className="text-ink">get_weather</strong>、
                <strong className="text-ink">submit_leave</strong> 这些工具，每个要什么参数。
              </p>
              <p>
                模型回答时如果要查实时数据、读文件、跑 SQL，它不直接说话，
                而是<strong className="text-ink">填一张「调用单」</strong>—— 写明「调谁、参数填啥」。
              </p>
              <p>
                你的代码拿到调用单去真的执行 —— 调 API、查数据库 ——
                再把结果还给模型，模型这才用结果继续回答你。
              </p>
            </div>

            {/* 互链卡：分锅 FC vs MCP */}
            <a
              href="../mcp/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">先看 FC 还是先看 MCP？</span>
                <span className="text-ink/70">
                  {" "}
                  这站讲<strong className="text-ink">模型怎么填调用单</strong>。
                  调用单怎么送到 GitHub / 数据库这些工具服务 —— 另有一篇讲《MCP》，搭着看更清楚。
                </span>
              </span>
            </a>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
              </div>
            </div>
          </div>

          {/* 右：4 步动画 lifeline */}
          <div className="lg:col-span-7">
            <div className="relative bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl overflow-hidden">
              {/* 卡顶 */}
              <div className="flex items-center justify-between px-5 lg:px-6 py-3.5 border-b-2 border-ink bg-white">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[15px] font-bold text-ink">
                    一次完整问答
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                    · 4 步走完
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-ink/45 tabular-nums">
                  {cursor + 1} / {STEPS.length}
                </span>
              </div>

              {/* 三角色 lifeline 头 */}
              <div className="grid grid-cols-3 gap-2 px-5 lg:px-6 pt-4 pb-3 border-b border-ink/10">
                {(["user", "model", "code"] as Actor[]).map((a) => {
                  const active = STEPS[cursor].actor === a;
                  const Icon = a === "user" ? User : a === "model" ? Sparkles : Wrench;
                  return (
                    <div
                      key={a}
                      className={[
                        "flex items-center gap-2 px-2.5 py-1.5 rounded-xl border-2 transition-all duration-300",
                        active
                          ? "border-ink bg-ink text-cream shadow-stamp"
                          : "border-ink/15 bg-white text-ink/55",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "w-7 h-7 rounded-lg border-2 border-ink flex items-center justify-center shrink-0",
                          ACTOR_COLOR[a].dot,
                        ].join(" ")}
                      >
                        <Icon
                          className={[
                            "w-3.5 h-3.5",
                            a === "code" ? "text-cream" : "text-ink",
                          ].join(" ")}
                          strokeWidth={2.5}
                        />
                      </span>
                      <div className="min-w-0">
                        <div className="font-display text-[12.5px] font-bold leading-tight truncate">
                          {STEP_LABEL[a].name}
                        </div>
                        <div
                          className={[
                            "font-mono text-[9.5px] mt-0.5 truncate uppercase tracking-[0.1em]",
                            active ? "text-butter" : "text-ink/40",
                          ].join(" ")}
                        >
                          {STEP_LABEL[a].sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4 步气泡区 */}
              <div className="relative px-5 lg:px-6 py-5 min-h-[360px]">
                <div className="space-y-3">
                  {STEPS.slice(0, cursor + 1).map((step, i) => (
                    <Bubble key={i} step={step} index={i} isLatest={i === cursor} />
                  ))}
                  {cursor < STEPS.length - 1 && (
                    <div className="flex items-center gap-2 pl-4 mt-2 animate-enter-fade">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-pulse-dot" />
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/40">
                        下一步 · 按 ▶ 或 next
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 控制条 */}
              <div className="flex items-center justify-between px-5 lg:px-6 py-3.5 border-t-2 border-ink bg-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={reset}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    aria-label="重置"
                  >
                    <RotateCcw className="w-4 h-4 text-ink" strokeWidth={2.4} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="px-4 h-9 flex items-center gap-1.5 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                  >
                    {playing ? (
                      <>
                        <Pause className="w-3.5 h-3.5" strokeWidth={2.6} />
                        PAUSE
                      </>
                    ) : cursor >= STEPS.length - 1 ? (
                      <>
                        <Play className="w-3.5 h-3.5" strokeWidth={2.6} />
                        REPLAY
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" strokeWidth={2.6} />
                        PLAY
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPlaying(false);
                      setCursor((c) => Math.min(STEPS.length - 1, c + 1));
                    }}
                    disabled={cursor >= STEPS.length - 1}
                    className="px-3 h-9 flex items-center rounded-full bg-white border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                  >
                    NEXT
                  </button>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  关键看第 2 步 · 调用单
                </span>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10.5px] text-ink/45 px-1">
              「调用单」是给小白看的说法。下面 §02 看一次完整往返到底有几条消息、每条字段长啥样。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 气泡 ─── */

const Bubble: React.FC<{ step: Step; index: number; isLatest: boolean }> = ({
  step,
  index,
  isLatest,
}) => {
  const colors = ACTOR_COLOR[step.actor];
  const Icon =
    step.actor === "user" ? User : step.actor === "model" ? Sparkles : Wrench;

  return (
    <div
      className={[
        "rounded-2xl border-2 border-ink bg-white p-3.5 lg:p-4 transition-all duration-300",
        isLatest
          ? `shadow-stamp-lg ring-4 ${colors.ring} animate-enter-up`
          : "shadow-stamp opacity-95",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={[
            "w-6 h-6 rounded-md border-2 border-ink flex items-center justify-center shrink-0",
            colors.dot,
          ].join(" ")}
        >
          <Icon
            className={[
              "w-3 h-3",
              step.actor === "code" ? "text-cream" : "text-ink",
            ].join(" ")}
            strokeWidth={2.5}
          />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 font-bold tabular-nums">
          step {index + 1} · {STEP_LABEL[step.actor].name}
        </span>
      </div>

      <p className="text-[14.5px] text-ink/85 leading-relaxed">{step.text}</p>

      {/* 第 2 步：调用单卡片 */}
      {step.card && (
        <div
          className="mt-3 bg-butter border-2 border-ink rounded-xl shadow-stamp p-3 -rotate-[0.6deg] animate-enter-pop"
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex items-baseline justify-between mb-2 pb-2 border-b-2 border-dashed border-ink/30">
            <span className="font-display text-[13px] font-bold text-ink uppercase tracking-wider">
              调用单
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
              tool call
            </span>
          </div>
          <dl className="space-y-1.5">
            <div className="flex items-baseline gap-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink/55 w-12 shrink-0">
                函数
              </dt>
              <dd className="font-mono text-[13px] font-bold text-ink">
                {step.card.fn}
              </dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink/55 w-12 shrink-0 self-start mt-0.5">
                参数
              </dt>
              <dd className="flex-1 space-y-1">
                {step.card.args.map((a) => (
                  <div key={a.k} className="flex items-baseline gap-2">
                    <span className="font-sans text-[12.5px] text-ink/65">
                      {a.k}
                    </span>
                    <span className="font-mono text-[11.5px] text-ink/30">
                      ·
                    </span>
                    <span className="font-mono text-[12.5px] font-bold text-ink">
                      {a.v}
                    </span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* 第 3 步：查到的结果卡 */}
      {step.result && (
        <div
          className="mt-3 bg-ink text-cream rounded-xl border-2 border-ink p-3 animate-enter-pop"
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex items-baseline justify-between mb-2 pb-2 border-b border-cream/15">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter font-bold">
              ↩ 查到的结果
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-cream/45">
              api response
            </span>
          </div>
          <dl className="space-y-1">
            {step.result.map((r) => (
              <div key={r.k} className="flex items-baseline gap-2">
                <dt className="font-sans text-[12px] text-cream/60 w-20 shrink-0">
                  {r.k}
                </dt>
                <dd className="font-mono text-[12.5px] font-bold text-butter tabular-nums">
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {step.caption && (
        <p className="mt-2.5 font-serif italic text-[12px] text-ink/50 leading-relaxed">
          —— {step.caption}
        </p>
      )}
    </div>
  );
};

export default SectionHero;
