/**
 * Section 04 · 3 类 primitives
 *
 * 反模板：
 *   ─ Section 03 用 pill + pill，本节用 chip + accordion —— 范式不同
 *   ─ 区别于 fc 站「schema editor 输入框」—— 这里展示的是真实 server 清单，不是用户自己改 schema
 *   ─ 区别于 distill 站 5 类概率柱 —— 我们是「同一 primitive 不同 server 覆盖矩阵」
 *
 * 交互（L2 chip + L2 accordion）：
 *   ① 顶部 3 个 primitive chip 切换主体
 *   ② 下方 3 个真实 server 卡片，点开看具体清单
 *
 * 数据来源 2026 真实：
 *   ─ MCP spec 2025-11-25（primitive 定义 + RPC method 名）
 *   ─ @modelcontextprotocol/server-filesystem (npm latest 2026/04)
 *   ─ github.com/github/github-mcp-server (官方 v1.x)
 *   ─ developers.notion.com/docs/mcp (notion 官方 MCP)
 */
import React, { useState } from "react";
import { ChevronDown, FileText, Wrench, Sparkles } from "lucide-react";

type PrimitiveId = "resources" | "tools" | "prompts";

const PRIMITIVES: Record<
  PrimitiveId,
  {
    label: string;
    cn: string;
    one: string;
    listMethod: string;
    getMethod: string;
    direction: string;
    fields: { name: string; what: string }[];
    Icon: React.FC<{ className?: string; strokeWidth?: number }>;
    tone: string;
  }
> = {
  resources: {
    label: "Resources",
    cn: "可读数据",
    one: "Server 把文件、DB 行、URL 内容暴露给 host 读，不能执行动作。",
    listMethod: "resources/list",
    getMethod: "resources/read",
    direction: "Server → Client",
    fields: [
      { name: "uri", what: "唯一标识，长得像 file:// 或 db://" },
      { name: "name", what: "人类可读的名字" },
      { name: "mimeType", what: "text/plain · application/json · image/png" },
    ],
    Icon: FileText,
    tone: "bg-teal text-white",
  },
  tools: {
    label: "Tools",
    cn: "可执行函数",
    one: "Server 暴露的函数，模型可以填参数后让 host 调用。",
    listMethod: "tools/list",
    getMethod: "tools/call",
    direction: "Server → Client",
    fields: [
      { name: "name", what: "工具名 · 在该 server 内唯一" },
      { name: "inputSchema", what: "JSON Schema · 给模型生成参数用" },
      {
        name: "annotations",
        what: "readOnlyHint · destructiveHint · idempotentHint",
      },
    ],
    Icon: Wrench,
    tone: "bg-coral text-white",
  },
  prompts: {
    label: "Prompts",
    cn: "模板化提示",
    one: "Server 端写好的提示模板，host 替 user 把它注入对话。",
    listMethod: "prompts/list",
    getMethod: "prompts/get",
    direction: "Server → Client",
    fields: [
      { name: "name", what: "模板名" },
      { name: "arguments", what: "渲染参数 · client 填进去" },
      { name: "messages", what: "返回的 role+content 数组，直接喂模型" },
    ],
    Icon: Sparkles,
    tone: "bg-butter text-ink",
  },
};

type ServerEntry = {
  id: string;
  label: string;
  vendor: string;
  /** 各 primitive 在这家 server 上的数量与代表项 */
  data: Record<
    PrimitiveId,
    { count: number | string; sample: string[] }
  >;
};

const SERVERS: ServerEntry[] = [
  {
    id: "fs",
    label: "Filesystem",
    vendor: "@modelcontextprotocol/server-filesystem · Anthropic 官方",
    data: {
      resources: {
        count: "动态",
        sample: ["file:///Users/.../README.md", "file:///work/notes.txt"],
      },
      tools: {
        count: 11,
        sample: [
          "read_file",
          "write_file",
          "create_directory",
          "list_directory",
          "move_file",
          "search_files",
        ],
      },
      prompts: { count: 0, sample: ["（这家 server 不带 prompt 模板）"] },
    },
  },
  {
    id: "gh",
    label: "GitHub",
    vendor: "github/github-mcp-server · GitHub 官方",
    data: {
      resources: {
        count: "动态",
        sample: [
          "github://repo/{owner}/{repo}",
          "github://issue/{owner}/{repo}/{num}",
        ],
      },
      tools: {
        count: 51,
        sample: [
          "create_issue",
          "get_pull_request_diff",
          "list_workflow_runs",
          "create_or_update_file",
          "search_code",
        ],
      },
      prompts: {
        count: 4,
        sample: [
          "issue-triage",
          "pr-summary",
          "release-notes",
          "code-review-comment",
        ],
      },
    },
  },
  {
    id: "sentry",
    label: "Sentry",
    vendor: "Sentry MCP · 60M req/月 · 5000+ 组织在用",
    data: {
      resources: {
        count: "动态",
        sample: [
          "sentry://issue/{org}/{id}",
          "sentry://event/{org}/{event_id}",
        ],
      },
      tools: {
        count: 18,
        sample: [
          "find_errors",
          "get_event_attachment",
          "resolve_issue",
          "search_issues",
        ],
      },
      prompts: {
        count: 2,
        sample: ["root-cause-analysis", "regression-bisect"],
      },
    },
  },
];

