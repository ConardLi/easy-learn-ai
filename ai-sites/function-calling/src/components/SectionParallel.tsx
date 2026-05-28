/**
 * Section 04 · 并行调用，看着快，坑也多
 *
 * 反直觉钩子：parallel_tool_calls 默认开。但只有「真独立」的调用才省时间。
 * 模型把「下一步依赖上一步」误判为「可以一起跑」→ 拿空参数硬跑 → 错误。
 *
 * 主交互（L3）：双 toggle + 实时 timeline
 *   ① 场景：独立调用 / 依赖调用
 *   ② parallel_tool_calls：on / off
 *   → 看 timeline 怎么变 + 三个数字（轮数 / 延迟 / 状态）
 *
 * 区别于前 3 个 section：
 *   ─ Section 01: 静态 raw JSON dissection
 *   ─ Section 02: 单步 trace 增长 messages
 *   ─ Section 03: 输入框 + live JSON 评分
 *   ─ Section 04: SVG timeline + 双 toggle
 */
import React, { useState, useMemo } from "react";
import { Check, X, Zap, ToggleLeft, ToggleRight } from "lucide-react";

type ScenarioId = "independent" | "dependent";

const SectionParallel: React.FC = () => {
  const [scenario, setScenario] = useState<ScenarioId>("independent");
  const [parallel, setParallel] = useState(true);

  const state = useMemo(() => compute(scenario, parallel), [scenario, parallel]);

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">parallel · timing</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一次问 N 个工具，
          <br />
          比你想的{" "}
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">坑得多</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-2">
          GPT-5 / Claude Opus 4.6 默认都开 parallel —— 一次响应里吐 N 条
          tool_calls，宿主用 <code className="font-mono text-[13.5px] bg-ink/8 px-1 py-0.5 rounded">Promise.all</code>{" "}
          并发跑。延迟近乎砍半。
        </p>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          但有个隐藏前提：调用之间必须真独立。
          <strong className="text-ink">下一步需要上一步结果</strong>{" "}
          的场景，模型会把它们误判为可并行 → 第二个 call 拿空参数空跑。
        </p>

        {/* 控制区 */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {/* 场景 toggle */}
          <div className="bg-cream border-2 border-ink rounded-2xl p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              ① 场景 · scenario
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <ScenarioBtn
                on={scenario === "independent"}
                onClick={() => setScenario("independent")}
                title="独立"
                sub="问 BJ / SH 天气"
              />
              <ScenarioBtn
                on={scenario === "dependent"}
                onClick={() => setScenario("dependent")}
                title="依赖"
                sub="先订机票再订酒店"
              />
            </div>
          </div>

          {/* parallel toggle */}
          <div className="bg-cream border-2 border-ink rounded-2xl p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              ② parallel_tool_calls
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <ParallelBtn
                on={parallel}
                onClick={() => setParallel(true)}
                title="true"
                sub="一次吐 N 条"
                IconOn={ToggleRight}
              />
              <ParallelBtn
                on={!parallel}
                onClick={() => setParallel(false)}
                title="false"
                sub="一次 1 条"
                IconOn={ToggleLeft}
              />
            </div>
          </div>
        </div>

        {/* 主可视化 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
          {/* timeline header */}
          <div className="flex items-center justify-between px-5 py-3 bg-ink text-cream">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-butter">
              wall-clock timeline · 毫秒
            </div>
            <div className="font-mono text-[10px] text-cream/55">
              key={`${scenario}-${parallel}`}
            </div>
          </div>

          {/* timeline svg */}
          <div className="bg-cream px-3 sm:px-5 py-5">
            <Timeline key={`${scenario}-${parallel}`} state={state} />
          </div>

          {/* metric 3 卡 + verdict */}
          <div className="px-5 pb-5">
            <div className="grid sm:grid-cols-3 gap-2.5 mb-4">
              <Metric label="轮数" value={`${state.rounds}`} unit="次" />
              <Metric
                label="总延迟"
                value={`${state.latency}`}
                unit="ms"
                tone={state.latency > 2000 ? "coral" : "teal"}
              />
              <Metric
                label="结果"
                value={state.ok ? "正确" : "错误"}
                tone={state.ok ? "teal" : "coral"}
              />
            </div>

            <div
              className={[
                "px-4 py-3 rounded-xl border-2 flex gap-3 items-start",
                state.ok
                  ? "border-teal/30 bg-teal/8"
                  : "border-coral bg-coral/10",
              ].join(" ")}
            >
              {state.ok ? (
                <Check
                  className="w-4 h-4 text-teal shrink-0 mt-0.5"
                  strokeWidth={3}
                />
              ) : (
                <X
                  className="w-4 h-4 text-coral shrink-0 mt-0.5"
                  strokeWidth={3}
                />
              )}
              <div>
                <div className="font-display text-[14px] font-bold text-ink leading-tight mb-0.5">
                  {state.verdict.title}
                </div>
                <p className="text-[13.5px] text-ink/75 leading-relaxed">
                  {state.verdict.detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部 · 总结小卡 */}
        <div className="grid md:grid-cols-2 gap-3 mt-5">
          <RuleCard
            title="什么时候 parallel 真省时"
            items={[
              "两个 call 的参数完全不依赖彼此结果",
              "用 Promise.all / asyncio.gather 并发",
              "GPT-5 / Claude Opus 4.6 默认就开了，不用管",
            ]}
            tone="teal"
          />
          <RuleCard
            title="什么时候必须关 parallel"
            items={[
              "structured outputs（strict mode）与 parallel 不兼容",
              "tool_b 需要 tool_a 的结果当参数",
              "事务性操作：拿到 confirm 才能下一步",
            ]}
            tone="coral"
          />
        </div>
      </div>
    </section>
  );
};

