/**
 * Section 03 · Host / Client / Server 三角
 *
 * 反模板：
 *   ─ Section 02 用单步 trace，本节用「点击 SVG 节点」+「transport 切换」—— 相邻不重复
 *   ─ 区别于 fc 站 protocol vendor tab —— 这里点的是角色，不是厂商
 *   ─ 区别于 agent 站 ReAct 循环图 —— 我们是固定三角，不闪烁不绕圈
 *
 * 交互（L2 + L2）：
 *   ① 点 3 个节点切换右侧角色详情
 *   ② 顶部 stdio / Streamable HTTP 两种 transport 切换，影响 server 端的标签
 *
 * 数据：modelcontextprotocol.io/docs/learn/architecture · spec 2025-11-25
 */
import React, { useState } from "react";

type RoleId = "host" | "client" | "server";
type Transport = "stdio" | "http";

const ROLES: Record<
  RoleId,
  {
    label: string;
    cn: string;
    one: string;
    duties: string[];
    examples: string[];
    tone: "ink" | "butter" | "teal";
  }
> = {
  host: {
    label: "MCP Host",
    cn: "宿主",
    one: "用户面前那个跑 LLM 的 AI 应用。",
    duties: [
      "运行模型 · 渲染对话 UI",
      "管理用户授权 · 弹「这个工具要写文件，同意？」",
      "决定何时让 client 去拉工具列表 / 调工具",
      "在自己进程里 spawn 出多个 client",
    ],
    examples: [
      "Claude Desktop",
      "Cursor",
      "VS Code + Copilot",
      "ChatGPT Desktop",
      "Cline · Windsurf · Zed",
    ],
    tone: "ink",
  },
  client: {
    label: "MCP Client",
    cn: "连接器",
    one: "Host 进程里跟一个 server 1:1 配对的连接对象。",
    duties: [
      "握手 · 跟 server 协商 capability",
      "转发 JSON-RPC 调用 · tools/list · resources/read · prompts/get",
      "处理 server 主动推的 notifications（list_changed 等）",
      "管 server 进程的生命周期（本地 stdio 模式）",
    ],
    examples: [
      "一个 Claude Desktop 启动时会拉起 6-8 个 client",
      "用户看不到，藏在 host 里",
      "Python SDK / TypeScript SDK 各有一份官方实现",
    ],
    tone: "butter",
  },
  server: {
    label: "MCP Server",
    cn: "服务方",
    one: "暴露 resources / tools / prompts 的进程，谁连都行。",
    duties: [
      "实现 tools/list · tools/call · resources/list · resources/read 等 RPC",
      "决定哪些操作 destructive、readOnly、idempotent",
      "可以同时给 N 个 client 用（远程模式）",
      "保管自己的状态（DB 连接 / 文件句柄 / API token）",
    ],
    examples: [
      "@modelcontextprotocol/server-github",
      "@modelcontextprotocol/server-filesystem",
      "Sentry · Notion · Figma · Linear MCP",
      "你自己用 50 行 Python 写的小 server",
    ],
    tone: "teal",
  },
};

const TRANSPORTS: Record<
  Transport,
  { label: string; sub: string; line: string; note: string }
> = {
  stdio: {
    label: "stdio",
    sub: "Server 是 host spawn 的子进程，stdin/stdout 走 JSON-RPC",
    line: "本地管道 · 零网络 · 启动 ~50ms",
    note: "适合开发机插件、本地文件 / DB 工具。配置文件里写 command + args。",
  },
  http: {
    label: "Streamable HTTP",
    sub: "Server 跑在远端，host 用 POST + SSE 流式拿响应",
    note: "2025-03 spec 加入。OAuth 2.1 鉴权。2026-07-28 RC 去 session、加 Mcp-Method 路由头。",
    line: "跨网络 · OAuth 2.1 · SaaS 服务首选",
  },
};

