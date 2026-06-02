/**
 * Section 02 · 一次完整往返：messages 数组逐条加上去
 *
 * 反直觉钩子：你以为是「模型调用工具」，
 * 实际是 4–8 条 message 在客户端和模型之间来回。
 *
 * 主交互（L3）：单步 trace —— 用户点 next，messages 数组逐条 push。
 * 副交互（L2）：两套场景切换（单次往返 / 链式 3 轮）。
 *
 * 区别于 quantization Section 02（数轴 + slider）和 agent Section ReActLoop（
 * 三角循环图 + scenario）：
 *   ─ 这里 trace 的载体是「真实 messages JSON 数组」，不是抽象认知节点
 *   ─ 不画 loop，只展示线性 message 流
 */
import React, { useState, useMemo } from "react";
import { SkipBack, ChevronLeft, ChevronRight, User, Bot, Wrench, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";

type Role = "user" | "assistant" | "tool";

type ToolCall = {
  id: string;
  name: string;
  /** stringified */
  args: string;
};

type Msg =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; name: string; content: string };

type Step = {
  msg: Msg;
  /** 这一步发生了什么 · 给用户看的口语解释 */
  narration: string;
  /** 是谁在做这一步 */
  actor: "user" | "model" | "host";
};

type Scenario = {
  id: string;
  label: string;
  sub: string;
  question: string;
  steps: Step[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "weather",
    label: "查天气 · 单次往返",
    sub: "4 条消息",
    question: "今天北京要带伞吗？",
    steps: [
      {
        actor: "user",
        msg: { role: "user", content: "今天北京要带伞吗？" },
        narration:
          "用户开口。这是 messages 数组里的第一条，role=user。",
      },
      {
        actor: "model",
        msg: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_w1",
              name: "get_weather",
              args: '{"city":"北京","date":"today"}',
            },
          ],
        },
        narration:
          "模型「输出」结束。content 是 null，因为它没说话 —— 它在 tool_calls 数组里写了一条调用单。",
      },
      {
        actor: "host",
        msg: {
          role: "tool",
          tool_call_id: "call_w1",
          name: "get_weather",
          content: '{"temp":"18-24°C","precipitation":0.6,"start":"11:00"}',
        },
        narration:
          "你的代码读到 tool_calls，去跑 get_weather 函数，把返回值塞进一条新 message。role=tool · tool_call_id 必须匹配上一步那个 id。",
      },
      {
        actor: "model",
        msg: {
          role: "assistant",
          content:
            "今天 11 点起有 60% 几率下雨，温度 18–24°C。建议带伞，穿件薄外套就行。",
        },
        narration:
          "把更新后的 messages 整个再丢回模型。这次它有数据了 —— 直接生成 final text。tool_calls 这次缺席 = 循环结束。",
      },
    ],
  },
  {
    id: "chain",
    label: "请假 · 链式 3 轮",
    sub: "8 条消息",
    question: "帮我查下次会议时间。如果在我外出期间，就帮我请假。",
    steps: [
      {
        actor: "user",
        msg: {
          role: "user",
          content:
            "帮我查下次会议时间。如果在我外出期间，就帮我请假。",
        },
        narration: "复合任务：先查、再判断、可能再写。",
      },
      {
        actor: "model",
        msg: {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_m1", name: "get_next_meeting", args: "{}" },
          ],
        },
        narration:
          "模型先要会议时间 —— 没有它就没法判断。一次只调一个，因为后续动作依赖这次结果。",
      },
      {
        actor: "host",
        msg: {
          role: "tool",
          tool_call_id: "call_m1",
          name: "get_next_meeting",
          content:
            '{"time":"2026-06-02 14:00","topic":"Q3 复盘","duration":90}',
        },
        narration:
          "你的代码跑日历 API，结果 push 回 messages。注意此时 messages 已经 3 条。",
      },
      {
        actor: "model",
        msg: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_o1",
              name: "check_oof",
              args: '{"date":"2026-06-02"}',
            },
          ],
        },
        narration:
          "现在拿到了 6/2，模型再问：那天是不是请了假？依然 content=null 因为还没到回答用户的时候。",
      },
      {
        actor: "host",
        msg: {
          role: "tool",
          tool_call_id: "call_o1",
          name: "check_oof",
          content: '{"is_oof":true,"location":"京都"}',
        },
        narration: "确认了 —— 那天人在京都出差。",
      },
      {
        actor: "model",
        msg: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_l1",
              name: "submit_leave",
              args: '{"meeting_id":"m_q3","reason":"OOF"}',
            },
          ],
        },
        narration:
          "条件成立 → 触发请假。三轮 tool call 都是模型自己决定要不要发的。",
      },
      {
        actor: "host",
        msg: {
          role: "tool",
          tool_call_id: "call_l1",
          name: "submit_leave",
          content: '{"status":"ok","confirmation":"leave_88"}',
        },
        narration: "请假成功。",
      },
      {
        actor: "model",
        msg: {
          role: "assistant",
          content:
            "你 6/2 那天本来要参加 14:00 的 Q3 复盘会，但人在京都出差，已经帮你请假（编号 leave_88）。",
        },
        narration:
          "到第 8 条消息，模型才回话。这就是多步任务的真实长相 —— 没有魔法，就是 messages 数组长了 8 条。（一次次调用接起来反复跑，就是 Agent 的执行循环，《Agent Loop》那一站专门讲。）",
      },
    ],
  },
];