const SectionPrimitives: React.FC = () => {
  const [pid, setPid] = useState<PrimitiveId>("tools");
  const [openServer, setOpenServer] = useState<string | null>("gh");

  const p = PRIMITIVES[pid];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">
            primitives · server 端能给的 3 种东西
          </span>
        </div>

        <div className="mb-10 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-5 leading-tight">
            一个 server 能暴露 <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-0 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">三种东西</span>
            </span> 给 host。
          </h2>
          <p className="text-[15px] text-ink/75 leading-relaxed">
            Resources 是可读数据，Tools 是可执行函数，Prompts 是模板化提示。
            点上面的 chip 切换，下面看三家真实 server 各自怎么分配。
          </p>
        </div>

        {/* primitive chip */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {(Object.keys(PRIMITIVES) as PrimitiveId[]).map((id) => {
            const data = PRIMITIVES[id];
            const on = id === pid;
            const Icon = data.Icon;
            return (
              <button
                key={id}
                onClick={() => setPid(id)}
                className={[
                  "px-4 py-3 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring text-left flex items-center gap-3",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg -translate-y-0.5"
                    : "bg-white text-ink hover:bg-butter-tint shadow-stamp",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-9 h-9 rounded-xl flex items-center justify-center border-2 border-ink",
                    on ? data.tone : "bg-cream text-ink",
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.4} />
                </div>
                <div>
                  <div className="font-display text-[16px] font-bold leading-tight">
                    {data.label}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] tracking-[0.1em] mt-0.5",
                      on ? "text-cream/65" : "text-ink/55",
                    ].join(" ")}
                  >
                    {data.cn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 当前 primitive 的小白皮 */}
        <div
          key={pid}
          className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7 mb-7 animate-enter-fade"
        >
          <p className="font-display text-[18px] lg:text-[20px] font-bold text-ink leading-snug mb-5">
            {p.one}
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <MethodChip label="list method" value={p.listMethod} tone="cream" />
            <MethodChip
              label="get / call method"
              value={p.getMethod}
              tone="butter"
            />
            <MethodChip label="direction" value={p.direction} tone="ink" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
              核心字段
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              {p.fields.map((f) => (
                <div
                  key={f.name}
                  className="bg-cream border-2 border-ink rounded-xl px-3 py-2.5"
                >
                  <div className="font-mono text-[12px] font-bold text-ink">
                    {f.name}
                  </div>
                  <div className="text-[12px] text-ink/65 leading-snug mt-0.5">
                    {f.what}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 真实 server 清单 · accordion */}
        <div className="space-y-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2 px-1">
            ↓ 三家真实 server，在 <strong className="text-ink">{p.label}</strong> 上各自给了多少
          </div>
          {SERVERS.map((s) => {
            const open = openServer === s.id;
            const entry = s.data[pid];
            return (
              <div
                key={s.id}
                className="bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden"
              >
                <button
                  onClick={() => setOpenServer(open ? null : s.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-cream transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={[
                        "w-9 h-9 rounded-xl border-2 border-ink flex items-center justify-center font-mono text-[12px] font-bold tabular-nums",
                        p.tone,
                      ].join(" ")}
                    >
                      {entry.count}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-[16px] font-bold text-ink truncate">
                        {s.label}
                      </div>
                      <div className="font-mono text-[10px] text-ink/55 truncate">
                        {s.vendor}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={[
                      "w-4 h-4 text-ink/55 transition-transform duration-300 flex-shrink-0",
                      open ? "rotate-180" : "",
                    ].join(" ")}
                    strokeWidth={2.4}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-4 border-t border-ink/10 pt-4 animate-enter-fade">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                      {p.label.toLowerCase()} 清单（节选）
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.sample.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[11.5px] px-2.5 py-1.5 bg-cream border border-ink/20 rounded-md text-ink"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MethodChip: React.FC<{
  label: string;
  value: string;
  tone: "cream" | "butter" | "ink";
}> = ({ label, value, tone }) => {
  const bg =
    tone === "cream"
      ? "bg-cream"
      : tone === "butter"
        ? "bg-butter"
        : "bg-ink";
  const text = tone === "ink" ? "text-cream" : "text-ink";
  return (
    <div className={`${bg} ${text} border-2 border-ink rounded-xl px-3.5 py-2.5`}>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70 mb-0.5">
        {label}
      </div>
      <div className="font-mono text-[14px] font-bold tabular-nums">{value}</div>
    </div>
  );
};

export default SectionPrimitives;
