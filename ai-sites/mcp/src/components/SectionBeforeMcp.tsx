/**
 * Section 02 · MCP 出现前后的 8 个时刻
 *
 * 反模板：
 *   ─ 区别于 fc 站「messages 数组单步增长」—— 这里是时间事件单步走
 *   ─ 区别于 fc 站「SVG gantt timeline」—— 我们是横向 6 个事件节点 + 右侧详情卡
 *   ─ Section 01 用 slider，这里用 next/prev 单步 trace —— 相邻不重复
 *
 * 交互（L2 + L2）：
 *   ① next / prev / 直接点节点 跳到任意步
 *   ② 每步右侧详情卡：事件名 + 一句话 + 当时世界形态（数字 / mini-SVG / 引文）
 *
 * 数据来源 2026 真实：
 *   ─ Anthropic 2024-11-25 announce blog
 *   ─ MCP spec 2025-03-26 revision（Streamable HTTP / OAuth 2.1）
 *   ─ WorkOS 2026 MCP 现状综述（OpenAI 同日 announce 接入）
 *   ─ modelcontextprotocol.io/registry/about（2025-09 preview）
 *   ─ Linux Foundation Agentic AI Foundation（2025-12 donation，firecrawl.dev 引）
 *   ─ MCP 2026-07-28 RC（blog.modelcontextprotocol.io 2026-05-21 lock）
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Step = {
  date: string;
  short: string;
  title: string;
  body: string;
  /** 折叠的「进阶」小字，给愿意翻技术细节的人看 */
  advanced?: string;
  fact: { label: string; value: string };
  tone: "cream" | "butter" | "coral" | "teal" | "ink";
};

const STEPS: Step[] = [
  {
    date: "2023-06",
    short: "FC 出生",
    title: "OpenAI 把 function calling 塞进 chat completion API",
    body: "模型第一次有了「我想调用这个 tool」的结构化输出能力。但 schema 是 OpenAI 自己的格式，Anthropic 和 Google 后来各自发了一套。同一个工具，要给三家分别写一遍。",
    fact: { label: "可复用度", value: "× 0" },
    tone: "cream",
  },
  {
    date: "2024-11-25",
    short: "MCP 1.0",
    title: "Anthropic 开源一套公开规范",
    body: "规范写明：谁扮演谁、消息长什么样、工具清单怎么拉。任何人都能照着实现，不用问 Anthropic 要授权。Python 和 TypeScript SDK 同步发布，第一天就能跑。",
    fact: { label: "首发支持", value: "Claude Desktop" },
    tone: "butter",
  },
  {
    date: "2025-03-26",
    short: "HTTP + OAuth",
    title: "spec 第二版：远程 server 真的能挂网上了",
    body: "工具可以放在云上了，不用只跑本机。OpenAI 同一天宣布 ChatGPT 桌面端、API 都支持 MCP。",
    advanced:
      "技术细节：transport 从 HTTP + SSE 长连接升级成单端点 Streamable HTTP，过普通负载均衡；OAuth 2.1 进核心；OpenAI 同步发布 Agents SDK / Responses API。具体 wire 见 §05。",
    fact: { label: "OpenAI 跟进", value: "同日" },
    tone: "coral",
  },
  {
    date: "2025-09",
    short: "官方 Registry",
    title: "registry.modelcontextprotocol.io 上线 preview",
    body: "由 Anthropic、GitHub、PulseMCP、Microsoft 共同维护的元数据注册表，给下游聚合器（PulseMCP / Smithery / mcp.so）一个标准上游。本身不托管代码，只存 server metadata。",
    fact: { label: "2026/04 收录", value: "≈ 2,000" },
    tone: "teal",
  },
  {
    date: "2025-12",
    short: "Linux Foundation",
    title: "MCP 捐给 Linux Foundation Agentic AI Foundation",
    body: "治理从「Anthropic 一家说了算」变成跨厂商基金会托管。Google DeepMind 此前已在 2025 年早期接入。Microsoft Copilot 系列、Gemini agent framework、LangGraph 内置 MCP client。",
    fact: { label: "现役 host 数", value: "9+ 主流" },
    tone: "ink",
  },
  {
    date: "2026-07-28",
    short: "Stateless RC",
    title: "2026-07-28 RC 锁定：协议核心去 session 化",
    body: "握手步骤简化、server 可以做成无状态（不用记住「这次连接是谁」）。各家客户端继续跟上 —— Claude / ChatGPT / Goose / VS Code 都能跑 server 端 UI。",
    advanced:
      "技术细节：Mcp-Session-Id 头删除，每个请求自带 Mcp-Method / Mcp-Name 头让网关无需读 body 就能路由；OAuth 2.1 强制 RFC 8707 资源绑定 + RFC 9207 iss 校验；MCP Apps 与 OpenAI 共同发布。",
    fact: { label: "整体改动", value: "最大一次修订" },
    tone: "butter",
  },
];

