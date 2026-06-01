/**
 * Section 05 · JSON-RPC 来回（垂直时序图）
 *
 * 反模板：
 *   ─ 区别于 fc 站「SVG 水平 gantt timeline」—— 我们是垂直消息时序图，bubble + lifeline
 *   ─ 区别于 section 02 时间事件 trace —— 这里时间是 protocol round-trip 内的 ms 级
 *   ─ 区别于 section 04 chip+accordion —— 这里 chip 切场景 + 单步推进消息
 *
 * 交互（L2 chip + L2 单步 trace）：
 *   ① 顶部 3 个场景 chip：完整握手+tools/call · resources/read · 2026-07-28 stateless
 *   ② next/prev/play 单步显示消息，bubble 一个个落下
 *
 * 数据：MCP spec 2025-11-25 + 2026-07-28 RC blog (modelcontextprotocol.io)
 */
import React, { useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";

type Side = "c" | "s"; // c = client, s = server
type Kind = "req" | "res" | "ntf";

type Msg = {
  from: Side;
  kind: Kind;
  method: string;
  json: string;
  note: string;
};

type Scenario = {
  id: string;
  label: string;
  sub: string;
  msgs: Msg[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "init",
    label: "握手 + tools/call",
    sub: "spec 2025-11-25 主流路径",
    msgs: [
      {
        from: "c",
        kind: "req",
        method: "initialize",
        json: '{"protocolVersion":"2025-11-25","capabilities":{"sampling":{},"roots":{"listChanged":true}},"clientInfo":{"name":"Claude Desktop","version":"0.9"}}',
        note: "Client 报版本号 + 自己支持哪些能力。capabilities 字段里那两个高级特性（sampling、roots）做 demo 不用管。",
      },
      {
        from: "s",
        kind: "res",
        method: "initialize result",
        json: '{"protocolVersion":"2025-11-25","capabilities":{"tools":{"listChanged":true},"resources":{},"prompts":{}},"serverInfo":{"name":"github","version":"1.4.2"}}',
        note: "Server 报自己支持 tools / resources / prompts 三类，listChanged 表示工具集会动态变（按权限筛）",
      },
      {
        from: "c",
        kind: "ntf",
        method: "notifications/initialized",
        json: "{}",
        note: "握手收尾。这一步通知 server 「我准备好了，开始正常请求」。注意：2026-07-28 RC 移除了这步",
      },
      {
        from: "c",
        kind: "req",
        method: "tools/list",
        json: '{"cursor":null}',
        note: "Client 主动拉一遍工具清单。客户端会把它缓存住，挂在模型 system prompt 后",
      },
      {
        from: "s",
        kind: "res",
        method: "tools/list result",
        json: '{"tools":[{"name":"create_issue","description":"Create an issue","inputSchema":{"type":"object","properties":{"repo":{"type":"string"},"title":{"type":"string"}}}}, ...51 个]}',
        note: "Server 一口气返 51 个工具（GitHub 官方 server 实测）。每个工具带 JSON Schema",
      },
      {
        from: "c",
        kind: "req",
        method: "tools/call",
        json: '{"name":"create_issue","arguments":{"repo":"acme/app","title":"build fails"}}',
        note: "模型决定调 create_issue，host 把它装成 JSON-RPC 发过去。arguments 必须满足前面那个 inputSchema",
      },
      {
        from: "s",
        kind: "res",
        method: "tools/call result",
        json: '{"content":[{"type":"text","text":"Created issue #142"}],"structuredContent":{"number":142,"url":"https://github.com/acme/app/issues/142"},"isError":false}',
        note: "返回 content（给人 / 模型看）+ structuredContent（给下游 agent 解析）。2025-03 spec 后两路并存",
      },
    ],
  },
  {
    id: "read",
    label: "resources/read",
    sub: "拿一段只读数据塞 context",
    msgs: [
      {
        from: "c",
        kind: "req",
        method: "resources/list",
        json: '{"cursor":null}',
        note: "Client 拉 resources 清单。返回的每一项是 uri+name+mimeType",
      },
      {
        from: "s",
        kind: "res",
        method: "resources/list result",
        json: '{"resources":[{"uri":"file:///work/notes.md","name":"notes.md","mimeType":"text/markdown"}, ...]}',
        note: "Filesystem server 把暴露的目录里所有文件枚举上来",
      },
      {
        from: "c",
        kind: "req",
        method: "resources/read",
        json: '{"uri":"file:///work/notes.md"}',
        note: "用户在 Claude Desktop 里挂载该 resource。Client 真正读内容",
      },
      {
        from: "s",
        kind: "res",
        method: "resources/read result",
        json: '{"contents":[{"uri":"file:///work/notes.md","mimeType":"text/markdown","text":"# 周会笔记\\n..."}]}',
        note: "返回完整内容。模型看到的就是这段文本（resources 是只读，模型不能改它）",
      },
      {
        from: "s",
        kind: "ntf",
        method: "notifications/resources/updated",
        json: '{"uri":"file:///work/notes.md"}',
        note: "文件如果改了，server 主动 push 通知。Client 决定要不要重读 —— 单向 HTTP 做不到这件事，stdio / SSE 这种双向通道才行",
      },
    ],
  },
  {
    id: "stateless",
    label: "2026-07-28 stateless",
    sub: "新 RC · session 头删除",
    msgs: [
      {
        from: "c",
        kind: "req",
        method: "POST /mcp  (no initialize)",
        json: 'HTTP headers:\n  MCP-Protocol-Version: 2026-07-28\n  Mcp-Method: tools/call\n  Mcp-Name: create_issue\n  Authorization: Bearer …',
        note: "新 spec 没有握手了。每个请求自带 protocol-version + method + name 头。网关能直接路由不读 body",
      },
      {
        from: "c",
        kind: "req",
        method: "tools/call (body)",
        json: '{"name":"create_issue","arguments":{"repo":"acme/app","title":"build fails"},"_meta":{"io.modelcontextprotocol/client":"Claude Desktop 1.2"}}',
        note: "client 信息搬进 _meta。Mcp-Session-Id 头彻底没了 —— server 可以挂在普通 round-robin LB 后",
      },
      {
        from: "s",
        kind: "res",
        method: "200 OK + result",
        json: '{"content":[{"type":"text","text":"Created issue #142"}],"structuredContent":{"number":142},"isError":false}',
        note: "Server 必须无状态。需要保持状态的 server，用「显式 state handle」做 tool 参数传回来（SEP-2567）",
      },
      {
        from: "s",
        kind: "ntf",
        method: "Cache hints (新)",
        json: 'list 响应里：\n  "_meta": { "ttlMs": 60000, "cacheScope": "session" }',
        note: "list 响应附 ttlMs / cacheScope，client 可缓存而不必挂 SSE 长连。这样 server 不用一直挂着长连接，普通网页那种请求也能用",
      },
    ],
  },
];

const KIND_STYLE: Record<Kind, { bg: string; text: string; tag: string }> = {
  req: { bg: "bg-coral", text: "text-white", tag: "REQ →" },
  res: { bg: "bg-teal", text: "text-white", tag: "← RES" },
  ntf: { bg: "bg-butter", text: "text-ink", tag: "↻ NTF" },
};

const SectionWire: React.FC = () => {
  const [sid, setSid] = useState(SCENARIOS[0].id);
  const [cursor, setCursor] = useState(2);
  const scenario = SCENARIOS.find((x) => x.id === sid)!;
  const total = scenario.msgs.length;

  const onSwitch = (id: string) => {
    setSid(id);
    setCursor(0);
  };
  const next = () => setCursor((c) => Math.min(total - 1, c + 1));
  const reset = () => setCursor(0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">wire · 一次调用真实长什么样</span>
        </div>

        <div className="mb-8 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-5 leading-tight">
            一次完整的 MCP 来回，
            <br />
            是
            <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-0 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">7 条 JSON-RPC 消息</span>
            </span>
            。
          </h2>
          <p className="text-[15px] text-ink/75 leading-relaxed">
            两边来回发的消息，格式叫 JSON-RPC 2.0 —— 就是一条 JSON 问、一条 JSON 答；走本机管道（stdio）或走网络（HTTP）。
            选一个场景，按右下角按钮一条条往下看，每条消息附带它实际的 body。
          </p>
        </div>

        {/* 场景 chip */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SCENARIOS.map((s) => {
            const on = s.id === sid;
            return (
              <button
                key={s.id}
                onClick={() => onSwitch(s.id)}
                className={[
                  "px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink/65 hover:bg-cream",
                ].join(" ")}
              >
                {s.label}
                <span
                  className={[
                    "ml-2 font-normal text-[10.5px]",
                    on ? "text-cream/60" : "text-ink/40",
                  ].join(" ")}
                >
                  · {s.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* 时序图卡 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
          {/* 头：两条 lifeline */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Lifeline label="Client" sub="host 进程内" tone="ink" />
            <Lifeline label="Server" sub={sid === "stateless" ? "remote endpoint" : "stdio / http"} tone="teal" />
          </div>

          {/* 消息流 */}
          <div className="relative">
            {/* 中间虚线时间轴 */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -ml-px bg-ink/15"
              aria-hidden
            />
            <div className="space-y-3">
              {scenario.msgs.slice(0, cursor + 1).map((m, i) => (
                <MsgBubble key={`${sid}-${i}`} m={m} idx={i} />
              ))}
              {/* 剩下未展开的灰影 */}
              {scenario.msgs.slice(cursor + 1).map((_, i) => (
                <div
                  key={`ghost-${sid}-${i}`}
                  className="h-12 rounded-xl border-2 border-dashed border-ink/15 flex items-center justify-center"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30">
                    msg {cursor + 2 + i} · 待展开
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 控制条 */}
          <div className="mt-5 flex items-center justify-between pt-4 border-t-2 border-ink/10">
            <div className="font-mono text-[11px] text-ink/55 tabular-nums">
              {cursor + 1} / {total} 条消息
            </div>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                aria-label="重置"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
              </button>
              <button
                onClick={next}
                disabled={cursor === total - 1}
                className="px-4 h-9 flex items-center gap-1.5 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
              >
                NEXT
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.6} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 font-mono text-[10px] text-ink/45 max-w-3xl">
          来源：modelcontextprotocol.io/specification/2025-11-25 · blog.modelcontextprotocol.io 2026-07-28 RC 公告 · github/github-mcp-server v1.4 实测
        </p>
      </div>
    </section>
  );
};

/* ---------- 子组件 ---------- */

const Lifeline: React.FC<{
  label: string;
  sub: string;
  tone: "ink" | "teal";
}> = ({ label, sub, tone }) => (
  <div
    className={[
      "rounded-2xl border-2 border-ink px-4 py-2.5 shadow-stamp",
      tone === "ink" ? "bg-ink text-cream" : "bg-teal text-cream",
    ].join(" ")}
  >
    <div className="font-display text-[16px] font-bold leading-tight">
      {label}
    </div>
    <div
      className={[
        "font-mono text-[10px] uppercase tracking-[0.18em] mt-0.5",
        tone === "ink" ? "text-cream/60" : "text-cream/65",
      ].join(" ")}
    >
      {sub}
    </div>
  </div>
);

const MsgBubble: React.FC<{ m: Msg; idx: number }> = ({ m, idx }) => {
  const style = KIND_STYLE[m.kind];
  const fromClient = m.from === "c";

  return (
    <div
      className="grid grid-cols-2 gap-4 items-stretch animate-enter-fade"
      style={{ animationDelay: `${idx * 30}ms` }}
    >
      {/* 左格 */}
      <div className={fromClient ? "block" : "block opacity-0 pointer-events-none"}>
        {fromClient && <Bubble m={m} style={style} side="left" />}
      </div>
      {/* 右格 */}
      <div className={fromClient ? "block opacity-0 pointer-events-none" : "block"}>
        {!fromClient && <Bubble m={m} style={style} side="right" />}
      </div>
    </div>
  );
};

const Bubble: React.FC<{
  m: Msg;
  style: { bg: string; text: string; tag: string };
  side: "left" | "right";
}> = ({ m, style, side }) => (
  <div
    className={[
      "rounded-xl border-2 border-ink shadow-stamp p-3 bg-white relative",
      side === "left" ? "" : "",
    ].join(" ")}
  >
    <div className="flex items-baseline justify-between mb-1.5 gap-2">
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className={`${style.bg} ${style.text} font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded`}
        >
          {style.tag}
        </span>
        <span className="font-mono text-[11.5px] font-bold text-ink truncate">
          {m.method}
        </span>
      </div>
    </div>
    <pre className="font-mono text-[10.5px] leading-snug text-ink/85 bg-cream border border-ink/15 rounded-md p-2 overflow-x-auto whitespace-pre-wrap break-all">
      {m.json}
    </pre>
    <p className="mt-1.5 text-[11.5px] text-ink/65 leading-snug">{m.note}</p>
  </div>
);

export default SectionWire;