/* ─── 计算 4 种状态 ─── */

type Block = {
  /** 起始 ms */
  t0: number;
  /** 持续 ms */
  dur: number;
  /** 这是哪个 tool */
  name: string;
  /** 哪一轮 round-trip 内 */
  round: number;
  /** 这条 call 是不是出错的（虚线红框） */
  errored?: boolean;
};

type State = {
  blocks: Block[];
  rounds: number;
  latency: number;
  ok: boolean;
  scale: number;
  verdict: { title: string; detail: string };
};

function compute(scenario: ScenarioId, parallel: boolean): State {
  if (scenario === "independent" && parallel) {
    /* 1 轮 · 两个工具并行 */
    const blocks: Block[] = [
      { t0: 0, dur: 350, name: "model → tool_calls", round: 0 },
      { t0: 350, dur: 620, name: "get_weather(BJ)", round: 0 },
      { t0: 350, dur: 580, name: "get_weather(SH)", round: 0 },
      { t0: 970, dur: 380, name: "model → final text", round: 0 },
    ];
    return {
      blocks,
      rounds: 1,
      latency: 1350,
      ok: true,
      scale: 1350,
      verdict: {
        title: "parallel 真省时",
        detail:
          "两个 get_weather 完全独立，宿主用 Promise.all 并发执行。一轮搞定。这就是「parallel_tool_calls 默认开」的初衷。",
      },
    };
  }
  if (scenario === "independent" && !parallel) {
    /* 串行：2 轮 */
    const blocks: Block[] = [
      { t0: 0, dur: 350, name: "model → tool_calls[BJ]", round: 0 },
      { t0: 350, dur: 620, name: "get_weather(BJ)", round: 0 },
      { t0: 970, dur: 360, name: "model → tool_calls[SH]", round: 1 },
      { t0: 1330, dur: 580, name: "get_weather(SH)", round: 1 },
      { t0: 1910, dur: 380, name: "model → final text", round: 1 },
    ];
    return {
      blocks,
      rounds: 2,
      latency: 2290,
      ok: true,
      scale: 2290,
      verdict: {
        title: "对，也慢",
        detail:
          "强制 parallel=false → 模型一次只发一个 call。2 轮往返，延迟约 1.7×。对独立任务来说是浪费。",
      },
    };
  }
  if (scenario === "dependent" && parallel) {
    /* 模型把依赖调用误并行 → book_hotel 拿空 city/date 报错 */
    const blocks: Block[] = [
      { t0: 0, dur: 380, name: "model → tool_calls", round: 0 },
      { t0: 380, dur: 720, name: "book_flight(BJ→NRT)", round: 0 },
      {
        t0: 380,
        dur: 240,
        name: "book_hotel(city=?, date=?)",
        round: 0,
        errored: true,
      },
      { t0: 1100, dur: 400, name: "model → tool_calls retry", round: 1 },
      {
        t0: 1500,
        dur: 700,
        name: "book_hotel(city=NRT, date=...)",
        round: 1,
      },
      { t0: 2200, dur: 380, name: "model → final text", round: 1 },
    ];
    return {
      blocks,
      rounds: 2,
      latency: 2580,
      ok: false,
      scale: 2580,
      verdict: {
        title: "并行把依赖打懵了",
        detail:
          "模型在第一轮里同时发 book_flight 和 book_hotel，可此时 hotel 还没拿到机场代码 → 拿空参数硬跑 → 报错。多 1 轮重试，反而比串行慢。",
      },
    };
  }
  /* dependent + serial */
  const blocks: Block[] = [
    { t0: 0, dur: 380, name: "model → tool_calls[flight]", round: 0 },
    { t0: 380, dur: 720, name: "book_flight(BJ→NRT)", round: 0 },
    { t0: 1100, dur: 360, name: "model → tool_calls[hotel]", round: 1 },
    { t0: 1460, dur: 700, name: "book_hotel(city=NRT, date=...)", round: 1 },
    { t0: 2160, dur: 380, name: "model → final text", round: 1 },
  ];
  return {
    blocks,
    rounds: 2,
    latency: 2540,
    ok: true,
    scale: 2580, // 让两种 dependent 视觉对齐
    verdict: {
      title: "对依赖任务来说就该这样",
      detail:
        "parallel=false 强制模型只发一个 call → 拿到机场代码再发酒店 → 2 轮但全过。事务性 / 链式操作的安全默认。",
    },
  };
}

