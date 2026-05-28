/**
 * Section 06 · MCP server 货架
 *
 * 反模板：
 *   ─ 区别于 quantization 站「accordion + sort」生态表 —— 我们是 grid 卡片 + 标签筛选
 *   ─ 区别于 moe 站「257 expert 网格」—— 我们是 12 张真实 server 卡片
 *   ─ 区别于 fc 站 vendor chip —— 这里 chip 是 category（开发 / 数据 / 通信 / ...）
 *   ─ Section 05 也用 chip，但 05 是「场景互斥单选」，06 是「类别 filter + grid」—— 视觉密度截然不同
 *
 * 交互（L2 chip + L3 grid filter）：
 *   ① 顶部 category chip 过滤
 *   ② 卡片本身可点击 → 展开 install 命令 + 一行真实 tool 名
 *
 * 数据来源 2026 真实：
 *   ─ registry.modelcontextprotocol.io · PulseMCP / Smithery / mcp.so
 *   ─ Kopern 2026-04 报告：Sentry 60M req/月，AWS 60+ 官方 server
 *   ─ digitalapplied.com 2026 H1 ecosystem retrospective: ~9,400 去重 server
 */
import React, { useMemo, useState } from "react";

type Cat = "all" | "dev" | "data" | "comm" | "obs" | "ux";

const CATS: { id: Cat; label: string; cn: string }[] = [
  { id: "all", label: "all", cn: "全部" },
  { id: "dev", label: "dev", cn: "开发工具" },
  { id: "data", label: "data", cn: "数据 & DB" },
  { id: "comm", label: "comm", cn: "通信 & 协作" },
  { id: "obs", label: "obs", cn: "监控观测" },
  { id: "ux", label: "ux", cn: "设计与浏览器" },
];

type Transport = "stdio" | "http" | "both";

type ServerCard = {
  id: string;
  name: string;
  vendor: string;
  cat: Cat;
  tools: number | string;
  resources: number | string;
  prompts: number | string;
  transport: Transport;
  install: string;
  samples: string[];
  note?: string;
};