const toneBg: Record<Step["tone"], string> = {
  cream: "bg-cream",
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  ink: "bg-ink",
};

const toneText: Record<Step["tone"], string> = {
  cream: "text-ink",
  butter: "text-ink",
  coral: "text-white",
  teal: "text-white",
  ink: "text-cream",
};

const SectionBeforeMcp: React.FC = () => {
  const [cursor, setCursor] = useState(1); // 默认停在「MCP 1.0」让用户立刻看到核心事件

  const step = STEPS[cursor];
  const atStart = cursor === 0;
  const atEnd = cursor === STEPS.length - 1;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">
            为什么会出现 MCP · 6 个时间点
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 左：叙述 */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5 leading-tight">
              MCP 出来之前 ——
              <br />
              function calling 已经
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">跑了两年</span>
              </span>
              。
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed">
              <p>
                MCP 出来之前，function calling 已经跑了两年，各家格式各写各的，越来越乱。
              </p>
              <p>
                同样一个 GitHub 工具，要给 OpenAI 写一份 schema，给 Anthropic 写一份 tool_use，给 Google 再写一份。ChatGPT Plugins 试过让 OpenAPI 担纲，2024 年中悄悄停了。
              </p>
              <p>
                Anthropic 2024 年 11 月把这事拍板。下面 6 个时间点串起来，看从函数调用诞生到 MCP 被多家产品接上，发生了什么。
              </p>
            </div>
          </div>

          {/* 右：时间线 + 详情 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
              {/* 时间线节点条 */}
              <div className="relative mb-6 pt-2">
                {/* 底线 */}
                <div className="absolute left-3 right-3 top-[28px] h-[2px] bg-ink/15" />
                <div
                  className="absolute left-3 top-[28px] h-[2px] bg-ink transition-all duration-400 ease-spring"
                  style={{
                    width: `calc((100% - 1.5rem) * ${cursor / (STEPS.length - 1)})`,
                  }}
                />
                <div className="relative flex justify-between">
                  {STEPS.map((s, i) => {
                    const done = i <= cursor;
                    const active = i === cursor;
                    return (
                      <button
                        key={i}
                        onClick={() => setCursor(i)}
                        className="flex flex-col items-center group"
                      >
                        <div
                          className={[
                            "w-4 h-4 rounded-full border-2 border-ink transition-all duration-250 ease-spring",
                            active
                              ? "bg-coral scale-150 shadow-stamp"
                              : done
                                ? "bg-ink"
                                : "bg-white group-hover:bg-cream",
                          ].join(" ")}
                        />
                        <div
                          className={[
                            "mt-2 font-mono text-[10px] uppercase tracking-[0.1em] tabular-nums whitespace-nowrap transition-all duration-250",
                            active
                              ? "text-ink font-bold"
                              : "text-ink/45",
                          ].join(" ")}
                        >
                          {s.short}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 详情卡 —— key 强制重渲染让 fade 生效 */}
              <div
                key={cursor}
                className="rounded-2xl border-2 border-ink overflow-hidden animate-enter-fade"
              >
                <div
                  className={`${toneBg[step.tone]} ${toneText[step.tone]} px-5 py-3 flex items-baseline justify-between border-b-2 border-ink`}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold">
                    {step.date}
                  </div>
                  <div className="font-display text-[16px] font-bold tabular-nums">
                    {step.fact.label} · {step.fact.value}
                  </div>
                </div>
                <div className="bg-white p-5">
                  <h3 className="font-display text-[20px] lg:text-[22px] font-bold text-ink mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] text-ink/75 leading-relaxed">
                    {step.body}
                  </p>
                  {step.advanced && (
                    <div className="mt-3 px-3 py-2 bg-ink/5 border-l-[3px] border-ink/30 rounded-r">
                      <span className="inline-block px-1.5 py-0.5 mr-1.5 bg-ink/10 border border-ink/15 rounded font-mono text-[9.5px] uppercase tracking-[0.15em] text-ink/55 font-bold align-middle">
                        进阶
                      </span>
                      <span className="text-[12.5px] text-ink/65 leading-relaxed">
                        {step.advanced}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 控制条 */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCursor((c) => Math.max(0, c - 1))}
                    disabled={atStart}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-ink shadow-stamp disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    aria-label="上一步"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                  <button
                    onClick={() =>
                      setCursor((c) => Math.min(STEPS.length - 1, c + 1))
                    }
                    disabled={atEnd}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-ink text-cream border-2 border-ink shadow-stamp disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    aria-label="下一步"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                  <button
                    onClick={() => setCursor(0)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    aria-label="回到起点"
                  >
                    <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 tabular-nums">
                  {cursor + 1} / {STEPS.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBeforeMcp;