/* ─── Timeline SVG ─── */

const Timeline: React.FC<{ state: State }> = ({ state }) => {
  /* viewBox 600 × 180 · 起点 60，宽 510 用于条 */
  const x0 = 60;
  const width = 510;
  const xScale = (ms: number) => x0 + (ms / state.scale) * width;
  /* 每个 block 一行（不允许两 block 同行除非同 t0） */
  const lanes: { y: number; t1: number }[] = [];
  const place = (b: Block) => {
    /* 找第一个能容纳的 lane */
    for (let i = 0; i < lanes.length; i++) {
      if (b.t0 >= lanes[i].t1) {
        lanes[i].t1 = b.t0 + b.dur;
        return i;
      }
    }
    lanes.push({ y: lanes.length, t1: b.t0 + b.dur });
    return lanes.length - 1;
  };
  const positioned = state.blocks.map((b) => ({ ...b, lane: place(b) }));
  const laneCount = lanes.length;
  const laneH = 22;
  const topPad = 22;
  const svgH = topPad + laneCount * laneH + 36;

  /* X 轴刻度 */
  const ticks: number[] = [];
  const tickStep = state.scale <= 1500 ? 250 : 500;
  for (let t = 0; t <= state.scale; t += tickStep) ticks.push(t);

  return (
    <svg
      viewBox={`0 0 600 ${svgH}`}
      className="w-full h-auto animate-enter-fade"
    >
      {/* x axis */}
      <line
        x1={x0}
        y1={topPad + laneCount * laneH + 4}
        x2={x0 + width}
        y2={topPad + laneCount * laneH + 4}
        stroke="#241C15"
        strokeWidth="1.5"
      />
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={xScale(t)}
            y1={topPad + laneCount * laneH + 4}
            x2={xScale(t)}
            y2={topPad + laneCount * laneH + 9}
            stroke="#241C15"
            strokeWidth="1.2"
          />
          <text
            x={xScale(t)}
            y={topPad + laneCount * laneH + 22}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            fill="#88837C"
          >
            {t}
          </text>
        </g>
      ))}

      {/* 标签：左侧 lane label */}
      <text
        x="6"
        y="12"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#88837C"
      >
        round-trip 时间线
      </text>

      {/* blocks */}
      {positioned.map((b, i) => {
        const x = xScale(b.t0);
        const w = (b.dur / state.scale) * width;
        const y = topPad + b.lane * laneH;
        const isModel = b.name.startsWith("model");
        const fill = b.errored
          ? "#FBEFE3"
          : isModel
            ? "#241C15"
            : b.round === 0
              ? "#F4D35E"
              : "#1B4B5A";
        const textFill = b.errored
          ? "#E07A5F"
          : isModel
            ? "#FBEFE3"
            : b.round === 0
              ? "#241C15"
              : "#FBEFE3";
        const stroke = b.errored ? "#E07A5F" : "#241C15";
        const dash = b.errored ? "3 3" : undefined;
        return (
          <g key={i} style={{ animationDelay: `${i * 80}ms` }} className="animate-enter-fade">
            <rect
              x={x}
              y={y}
              width={Math.max(w, 4)}
              height={laneH - 6}
              rx="3"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.6"
              strokeDasharray={dash}
            />
            <text
              x={x + 6}
              y={y + 12}
              fontFamily="Geist Mono, monospace"
              fontSize="9"
              fill={textFill}
              fontWeight="600"
            >
              {b.name.length > 32 ? b.name.slice(0, 31) + "…" : b.name}
            </text>
            {b.errored && (
              <text
                x={x + Math.max(w, 4) - 4}
                y={y + 12}
                textAnchor="end"
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="#E07A5F"
                fontWeight="700"
              >
                ERR
              </text>
            )}
          </g>
        );
      })}

      {/* 总延迟标尺 */}
      <g>
        <line
          x1={xScale(state.latency)}
          y1={topPad - 4}
          x2={xScale(state.latency)}
          y2={topPad + laneCount * laneH + 4}
          stroke="#E07A5F"
          strokeWidth="1.4"
          strokeDasharray="3 3"
        />
        <rect
          x={xScale(state.latency) - 32}
          y={topPad + laneCount * laneH + 28}
          width={64}
          height={14}
          rx={3}
          fill="#E07A5F"
        />
        <text
          x={xScale(state.latency)}
          y={topPad + laneCount * laneH + 38}
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          fill="#FBEFE3"
        >
          {state.latency} ms
        </text>
      </g>
    </svg>
  );
};