const SectionTriangle: React.FC = () => {
  const [role, setRole] = useState<RoleId>("host");
  const [transport, setTransport] = useState<Transport>("stdio");

  const r = ROLES[role];
  const t = TRANSPORTS[transport];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">
            architecture · 3 个角色 · 2 种 transport
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 左：叙述 + transport */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5 leading-tight">
              MCP 把世界切成
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">三个角色</span>
              </span>
              。
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed mb-6">
              <p>
                Host 跑模型、Client 在 host 里 1:1 接一个 server、Server 暴露能力。
                这是协议里唯一允许的角色组合。
              </p>
              <p>
                点右边三角任一个节点，看它的具体职责和真实例子。
                下面再切换两种 transport，看 server 跟 client 怎么说话。
              </p>
            </div>

            {/* transport 切换 */}
            <div className="bg-cream border-2 border-ink rounded-2xl p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                transport · server 怎么跟 client 通话
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(Object.keys(TRANSPORTS) as Transport[]).map((id) => {
                  const on = id === transport;
                  return (
                    <button
                      key={id}
                      onClick={() => setTransport(id)}
                      className={[
                        "py-2.5 px-3 rounded-xl border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-stamp"
                          : "bg-white text-ink/65 hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      {TRANSPORTS[id].label}
                    </button>
                  );
                })}
              </div>
              <p className="text-[13.5px] text-ink/80 leading-relaxed mb-2">
                <strong className="text-ink">{t.label}</strong> · {t.sub}
              </p>
              <p className="text-[12.5px] text-ink/60 leading-relaxed mb-2">
                {t.note}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-ink/15 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/65">
                  {t.line}
                </span>
              </div>
            </div>
          </div>

          {/* 右：三角 + 角色详情 */}
          <div className="lg:col-span-7">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
              {/* SVG 三角 */}
              <div className="bg-white border-2 border-ink rounded-2xl p-4 mb-4">
                <TriangleSvg
                  active={role}
                  transport={transport}
                  onPick={setRole}
                />
              </div>

              {/* 节点切换 pill */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(Object.keys(ROLES) as RoleId[]).map((id) => {
                  const on = id === role;
                  const data = ROLES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setRole(id)}
                      className={[
                        "py-2 px-2 rounded-xl border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-stamp"
                          : "bg-white text-ink/65 hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      {data.label}
                    </button>
                  );
                })}
              </div>

              {/* 角色详情卡 */}
              <div
                key={role}
                className="bg-white border-2 border-ink rounded-2xl p-5 animate-enter-fade"
              >
                <div className="flex items-baseline justify-between mb-3 pb-3 border-b border-ink/10">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                      role
                    </div>
                    <h3 className="font-display text-[22px] font-bold text-ink leading-tight">
                      {r.label}
                      <span className="font-sans text-[14px] font-normal text-ink/55 ml-2">
                        · {r.cn}
                      </span>
                    </h3>
                  </div>
                </div>
                <p className="font-display text-[15.5px] font-bold text-ink mb-3 leading-snug">
                  {r.one}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 mb-1.5">
                      ① 它干什么
                    </div>
                    <ul className="space-y-1.5">
                      {r.duties.map((d, i) => (
                        <li
                          key={i}
                          className="text-ink/80 leading-snug flex gap-1.5"
                        >
                          <span className="text-coral font-bold">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 mb-1.5">
                      ② 真实例子
                    </div>
                    <ul className="space-y-1.5">
                      {r.examples.map((d, i) => (
                        <li
                          key={i}
                          className="text-ink/80 leading-snug flex gap-1.5"
                        >
                          <span className="text-teal font-bold">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 三角 SVG ---------- */

const TriangleSvg: React.FC<{
  active: RoleId;
  transport: Transport;
  onPick: (r: RoleId) => void;
}> = ({ active, transport, onPick }) => {
  const W = 480;
  const H = 280;
  const NODES: Record<
    RoleId,
    { x: number; y: number; fill: string; text: string }
  > = {
    host: { x: W / 2, y: 52, fill: "#241C15", text: "#FBEFE3" },
    client: { x: 92, y: 222, fill: "#F4D35E", text: "#241C15" },
    server: { x: W - 92, y: 222, fill: "#1B4B5A", text: "#FBEFE3" },
  };

  const edge = (a: RoleId, b: RoleId, opts: { dashed?: boolean; label: string; labelX: number; labelY: number }) => {
    const A = NODES[a];
    const B = NODES[b];
    return (
      <g>
        <line
          x1={A.x}
          y1={A.y}
          x2={B.x}
          y2={B.y}
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray={opts.dashed ? "6 5" : undefined}
        />
        <g
          transform={`translate(${opts.labelX},${opts.labelY})`}
        >
          <rect
            x="-46"
            y="-9"
            width="92"
            height="18"
            rx="9"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            textAnchor="middle"
            y="4"
            fontFamily="Geist Mono, monospace"
            fontSize="9.5"
            fontWeight="700"
            fill="#241C15"
          >
            {opts.label}
          </text>
        </g>
      </g>
    );
  };

  const node = (id: RoleId, label: string, sub: string) => {
    const n = NODES[id];
    const on = active === id;
    return (
      <g
        transform={`translate(${n.x},${n.y})`}
        className="cursor-pointer"
        onClick={() => onPick(id)}
      >
        {/* selection ring */}
        {on && (
          <rect
            x="-66"
            y="-38"
            width="132"
            height="76"
            rx="18"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="2.5"
            strokeDasharray="5 4"
          />
        )}
        <rect
          x="-58"
          y="-30"
          width="116"
          height="60"
          rx="14"
          fill={n.fill}
          stroke="#241C15"
          strokeWidth={on ? "2.5" : "2"}
          style={{
            filter: "drop-shadow(3px 3px 0 #241C15)",
          }}
        />
        <text
          y="-6"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill={n.text}
        >
          {label}
        </text>
        <text
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.8"
          fill={n.text}
          opacity="0.75"
        >
          {sub}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* edges */}
      {edge("host", "client", { label: "same process", labelX: (W / 2 + 92) / 2, labelY: (52 + 222) / 2 - 4 })}
      {edge("host", "server", {
        label: "via client",
        labelX: (W / 2 + W - 92) / 2,
        labelY: (52 + 222) / 2 - 4,
      })}
      {edge("client", "server", {
        dashed: transport === "http",
        label:
          transport === "stdio" ? "stdio · JSON-RPC" : "HTTP + SSE · OAuth 2.1",
        labelX: W / 2,
        labelY: 232,
      })}

      {/* transport badge 在 client→server 线上方 */}
      <g transform={`translate(${W / 2},198)`}>
        <rect
          x="-48"
          y="-10"
          width="96"
          height="20"
          rx="4"
          fill={transport === "stdio" ? "#FBE891" : "#E07A5F"}
          stroke="#241C15"
          strokeWidth="1.4"
        />
        <text
          textAnchor="middle"
          y="4"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1"
          fill={transport === "stdio" ? "#241C15" : "#FBEFE3"}
        >
          {transport === "stdio" ? "LOCAL · STDIO" : "REMOTE · HTTP"}
        </text>
      </g>

      {/* nodes */}
      {node("host", "Host", "claude desktop")}
      {node("client", "Client", "in-host adapter")}
      {node(
        "server",
        "Server",
        transport === "stdio" ? "child process" : "remote endpoint",
      )}
    </svg>
  );
};

export default SectionTriangle;
