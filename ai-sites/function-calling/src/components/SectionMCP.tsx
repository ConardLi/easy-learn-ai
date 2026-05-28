/**
 * Section 06 · MCP · 4 种典型失败
 *
 * 反直觉钩子：原生 function calling 是 vendor 锁死的协议。
 * 写一份 tools 数组，只能给一家用。MCP 把工具抽出来变成像 USB-C 的中间层。
 *
 * 主交互（L2 + L2）：
 *   ① before/after toggle · 看 SVG 架构图怎么变
 *   ② 4 种失败模式 chip · 点开看复现条件 + 修法
 *
 * 区别于 quantization Section 06（slider + 三精度内存条 + 跑分表 · L4）：
 *   ─ 这里是 before/after toggle + chip，不是 slider
 *   ─ 主图是 SVG 架构图（左旧右新），不是数据可视化
 */
import React, { useState } from "react";
import { AlertCircle, Plug, Sparkles } from "lucide-react";

type Mode = "raw" | "mcp";

const SectionMCP: React.FC = () => {
  const [mode, setMode] = useState<Mode>("raw");
  const [failureId, setFailureId] = useState("hallucinate");

  const failure = FAILURES.find((f) => f.id === failureId)!;

  return (
    <section className="relative bg-ink text-cream px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      {/* 浮动装饰 */}
      <div
        aria-hidden
        className="absolute top-16 right-[8%] hidden lg:block animate-float-y"
      >
        <div className="w-12 h-12 bg-butter border-2 border-cream rounded-2xl shadow-stamp -rotate-6" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-28 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-10 h-10 bg-coral border-2 border-cream rounded-full shadow-stamp" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="section-anchor">
          <span className="section-anchor-num text-butter">06</span>
          <span className="section-anchor-label text-cream/55">
            mcp · failure modes · what's next
          </span>
        </div>

        <h2 className="font-display text-display-lg leading-tight mb-6 max-w-3xl">
          下一步：把工具从{" "}
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10 text-ink">「参数」</span>
          </span>
          <br />
          变成
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-coral/70 -z-0 rotate-1"
              aria-hidden
            />
            <span className="relative z-10">「插件」</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-cream/70 text-[16px] mb-3 leading-relaxed">
          每个家有自己的 tools 字段名、id 格式、role 命名。
          <strong className="text-cream">同一个 PostgreSQL 工具</strong>，
          写一遍只能给 OpenAI 用，给 Claude 还得再写一遍。
        </p>
        <p className="max-w-2xl text-cream/70 text-[16px] mb-10 leading-relaxed">
          2024/11 Anthropic 提出 <strong className="text-butter">MCP</strong>{" "}
          —— Model Context Protocol。 把工具从「每家模型里写一份」抽成「一个 MCP server，谁都能连」。
          2026 已经是事实标准，OpenAI 也接入了。
        </p>

        {/* before/after toggle */}
        <div className="bg-cream text-ink rounded-3xl border-2 border-cream shadow-stamp-xl overflow-hidden mb-10">
          <div className="flex border-b-2 border-ink">
            <ModeBtn
              on={mode === "raw"}
              onClick={() => setMode("raw")}
              title="原生 function calling"
              sub="2023–2024 · vendor 各写各的"
            />
            <ModeBtn
              on={mode === "mcp"}
              onClick={() => setMode("mcp")}
              title="MCP"
              sub="2026 · 一个 server · 任意 client"
            />
          </div>

          <div className="p-5 lg:p-7">
            <ArchitectureSVG key={mode} mode={mode} />

            <div
              key={`txt-${mode}`}
              className="mt-5 grid sm:grid-cols-3 gap-3 animate-enter-fade"
            >
              {(mode === "raw" ? RAW_FACTS : MCP_FACTS).map((f, i) => (
                <Fact key={i} {...f} />
              ))}
            </div>
          </div>
        </div>

        {/* 失败模式 chip + 详情 */}
        <h3 className="font-display text-[28px] lg:text-[32px] leading-tight mb-3 max-w-2xl">
          上线前必背的 <span className="text-butter">4 种死法</span>
        </h3>
        <p className="text-cream/65 text-[15px] mb-5 max-w-2xl">
          不管 raw function calling 还是 MCP，failure mode 几乎一致。点 chip 看症状 +
          修法。
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {FAILURES.map((f) => {
            const on = f.id === failureId;
            return (
              <button
                key={f.id}
                onClick={() => setFailureId(f.id)}
                className={[
                  "px-3 py-1.5 rounded-full border-2 font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                  on
                    ? "bg-cream text-ink border-cream shadow-[3px_3px_0_0_#F4D35E]"
                    : "bg-transparent text-cream border-cream/40 hover:border-cream hover:bg-cream/10",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div
          key={failureId}
          className="bg-cream text-ink rounded-3xl border-2 border-cream shadow-stamp-xl p-6 lg:p-7 animate-enter-fade"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-coral border-2 border-ink rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-ink" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-[22px] font-bold text-ink leading-tight">
                {failure.title}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mt-0.5">
                {failure.tag}
              </div>
            </div>
          </div>

          <p className="text-[15px] text-ink/80 leading-relaxed mb-4">
            {failure.story}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <FailureCard
              label="symptom · 怎么发现"
              text={failure.symptom}
              tone="coral"
            />
            <FailureCard
              label="fix · 怎么修"
              text={failure.fix}
              tone="teal"
            />
          </div>

          <div className="px-3 py-2 bg-ink text-cream rounded-lg">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
              code · 真实片段
            </div>
            <pre className="font-mono text-[12px] text-cream leading-relaxed whitespace-pre-wrap">
              {failure.code}
            </pre>
          </div>
        </div>

        {/* 收尾 */}
        <div className="mt-10 max-w-2xl">
          <p className="text-cream/75 text-[16px] leading-relaxed mb-3">
            2026 / Q2 状态：MCP 已被 Anthropic、OpenAI、Cursor、VS Code、Claude
            Desktop 全部支持，治理移交 Linux Foundation 旗下 Agentic AI Foundation。
            Universal Tool Calling Protocol（UTCP）作为「无中间层」的直连替代品也在崛起。
          </p>
          <p className="text-cream/75 text-[16px] leading-relaxed mb-8">
            但本质没变 ——
            <span className="text-butter font-display text-[18px] font-bold">
              模型还是只吐 JSON，真正执行 IO 的依然是你的代码。
            </span>{" "}
            协议怎么进化都不会改变这一点。
          </p>

          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream/40">
            — handbook · end —
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 架构 SVG ─── */

const ArchitectureSVG: React.FC<{ mode: Mode }> = ({ mode }) => {
  if (mode === "raw") {
    return (
      <svg viewBox="0 0 600 240" className="w-full h-auto animate-enter-fade">
        {/* App 节点 */}
        <BoxNode x={40} y={90} w={100} h={60} label="你的 App" tone="butter" />
        {/* 3 个 LLM 节点 */}
        <BoxNode x={250} y={30} w={120} h={50} label="OpenAI" sub="tools: [...]" tone="coral" />
        <BoxNode x={250} y={95} w={120} h={50} label="Anthropic" sub="tools: [...]" tone="coral" />
        <BoxNode x={250} y={160} w={120} h={50} label="Gemini" sub="tools: [...]" tone="coral" />
        {/* 重复的 tool 接入 */}
        <BoxNode x={460} y={30} w={110} h={50} label="get_weather" sub="duplicated ×3" tone="teal" />
        <BoxNode x={460} y={95} w={110} h={50} label="get_weather" sub="duplicated ×3" tone="teal" />
        <BoxNode x={460} y={160} w={110} h={50} label="get_weather" sub="duplicated ×3" tone="teal" />
        {/* 箭头 */}
        <Arrow x1={140} y1={120} x2={250} y2={55} />
        <Arrow x1={140} y1={120} x2={250} y2={120} />
        <Arrow x1={140} y1={120} x2={250} y2={185} />
        <Arrow x1={370} y1={55} x2={460} y2={55} />
        <Arrow x1={370} y1={120} x2={460} y2={120} />
        <Arrow x1={370} y1={185} x2={460} y2={185} />
        {/* 注释 */}
        <text
          x="300"
          y="225"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fill="#88837C"
          fontWeight="600"
        >
          每个 vendor · 自己写一份 tools schema
        </text>
      </svg>
    );
  }
  /* mcp */
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto animate-enter-fade">
      {/* 3 个 client */}
      <BoxNode x={40} y={30} w={100} h={48} label="Claude" sub="MCP client" tone="butter" />
      <BoxNode x={40} y={95} w={100} h={48} label="Cursor" sub="MCP client" tone="butter" />
      <BoxNode x={40} y={160} w={100} h={48} label="ChatGPT" sub="MCP client" tone="butter" />
      {/* MCP server 中间层 */}
      <BoxNode
        x={235}
        y={80}
        w={130}
        h={80}
        label="MCP Server"
        sub="weather-tools"
        tone="pop"
        emphasize
      />
      {/* 一个工具集 */}
      <BoxNode x={455} y={30} w={120} h={48} label="get_weather" sub="written once" tone="teal" />
      <BoxNode x={455} y={95} w={120} h={48} label="get_forecast" sub="written once" tone="teal" />
      <BoxNode x={455} y={160} w={120} h={48} label="set_alert" sub="written once" tone="teal" />
      {/* 箭头：3 个 client → 1 个 server */}
      <Arrow x1={140} y1={54} x2={235} y2={120} curve />
      <Arrow x1={140} y1={119} x2={235} y2={120} />
      <Arrow x1={140} y1={184} x2={235} y2={120} curve />
      {/* server → 3 tool */}
      <Arrow x1={365} y1={120} x2={455} y2={54} curve />
      <Arrow x1={365} y1={120} x2={455} y2={119} />
      <Arrow x1={365} y1={120} x2={455} y2={184} curve />
      <text
        x="300"
        y="225"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="10"
        fill="#88837C"
        fontWeight="600"
      >
        一个 server · 任何 MCP client 都能连
      </text>
    </svg>
  );
};

const BoxNode: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone: "butter" | "coral" | "teal" | "pop";
  emphasize?: boolean;
}> = ({ x, y, w, h, label, sub, tone, emphasize }) => {
  const fill = {
    butter: "#F4D35E",
    coral: "#E07A5F",
    teal: "#1B4B5A",
    pop: "#FF4D74",
  }[tone];
  const textFill = tone === "teal" || tone === "pop" ? "#FBEFE3" : "#241C15";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={emphasize ? 14 : 10}
        fill={fill}
        stroke="#241C15"
        strokeWidth={emphasize ? "2.4" : "1.8"}
      />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 2 : h / 2 + 4)}
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill={textFill}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fill={textFill}
          opacity="0.7"
        >
          {sub}
        </text>
      )}
    </g>
  );
};

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  curve?: boolean;
}> = ({ x1, y1, x2, y2, curve }) => {
  const path = curve
    ? `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2} ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  return (
    <g>
      <path d={path} fill="none" stroke="#241C15" strokeWidth="1.6" />
      <polygon
        points="-6,-3 0,0 -6,3"
        fill="#241C15"
        transform={`translate(${x2},${y2}) rotate(${angle})`}
      />
    </g>
  );
};

/* ─── before/after 事实条 ─── */

const RAW_FACTS = [
  { kicker: "tool 重复", title: "N 家 × N 工具" , detail: "切 vendor → 重写"},
  { kicker: "迁移", title: "成本高", detail: "schema 字段名都不一样" },
  { kicker: "治理", title: "无标准", detail: "没法做集中权限审计" },
];

const MCP_FACTS = [
  { kicker: "tool 单写", title: "1 份 schema", detail: "任何 MCP client 都能用" },
  { kicker: "迁移", title: "近 0 成本", detail: "换 LLM 不动 server 代码" },
  { kicker: "治理", title: "Linux Foundation", detail: "Agentic AI Foundation 标准化" },
];

const Fact: React.FC<{ kicker: string; title: string; detail: string }> = ({
  kicker,
  title,
  detail,
}) => (
  <div className="px-3 py-2.5 bg-white border-2 border-ink rounded-xl">
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
      {kicker}
    </div>
    <div className="font-display text-[15px] font-bold text-ink leading-tight">
      {title}
    </div>
    <div className="text-[12.5px] text-ink/60 mt-0.5">{detail}</div>
  </div>
);

/* ─── 模式按钮 ─── */

const ModeBtn: React.FC<{
  on: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}> = ({ on, onClick, title, sub }) => (
  <button
    onClick={onClick}
    className={[
      "flex-1 px-4 py-3 text-left transition-colors duration-200 border-r-2 border-ink last:border-r-0 flex items-start gap-3",
      on ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-butter/30",
    ].join(" ")}
  >
    <div
      className={[
        "w-9 h-9 rounded-lg border-2 border-ink flex items-center justify-center shrink-0",
        on ? "bg-butter" : "bg-white",
      ].join(" ")}
    >
      {on ? (
        <Sparkles className="w-4 h-4 text-ink" strokeWidth={2.4} />
      ) : (
        <Plug className="w-4 h-4 text-ink" strokeWidth={2.4} />
      )}
    </div>
    <div>
      <div className="font-display text-[15px] font-bold leading-tight">
        {title}
      </div>
      <div
        className={[
          "font-mono text-[10.5px] mt-0.5",
          on ? "text-butter" : "text-ink/50",
        ].join(" ")}
      >
        {sub}
      </div>
    </div>
  </button>
);

/* ─── Failure 数据 ─── */

type Failure = {
  id: string;
  label: string;
  tag: string;
  title: string;
  story: string;
  symptom: string;
  fix: string;
  code: string;
};

const FAILURES: Failure[] = [
  {
    id: "hallucinate",
    label: "参数幻觉",
    tag: "argument hallucination",
    title: "模型把「北京」写成 city: \"bj\"",
    story:
      "schema 里 city 是 string，没限定 enum。模型在长上下文里看到过缩写，就给你来个 bj / shanghai_pudong / 上海/Pudong/T1。",
    symptom:
      "tool 端报「unknown city」频率周期性飙；同一用户切问法重试就好；日志里 city 字段千奇百怪。",
    fix: "schema 里写 enum 或 pattern。strict mode 开。description 明确写「中文全名，不接受拼音/缩写」。返回错误时附允许列表，让模型自己改。",
    code: `"city": {
  "type": "string",
  "enum": ["北京", "上海", "广州", "深圳"],
  "description": "城市中文全名"
}`,
  },
  {
    id: "skip",
    label: "拒绝调用",
    tag: "no-tool fallthrough",
    title: "明明该调，模型用嘴回答",
    story:
      "用户问「今天北京几度」。schema 明明有 get_weather。模型偏说「北京春季一般 15–25°C」—— 它在编。",
    symptom:
      "tool_calls 永远是 null；模型自信回答但数据完全靠猜；用户反馈「答非所问」却找不到 tool log。",
    fix: "tool description 里写「仅当询问实时天气时」。 system prompt 强调「不准估算，只准查工具」。 强测时设 tool_choice: required。",
    code: `// 强制本轮必须调工具
{ tools, tool_choice: "required" }
// 或指定具体工具
{ tools, tool_choice: { type: "function",
                         name: "get_weather" } }`,
  },
  {
    id: "loop",
    label: "死循环",
    tag: "tool loop",
    title: "模型把同一个 call 发了 14 次",
    story:
      "tool 返回 {error: \"timeout\"}，模型没看懂错误，原地重发；或者每次都试稍微不同的参数。10 轮后还没出去。",
    symptom:
      "messages 数组 > 30 条；同一个 tool_call name 反复出现；账单暴涨 token 数。",
    fix: "客户端硬限循环次数（5–10）。 tool 错误返回结构化 {error, suggestion}，让模型知道怎么改。检测「连续 3 次相同 call」直接拦。",
    code: `let i = 0;
while (response.stop_reason === "tool_use") {
  if (++i > MAX_TURNS) {
    throw new Error("tool loop");
  }
  response = await stepOnce(response);
}`,
  },
  {
    id: "drift",
    label: "schema 漂移",
    tag: "schema drift",
    title: "你改了函数，模型没改",
    story:
      "上线后 API 团队把 city 参数改成 location 对象 {city, district}。 schema 还是旧的，但代码已经按新版执行 → 模型按旧 schema 给 city: \"北京\"，宿主跑老代码报错。",
    symptom:
      "新部署后 24 小时内某工具调用错误率突然飙升；日志里参数字段名 mismatch。",
    fix: "schema 当一等公民版本化。 函数签名变了，tools 数组里这条必须同步。 CI 加 schema diff 检查。MCP 场景更稳：server 一改，所有 client 自动同步。",
    code: `// 把 schema 和 handler 放一起
const getWeather = defineTool({
  name: "get_weather",
  schema: zodSchema,   // 改这里就同步
  handler: async (args) => { ... },
});`,
  },
];

const FailureCard: React.FC<{
  label: string;
  text: string;
  tone: "coral" | "teal";
}> = ({ label, text, tone }) => {
  const border = tone === "coral" ? "border-coral" : "border-teal";
  const tag = tone === "coral" ? "bg-coral text-cream" : "bg-teal text-cream";
  return (
    <div className={`bg-white border-2 ${border} rounded-xl p-3.5`}>
      <span
        className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-[0.18em] font-bold ${tag} mb-1.5`}
      >
        {label}
      </span>
      <p className="text-[13.5px] text-ink/85 leading-relaxed">{text}</p>
    </div>
  );
};

export default SectionMCP;