const SERVERS: ServerCard[] = [
  {
    id: "fs",
    name: "Filesystem",
    vendor: "Anthropic 官方 ref",
    cat: "dev",
    tools: 11,
    resources: "动态",
    prompts: 0,
    transport: "stdio",
    install: "npx -y @modelcontextprotocol/server-filesystem ~/work",
    samples: ["read_file", "write_file", "search_files"],
  },
  {
    id: "gh",
    name: "GitHub",
    vendor: "github/github-mcp-server",
    cat: "dev",
    tools: 51,
    resources: "动态",
    prompts: 4,
    transport: "both",
    install: "docker run -e GITHUB_PAT=… ghcr.io/github/github-mcp-server",
    samples: ["create_issue", "get_pull_request_diff", "list_workflow_runs"],
  },
  {
    id: "pw",
    name: "Playwright",
    vendor: "microsoft/playwright-mcp",
    cat: "ux",
    tools: 21,
    resources: 0,
    prompts: 0,
    transport: "stdio",
    install: "npx -y @playwright/mcp",
    samples: ["browser_navigate", "browser_snapshot", "browser_click"],
    note: "让模型真的开浏览器点按钮",
  },
  {
    id: "pg",
    name: "Postgres",
    vendor: "Anthropic 官方 ref",
    cat: "data",
    tools: 5,
    resources: "动态",
    prompts: 0,
    transport: "stdio",
    install: "npx -y @modelcontextprotocol/server-postgres postgres://…",
    samples: ["read_query", "list_tables", "describe_table"],
  },
  {
    id: "stripe",
    name: "Stripe",
    vendor: "stripe/agent-toolkit · 官方",
    cat: "data",
    tools: 23,
    resources: 0,
    prompts: 2,
    transport: "http",
    install: "npx -y @stripe/mcp --tools=all",
    samples: ["create_customer", "create_invoice", "search_charges"],
  },
  {
    id: "notion",
    name: "Notion",
    vendor: "developers.notion.com/mcp",
    cat: "comm",
    tools: 19,
    resources: "动态",
    prompts: 3,
    transport: "http",
    install: "remote · https://mcp.notion.com/sse",
    samples: ["search_pages", "create_page", "append_block"],
  },
  {
    id: "slack",
    name: "Slack",
    vendor: "Anthropic 官方 ref（已捐 community）",
    cat: "comm",
    tools: 8,
    resources: "动态",
    prompts: 1,
    transport: "stdio",
    install: "npx -y @modelcontextprotocol/server-slack",
    samples: ["post_message", "list_channels", "get_thread_replies"],
  },
  {
    id: "linear",
    name: "Linear",
    vendor: "Linear 官方",
    cat: "comm",
    tools: 13,
    resources: "动态",
    prompts: 2,
    transport: "http",
    install: "remote · OAuth 2.1 · https://mcp.linear.app",
    samples: ["create_issue", "update_issue", "list_my_issues"],
  },
  {
    id: "sentry",
    name: "Sentry",
    vendor: "sentry-mcp · 60M req/月 · 5000+ 组织",
    cat: "obs",
    tools: 18,
    resources: "动态",
    prompts: 2,
    transport: "http",
    install: "remote · https://mcp.sentry.dev/sse",
    samples: ["find_errors", "resolve_issue", "get_event_attachment"],
  },
  {
    id: "datadog",
    name: "Datadog",
    vendor: "DataDog/mcp-server-datadog",
    cat: "obs",
    tools: 14,
    resources: 0,
    prompts: 1,
    transport: "stdio",
    install: "npx -y @datadog/mcp-server-datadog",
    samples: ["search_logs", "list_monitors", "get_incidents"],
  },
  {
    id: "figma",
    name: "Figma",
    vendor: "GLips/figma-context-mcp · 社区热门",
    cat: "ux",
    tools: 14,
    resources: "动态",
    prompts: 2,
    transport: "stdio",
    install: "npx -y figma-developer-mcp --figma-api-key=…",
    samples: ["get_file", "get_node_image", "get_comments"],
  },
  {
    id: "brave",
    name: "Brave Search",
    vendor: "Anthropic 官方 ref",
    cat: "dev",
    tools: 2,
    resources: 0,
    prompts: 0,
    transport: "stdio",
    install: "npx -y @modelcontextprotocol/server-brave-search",
    samples: ["brave_web_search", "brave_local_search"],
  },
];

const TRANS_LABEL: Record<Transport, string> = {
  stdio: "stdio · 本地",
  http: "streamable http",
  both: "stdio + http",
};

const TRANS_BG: Record<Transport, string> = {
  stdio: "bg-butter text-ink",
  http: "bg-coral text-white",
  both: "bg-teal text-white",
};