const SectionRoundTrip: React.FC = () => {
  const [scenarioId, setScenarioId] = useState("weather");
  const [cursor, setCursor] = useState(0);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const total = scenario.steps.length;
  const visibleSteps = scenario.steps.slice(0, cursor + 1);
  const currentStep = scenario.steps[cursor];

  const isLast = cursor === total - 1;
  const isFirst = cursor === 0;

  const stats = useMemo(() => {
    const tool_count = visibleSteps.filter(
      (s) =>
        s.msg.role === "assistant" &&
        (s.msg as { tool_calls?: ToolCall[] }).tool_calls,
    ).length;
    const result_count = visibleSteps.filter((s) => s.msg.role === "tool").length;
    return { tool_count, result_count };
  }, [visibleSteps]);

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">the message round-trip</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一次完整往返 ——{" "}
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">messages 数组</span>
          </span>
          <br />
          一条一条
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1"
              aria-hidden
            />
            <span className="relative z-10">堆出来</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          没有「调用」这个动词。<strong className="text-ink">你的代码</strong>只做一件事：把当前 messages 数组发给模型，
          看模型这次吐 tool_calls 还是 final text。点 next 看一条 message 进数组。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：控制面板 + 当前步说明 */}
          <div className="lg:col-span-5 space-y-4">
            {/* 场景切换 */}
            <div className="bg-cream border-2 border-ink rounded-2xl p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                场景 · scenario
              </div>
              <div className="space-y-2">
                {SCENARIOS.map((s) => {
                  const on = s.id === scenarioId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setScenarioId(s.id);
                        setCursor(0);
                      }}
                      className={[
                        "w-full text-left px-3 py-2.5 rounded-lg border-2 border-ink transition-all duration-200",
                        on
                          ? "bg-ink text-cream shadow-stamp"
                          : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-[14px] font-bold">
                          {s.label}
                        </span>
                        <span
                          className={[
                            "font-mono text-[10px]",
                            on ? "text-butter" : "text-ink/45",
                          ].join(" ")}
                        >
                          {s.sub}
                        </span>
                      </div>
                      <div
                        className={[
                          "mt-0.5 text-[12px] line-clamp-1",
                          on ? "text-cream/65" : "text-ink/55",
                        ].join(" ")}
                      >
                        「{s.question}」
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 单步控制 */}
            <div className="bg-cream border-2 border-ink rounded-2xl p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  step · use ← → keys mentally
                </span>
                <span className="font-display text-[20px] font-bold text-ink tabular-nums">
                  {cursor + 1}
                  <span className="font-mono text-[11px] text-ink/45">/{total}</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  onClick={() => setCursor(0)}
                  disabled={isFirst}
                  className="px-2 py-2 rounded-lg border-2 border-ink bg-white font-mono text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream"
                >
                  <SkipBack className="w-3 h-3" strokeWidth={2.5} />
                  reset
                </button>
                <button
                  onClick={() => setCursor((c) => Math.max(0, c - 1))}
                  disabled={isFirst}
                  className="px-2 py-2 rounded-lg border-2 border-ink bg-white font-mono text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream"
                >
                  <ChevronLeft className="w-3 h-3" strokeWidth={2.5} />
                  prev
                </button>
                <button
                  onClick={() => setCursor((c) => Math.min(total - 1, c + 1))}
                  disabled={isLast}
                  className="px-2 py-2 rounded-lg border-2 border-ink bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-1 shadow-stamp disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5 hover:shadow-stamp-hover transition-all duration-200 ease-spring"
                >
                  next
                  <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>

              {/* 进度条 */}
              <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral transition-all duration-400 ease-spring"
                  style={{ width: `${((cursor + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* narration · 当前步发生了什么 */}
            <div className="bg-ink text-cream rounded-2xl p-4 lg:p-5 border-2 border-ink shadow-stamp">
              <div className="flex items-center gap-2 mb-2">
                <ActorBadge actor={currentStep.actor} dark />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter font-bold">
                  step {cursor + 1} · {actorLabel(currentStep.actor)}
                </span>
              </div>
              <p
                key={`${scenarioId}-${cursor}`}
                className="text-[15px] text-cream/90 leading-relaxed animate-enter-fade"
              >
                {currentStep.narration}
              </p>

              <div className="mt-4 pt-4 border-t border-cream/15 grid grid-cols-2 gap-2">
                <Stat label="tool_calls" value={stats.tool_count} />
                <Stat label="tool result" value={stats.result_count} />
              </div>
            </div>
          </div>

          {/* 右：messages 数组堆叠 */}
          <div className="lg:col-span-7">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-4 lg:p-5 min-h-[460px]">
              <div className="flex items-baseline justify-between mb-3 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  messages[]
                </span>
                <span className="font-mono text-[10px] text-ink/40">
                  length = {visibleSteps.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {visibleSteps.map((step, i) => (
                  <MessageCard
                    key={`${scenarioId}-${i}`}
                    msg={step.msg}
                    isLatest={i === visibleSteps.length - 1}
                    index={i}
                  />
                ))}
                {!isLast && (
                  <div className="px-3 py-3 bg-white border-2 border-dashed border-ink/30 rounded-xl flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-ink/40 animate-pulse-dot" />
                    <span className="font-mono text-[11px] text-ink/45">
                      下一条 · 点 next 看会推入什么
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-3 font-mono text-[10.5px] text-ink/45 px-1">
              JSON 字段已简化展示。真实 OpenAI tool_calls.function.arguments 是
              stringified；Anthropic input 是 object。
            </p>
          </div>
        </div>

        {/* 互链聚合卡 → Agent 族（Agent Loop / LLM）*/}
        <div className="mt-10 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp max-w-[640px] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
              <span className="font-bold text-ink">这串往返再接着跑下去，会变成什么？</span>
              <span className="text-ink/65">
                {" "}
                一次次工具调用接起来反复跑，就是 Agent 的执行循环；每一步决定调哪个工具、吐出 tool_calls 的，是背后那个模型自己。
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pl-10">
            <a
              href="../agent-loop/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              反复跑起来 · Agent Loop <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
            <a
              href="../llm/index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              做决定的脑子 · LLM <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 子组件 ─── */

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="px-2.5 py-2 bg-cream/8 border border-cream/15 rounded-lg">
    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/55 mb-0.5">
      {label}
    </div>
    <span className="font-display text-[20px] font-bold text-butter tabular-nums">
      {value}
    </span>
  </div>
);

function actorLabel(actor: "user" | "model" | "host"): string {
  return { user: "用户", model: "模型", host: "你的代码" }[actor];
}

const ActorBadge: React.FC<{
  actor: "user" | "model" | "host";
  dark?: boolean;
}> = ({ actor, dark }) => {
  const map = {
    user: { Icon: User, color: "bg-coral" },
    model: { Icon: Sparkles, color: "bg-butter" },
    host: { Icon: Wrench, color: "bg-teal" },
  } as const;
  const { Icon, color } = map[actor];
  return (
    <div
      className={[
        "w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0",
        color,
        dark ? "border-cream" : "border-ink",
      ].join(" ")}
    >
      <Icon
        className={["w-3 h-3", actor === "host" ? "text-cream" : "text-ink"].join(" ")}
        strokeWidth={2.5}
      />
    </div>
  );
};

const ROLE_STYLE: Record<
  Role,
  { tag: string; bg: string; chip: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }
> = {
  user: { tag: "user", bg: "bg-white", chip: "bg-coral text-ink", Icon: User },
  assistant: {
    tag: "assistant",
    bg: "bg-white",
    chip: "bg-butter text-ink",
    Icon: Bot,
  },
  tool: { tag: "tool", bg: "bg-white", chip: "bg-teal text-cream", Icon: Wrench },
};

const MessageCard: React.FC<{ msg: Msg; isLatest: boolean; index: number }> = ({
  msg,
  isLatest,
  index,
}) => {
  const style = ROLE_STYLE[msg.role];
  const { Icon } = style;
  return (
    <div
      className={[
        "border-2 border-ink rounded-xl overflow-hidden transition-all duration-300",
        style.bg,
        isLatest
          ? "shadow-stamp-lg ring-4 ring-butter animate-enter-up"
          : "shadow-stamp",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-ink/15 bg-ink/5">
        <span className="font-mono text-[10px] text-ink/40 tabular-nums w-4">
          {index}
        </span>
        <div
          className={[
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border-2 border-ink font-mono text-[10.5px] uppercase tracking-[0.15em] font-bold",
            style.chip,
          ].join(" ")}
        >
          <Icon className="w-3 h-3" strokeWidth={2.5} />
          {style.tag}
        </div>
        {msg.role === "assistant" && msg.tool_calls && (
          <span className="font-mono text-[10px] text-coral font-bold">
            · with {msg.tool_calls.length} tool_call
            {msg.tool_calls.length > 1 ? "s" : ""}
          </span>
        )}
        {msg.role === "tool" && (
          <span className="font-mono text-[10px] text-teal font-bold">
            · result
          </span>
        )}
      </div>
      <div className="px-3 py-2.5">
        {msg.role === "user" && (
          <p className="text-[14px] text-ink/85 leading-relaxed">{msg.content}</p>
        )}
        {msg.role === "assistant" && !msg.tool_calls && (
          <p className="text-[14px] text-ink/85 leading-relaxed">{msg.content}</p>
        )}
        {msg.role === "assistant" && msg.tool_calls && (
          <div className="space-y-1.5">
            <div className="font-mono text-[10px] text-ink/40">
              content: <span className="text-ink/70">null</span>
            </div>
            <div className="font-mono text-[10px] text-ink/40 mb-1">
              tool_calls:
            </div>
            {msg.tool_calls.map((tc) => (
              <div
                key={tc.id}
                className="px-2.5 py-1.5 bg-ink text-cream rounded font-mono text-[11.5px] leading-snug"
              >
                <span className="text-cream/55">id: </span>
                <span className="text-butter">{tc.id}</span>
                <br />
                <span className="text-cream/55">name: </span>
                <span className="text-butter font-bold">{tc.name}</span>
                <br />
                <span className="text-cream/55">args: </span>
                <span className="text-cream">{tc.args}</span>
              </div>
            ))}
          </div>
        )}
        {msg.role === "tool" && (
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-ink/40">
              tool_call_id:{" "}
              <span className="text-coral font-bold">{msg.tool_call_id}</span>
            </div>
            <div className="font-mono text-[10px] text-ink/40">
              name: <span className="text-ink/70">{msg.name}</span>
            </div>
            <div className="px-2.5 py-1.5 mt-1 bg-ink text-cream rounded font-mono text-[11.5px] leading-snug whitespace-pre-wrap break-all">
              {msg.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionRoundTrip;
