/**
 * Section 05 · Default 模式
 *
 * 主交互（L3 任务模拟器）：你扮演审批员
 *   - 屏幕模拟一个 Default 模式终端
 *   - Agent 一条条提出操作，你点「同意」「拒绝」「编辑」
 *   - 操作后日志增长，到尾部给一个总结
 *
 * 视觉锚：仿编辑器 diff 卡 + 三色按钮。跟前面 trace 拉开 —— 这里是你自己操作。
 */
import React, { useMemo, useState } from "react";
import { Check, X, FileEdit, RotateCcw } from "lucide-react";

type Proposal = {
  id: number;
  kind: "read" | "write" | "shell" | "net";
  intent: string;
  detail: string;
  diff?: string[];
  autoApprove?: boolean;
};

const PROPOSALS: Proposal[] = [
  {
    id: 1,
    kind: "read",
    intent: "读 src/auth/session.ts 看现状",
    detail: "读操作 · Default 模式默认放行，不打断。",
    autoApprove: true,
  },
  {
    id: 2,
    kind: "write",
    intent: "新增 src/auth/sessionProvider.ts",
    detail: "把 useSession 包装层抽出来，方便切实现。",
    diff: [
      "+ export function SessionProvider({ children }) {",
      "+   return <Context.Provider value={impl}>{children}</Context.Provider>;",
      "+ }",
    ],
  },
  {
    id: 3,
    kind: "shell",
    intent: "跑 pnpm test src/auth",
    detail: "只动 auth 目录，先跑一遍单测确认基线没崩。",
  },
  {
    id: 4,
    kind: "shell",
    intent: "rm -rf src/auth/legacy/",
    detail: "Agent 想直接删旧目录 —— 你要小心，rm 是不可逆操作。",
  },
];

type Status = "pending" | "approved" | "rejected" | "edited";

type LogLine = {
  who: "agent" | "you";
  text: string;
  tone?: "ok" | "no" | "edit";
};

const KIND_META: Record<
  Proposal["kind"],
  { label: string; color: string; textOn: string }
> = {
  read: { label: "READ", color: "#FBEFE3", textOn: "#241C15" },
  write: { label: "WRITE", color: "#F4D35E", textOn: "#241C15" },
  shell: { label: "SHELL", color: "#E07A5F", textOn: "#FBEFE3" },
  net: { label: "NET", color: "#1B4B5A", textOn: "#FBEFE3" },
};