const SectionMarket: React.FC = () => {
  const [cat, setCat] = useState<Cat>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(
    () => (cat === "all" ? SERVERS : SERVERS.filter((s) => s.cat === cat)),
    [cat],
  );

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">
            ecosystem · 真实 server 货架
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-9 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink mb-5 leading-tight">
              到 2026 年，
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">9,400+ 个</span>
              </span>
              公开 server 在跑。
            </h2>
            <p className="text-[15px] text-ink/75 leading-relaxed">
              四大公开注册表（PulseMCP 15.9k · 官方 Registry 2k · Smithery 7.3k · mcp.so 19.7k）去重后约 9,400 个，
              到 2026 上半年还在 +38%/4 月 速度长。下面 12 张是实际跑得最多的那些。
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              <Stat
                tone="butter"
                num="97M+"
                label="官方 SDK 月下载"
                source="Kopern 2026/04"
              />
              <Stat
                tone="coral"
                num="60M"
                label="Sentry MCP 月请求"
                source="Kopern 2026/04"
              />
              <Stat
                tone="teal"
                num="9+"
                label="主流 host 都接"
                source="WorkOS 2026"
              />
            </div>
          </div>
        </div>

        {/* category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATS.map((c) => {
            const on = c.id === cat;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCat(c.id);
                  setOpenId(null);
                }}
                className={[
                  "px-3.5 py-2 rounded-full border-2 border-ink transition-all duration-250 ease-spring font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink/65 hover:bg-cream",
                ].join(" ")}
              >
                {c.label}
                <span
                  className={[
                    "ml-2 font-sans normal-case tracking-normal text-[11px]",
                    on ? "text-cream/70" : "text-ink/55",
                  ].join(" ")}
                >
                  · {c.cn}
                </span>
              </button>
            );
          })}
          <div className="ml-auto self-center font-mono text-[10px] text-ink/45 uppercase tracking-[0.18em]">
            显示 {list.length} / {SERVERS.length}
          </div>
        </div>

        {/* server grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((s) => {
            const open = openId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setOpenId(open ? null : s.id)}
                className={[
                  "text-left rounded-2xl border-2 border-ink p-4 transition-all duration-300 ease-spring",
                  open
                    ? "bg-cream shadow-stamp-xl -translate-x-1 -translate-y-1"
                    : "bg-white shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between mb-2 gap-2">
                  <h3 className="font-display text-[18px] font-bold text-ink truncate">
                    {s.name}
                  </h3>
                  <span
                    className={`${TRANS_BG[s.transport]} font-mono text-[9.5px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded border border-ink flex-shrink-0`}
                  >
                    {TRANS_LABEL[s.transport]}
                  </span>
                </div>
                <p className="font-mono text-[10.5px] text-ink/55 mb-3 truncate">
                  {s.vendor}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <CountBox label="tools" value={s.tools} tone="coral" />
                  <CountBox label="resrc" value={s.resources} tone="teal" />
                  <CountBox label="prompts" value={s.prompts} tone="butter" />
                </div>
                {s.note && (
                  <p className="text-[12px] text-ink/65 leading-snug mb-1">
                    {s.note}
                  </p>
                )}
                {open && (
                  <div className="mt-3 pt-3 border-t border-ink/15 animate-enter-fade space-y-2">
                    <div>
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                        install
                      </div>
                      <div className="font-mono text-[11px] text-ink bg-ink/[0.04] border border-ink/15 rounded px-2 py-1.5 break-all">
                        {s.install}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                        几个真实 tool
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {s.samples.map((x) => (
                          <span
                            key={x}
                            className="font-mono text-[10.5px] text-ink px-1.5 py-0.5 bg-white border border-ink/20 rounded"
                          >
                            {x}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {!open && (
                  <div className="font-mono text-[10px] text-ink/45 tracking-[0.05em]">
                    点开看 install 命令
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[10px] text-ink/45 max-w-3xl">
          来源：registry.modelcontextprotocol.io · digitalapplied.com 2026 H1 retrospective · Kopern 2026-04 报告 · 各 server 官方仓库 README
        </p>
      </div>
    </section>
  );
};

const Stat: React.FC<{
  tone: "butter" | "coral" | "teal";
  num: string;
  label: string;
  source: string;
}> = ({ tone, num, label, source }) => {
  const bg =
    tone === "butter"
      ? "bg-butter"
      : tone === "coral"
        ? "bg-coral"
        : "bg-teal";
  const text = tone === "butter" ? "text-ink" : "text-white";
  return (
    <div
      className={`${bg} ${text} border-2 border-ink rounded-2xl px-3 py-2.5 shadow-stamp`}
    >
      <div className="font-display text-[22px] lg:text-[24px] font-bold leading-none tabular-nums">
        {num}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] mt-1 opacity-85">
        {label}
      </div>
      <div className="font-mono text-[9px] opacity-65 mt-0.5">{source}</div>
    </div>
  );
};

const CountBox: React.FC<{
  label: string;
  value: number | string;
  tone: "coral" | "teal" | "butter";
}> = ({ label, value, tone }) => {
  const bg =
    tone === "coral"
      ? "bg-coral/12"
      : tone === "teal"
        ? "bg-teal/10"
        : "bg-butter/35";
  const accent =
    tone === "coral"
      ? "text-coral"
      : tone === "teal"
        ? "text-teal"
        : "text-ink";
  return (
    <div className={`${bg} border border-ink/15 rounded-lg px-2 py-1.5`}>
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/55">
        {label}
      </div>
      <div className={`font-display text-[15px] font-bold ${accent} tabular-nums leading-tight`}>
        {value}
      </div>
    </div>
  );
};

export default SectionMarket;