/* ─── 子组件 ─── */

const ScenarioBtn: React.FC<{
  on: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}> = ({ on, onClick, title, sub }) => (
  <button
    onClick={onClick}
    className={[
      "px-3 py-2.5 rounded-lg border-2 border-ink text-left transition-all duration-200 ease-spring",
      on
        ? "bg-ink text-cream shadow-stamp"
        : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
    ].join(" ")}
  >
    <div className="font-display text-[14px] font-bold leading-tight">{title}</div>
    <div
      className={[
        "font-mono text-[10px] mt-0.5",
        on ? "text-butter" : "text-ink/50",
      ].join(" ")}
    >
      {sub}
    </div>
  </button>
);

const ParallelBtn: React.FC<{
  on: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  IconOn: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}> = ({ on, onClick, title, sub, IconOn }) => (
  <button
    onClick={onClick}
    className={[
      "px-3 py-2.5 rounded-lg border-2 border-ink text-left transition-all duration-200 ease-spring flex items-center gap-2",
      on
        ? "bg-ink text-cream shadow-stamp"
        : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
    ].join(" ")}
  >
    <IconOn
      className={["w-5 h-5", on ? "text-butter" : "text-ink/50"].join(" ")}
      strokeWidth={2.2}
    />
    <div>
      <div className="font-mono text-[13px] font-bold leading-tight">
        {title}
      </div>
      <div
        className={[
          "font-mono text-[10px] mt-0.5",
          on ? "text-butter/85" : "text-ink/50",
        ].join(" ")}
      >
        {sub}
      </div>
    </div>
  </button>
);

const Metric: React.FC<{
  label: string;
  value: string;
  unit?: string;
  tone?: "teal" | "coral";
}> = ({ label, value, unit, tone }) => {
  const toneColor =
    tone === "teal" ? "text-teal" : tone === "coral" ? "text-coral" : "text-ink";
  return (
    <div className="px-3.5 py-3 bg-white border-2 border-ink rounded-xl">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-display text-[24px] font-bold tabular-nums ${toneColor}`}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[11px] text-ink/45">{unit}</span>
        )}
      </div>
    </div>
  );
};

const RuleCard: React.FC<{
  title: string;
  items: string[];
  tone: "teal" | "coral";
}> = ({ title, items, tone }) => {
  const accent = tone === "teal" ? "bg-teal" : "bg-coral";
  const Icon = tone === "teal" ? Check : Zap;
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className={`w-6 h-6 ${accent} border-2 border-ink rounded-md flex items-center justify-center`}
        >
          <Icon className="w-3.5 h-3.5 text-cream" strokeWidth={3} />
        </div>
        <span className="font-display text-[14.5px] font-bold text-ink leading-tight">
          {title}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[13.5px] text-ink/75 leading-snug"
          >
            <span className="font-mono text-[10px] text-ink/35 mt-1 shrink-0">
              ·
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionParallel;