const SectionDefaultMode: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [log, setLog] = useState<LogLine[]>([
    { who: "agent", text: "(下指令) 帮我重构 session 模块，先抽 provider。" },
  ]);
  const cur = PROPOSALS[idx];
  const done = idx >= PROPOSALS.length;

  const handle = (s: Status) => {
    if (!cur) return;
    const nextLog: LogLine[] = [
      ...log,
      {
        who: "agent",
        text: `[${KIND_META[cur.kind].label}] ${cur.intent}`,
      },
    ];
    if (s === "approved") {
      nextLog.push({ who: "you", tone: "ok", text: "→ 同意，执行。" });
    } else if (s === "rejected") {
      nextLog.push({
        who: "you",
        tone: "no",
        text: "→ 拒绝。Agent 收到否决，会换思路。",
      });
    } else if (s === "edited") {
      nextLog.push({
        who: "you",
        tone: "edit",
        text: "→ 改一下再跑（编辑了命令 / diff，Agent 用你的版本继续）。",
      });
    }
    setLog(nextLog);
    setIdx((i) => i + 1);
  };

  const reset = () => {
    setIdx(0);
    setLog([
      { who: "agent", text: "(下指令) 帮我重构 session 模块，先抽 provider。" },
    ]);
  };

  const summary = useMemo(() => {
    if (!done) return null;
    const ok = log.filter((l) => l.tone === "ok").length;
    const no = log.filter((l) => l.tone === "no").length;
    const ed = log.filter((l) => l.tone === "edit").length;
    return { ok, no, ed };
  }, [done, log]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Default · 边做边审</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          Default 模式
          <br />
          你来当{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-coral/45 -z-0" />
            <span className="relative z-10">审批员</span>
          </span>{" "}
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          Default 是多数 Agent 的出厂设置。读不卡，写和跑命令会暂停等你点。
          Codex CLI 的「Auto」就是这个意思（命名不同思路一致）；
          OpenCode 还能按命令粒度配 ——
          <code className="font-mono text-[13.5px] bg-ink text-cream px-1.5 py-0.5 rounded">
            「git *」: allow, 「rm *」: deny
          </code>
          。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* 左：审批待办卡 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 lg:p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                  当前提案 · {idx + 1 <= PROPOSALS.length ? idx + 1 : PROPOSALS.length} /{" "}
                  {PROPOSALS.length}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 hover:text-ink"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.4} />
                  reset
                </button>
              </div>

              {done ? (
                <div
                  key="done"
                  className="rounded-2xl border-2 border-ink bg-butter p-6 animate-enter-up"
                >
                  <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                    一轮 Default 模式协作结束
                  </div>
                  <div className="font-display font-extrabold text-[22px] text-ink leading-tight mb-3">
                    {summary?.ok} 通过 · {summary?.no} 拒绝 ·{" "}
                    {summary?.ed} 编辑后通过
                  </div>
                  <p className="font-sans text-[14.5px] leading-[1.65] text-ink/80">
                    你刚才走的就是「人在环中」流程（Human-in-the-loop） —— Agent 提一步，你点一次，它才能继续。
                    出错也只是「白点一次」。这就是为什么大多数人日常都待在 Default。
                  </p>
                </div>
              ) : (
                <div
                  key={cur.id}
                  className="rounded-2xl border-2 border-ink bg-cream overflow-hidden animate-enter-up"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-ink">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center font-mono text-[10px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 border-2 border-ink rounded-full"
                        style={{
                          backgroundColor: KIND_META[cur.kind].color,
                          color: KIND_META[cur.kind].textOn,
                        }}
                      >
                        {KIND_META[cur.kind].label}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
                        agent proposal
                      </span>
                    </div>
                    {cur.autoApprove && (
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">
                        读 · 默认放行
                      </span>
                    )}
                  </div>
                  <div className="px-5 py-4">
                    <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                      {cur.intent}
                    </div>
                    <p className="font-sans text-[14px] leading-[1.6] text-ink/70 mt-1.5">
                      {cur.detail}
                    </p>
                    {cur.diff && (
                      <pre className="mt-4 rounded-xl bg-ink text-cream p-3 font-mono text-[12.5px] leading-[1.7] overflow-x-auto">
                        {cur.diff.map((l, i) => (
                          <div
                            key={i}
                            className={
                              l.startsWith("+")
                                ? "text-butter"
                                : l.startsWith("-")
                                ? "text-coral"
                                : ""
                            }
                          >
                            {l}
                          </div>
                        ))}
                      </pre>
                    )}
                  </div>
                  <div className="px-5 py-3 border-t-2 border-ink bg-white flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handle("approved")}
                      className="btn-stamp bg-butter text-ink"
                    >
                      <Check className="w-4 h-4" strokeWidth={2.6} />
                      同意 · 执行
                    </button>
                    <button
                      type="button"
                      onClick={() => handle("edited")}
                      className="btn-stamp bg-white text-ink"
                    >
                      <FileEdit className="w-4 h-4" strokeWidth={2.4} />
                      改一下
                    </button>
                    <button
                      type="button"
                      onClick={() => handle("rejected")}
                      className="btn-stamp bg-pop text-cream"
                    >
                      <X className="w-4 h-4" strokeWidth={2.6} />
                      拒绝
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右：日志 + 节奏说明 */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border-2 border-ink bg-ink text-cream p-5 lg:p-6 shadow-stamp-lg max-h-[420px] overflow-y-auto">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-cream/65 mb-3">
                session log
              </div>
              <div className="space-y-2 font-mono text-[12.5px] leading-[1.7]">
                {log.map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.who === "agent"
                        ? "text-cream/85"
                        : l.tone === "ok"
                        ? "text-butter"
                        : l.tone === "no"
                        ? "text-pop"
                        : "text-coral"
                    }
                  >
                    {l.who === "agent" ? "agent " : "you   "} | {l.text}
                  </div>
                ))}
                {!done && (
                  <div className="text-cream/60">
                    agent | (等待你的决定…)
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl border-2 border-dashed border-ink/35 bg-butter/20">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
                这就是 Default 的节奏
              </div>
              <p className="font-sans text-[13.5px] leading-[1.65] text-ink/80">
                Agent 提案 → 你看 → 你点 → Agent 继续。
                <span className="text-ink"> 出 bug 也只是白点一次 </span>，
                这种「人在环中」是日常开发主力模式。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDefaultMode;
