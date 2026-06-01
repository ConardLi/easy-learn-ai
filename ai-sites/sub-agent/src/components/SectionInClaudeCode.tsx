/**
 * SectionInClaudeCode · Claude Code 里的 SubAgent
 *
 * 主交互（L3 + L4 拼装）：用户改 name / model / 勾选 tools，右侧实时生成 YAML
 *   - 顶部先列内置三种 (Explore / Plan / 通用型) chip 切换看说明（这部分 L2）
 *   - 下方一个迷你「自定义子 Agent」编辑器：input + select + checkbox → 实时 YAML 预览
 *
 * 跟相邻 SectionVsTeams（对比表）拉开风格：这里是输入框 + live preview
 */
import React, { useState } from "react";
import { Eye, Map, Cpu, Pencil, Wrench, AlertTriangle, Check } from "lucide-react";

type BuiltinKey = "explore" | "plan" | "general";

const BUILTINS: Record<
  BuiltinKey,
  {
    label: string;
    en: string;
    icon: React.ReactNode;
    tone: string;
    model: string;
    perms: string;
    job: string;
  }
> = {
  explore: {
    label: "Explore",
    en: "探索型",
    icon: <Eye className="w-3.5 h-3.5" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    model: "Haiku · 快且便宜",
    perms: "只读",
    job: "搜代码、找文件、摸项目结构。问题需要大量读但不写时，Claude 会自动把它派出去。",
  },
  plan: {
    label: "Plan",
    en: "规划型",
    icon: <Map className="w-3.5 h-3.5" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    model: "Plan 模式默认模型",
    perms: "只读",
    job: "Plan 模式下用，先调研代码库再出方案。结论以方案大纲形式回到主对话。",
  },
  general: {
    label: "General-purpose",
    en: "通用型",
    icon: <Cpu className="w-3.5 h-3.5" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    model: "继承主会话模型",
    perms: "继承主会话权限",
    job: "复杂多步任务都能干。查 + 改都允许，是兜底选项。",
  },
};

const BUILTIN_ORDER: BuiltinKey[] = ["explore", "plan", "general"];

const TOOL_OPTIONS = ["Read", "Grep", "Glob", "Bash", "Edit", "Write"] as const;

const SectionInClaudeCode: React.FC = () => {
  const [active, setActive] = useState<BuiltinKey>("explore");
  const b = BUILTINS[active];

  // 自定义子 Agent 编辑器状态
  const [name, setName] = useState("code-reviewer");
  const [desc, setDesc] = useState("Use after code changes to review for issues.");
  const [model, setModel] = useState("sonnet");
  const [tools, setTools] = useState<string[]>(["Read", "Grep", "Glob"]);

  const toggleTool = (t: string) => {
    setTools((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  // 实时生成 YAML
  const yaml = [
    "---",
    `name: ${name || "<name>"}`,
    `description: "${desc || "<what it is good at>"}"`,
    `model: ${model}`,
    `tools:`,
    ...(tools.length === 0
      ? ["  # 没勾，子 Agent 啥都干不了"]
      : tools.map((t) => `  - ${t}`)),
    "---",
    "",
    `You are a focused ${name || "sub-agent"}.`,
    `Stay in your lane: only use the tools listed above.`,
    `Return a concise summary, not a full trace.`,
  ].join("\n");

  // 简单"权限红线"提示
  const hasWrite = tools.includes("Write") || tools.includes("Edit");

  return (
    <section className="relative bg-butter-tint border-t-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">How · Claude Code 里上手</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          三种内置 ＋{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-coral/60 -z-0" />
            <span className="relative z-10">自己定义一个</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          Claude Code 自带三种子 Agent。看完之后，下面这个迷你编辑器
          让你拼一个自定义的，
          <span className="font-bold text-ink"> 改名字 / 改工具 / 改模型，右边 YAML 实时变</span>。
        </p>
        <p className="font-sans text-[14.5px] leading-[1.7] text-ink/70 mt-3 max-w-[760px]">
          补一句铺垫：<span className="font-bold text-ink">Claude Code</span>{" "}
          = 在终端里帮你改代码的 AI 助手（类似 Cursor 里那个会跑命令的 Agent）。
          子 Agent 的配置就写在项目文件夹的{" "}
          <code className="px-1 py-0.5 bg-cream border border-ink/30 rounded font-mono text-[12px]">
            .claude/agents/
          </code>{" "}
          里 —— 下面右边那段 YAML 就是真正会被存进去的格式。
        </p>

        {/* 内置三种 */}
        <div className="mt-10">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
            ① 内置三种 · 切换看说明
          </div>
          <div className="flex flex-wrap gap-3">
            {BUILTIN_ORDER.map((key) => {
              const item = BUILTINS[key];
              const isActive = active === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setActive(key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] tracking-[0.16em] uppercase transition-all duration-250 ease-spring ${
                    isActive
                      ? `${item.tone} shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]`
                      : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <span className={isActive ? "opacity-70" : "opacity-50"}>· {item.en}</span>
                </button>
              );
            })}
          </div>

          <div key={active} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 animate-enter-up">
            <div className={`${b.tone} border-2 border-ink rounded-2xl shadow-stamp p-5`}>
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-75 mb-1.5">
                模型
              </div>
              <div className="font-display font-bold text-[16px]">{b.model}</div>
            </div>
            <div className="card-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
                权限
              </div>
              <div className="font-display font-bold text-[16px] text-ink">{b.perms}</div>
            </div>
            <div className="card-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
                干啥
              </div>
              <p className="font-sans text-[13.5px] leading-[1.6] text-ink/85">{b.job}</p>
            </div>
          </div>
        </div>

        {/* 自定义编辑器 */}
        <div className="mt-14">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
            ② 自己拼一个 · 改输入看 YAML 实时变
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 左：编辑器 */}
            <div className="lg:col-span-7">
              <div className="card-stamp p-6">
                <div className="space-y-5">
                  {/* name */}
                  <div>
                    <label className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
                      <Pencil className="w-3 h-3" strokeWidth={2.4} />
                      name · 子 Agent 的标识
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-cream border-2 border-ink rounded-xl font-mono text-[13px] text-ink focus:outline-none focus:shadow-stamp"
                      placeholder="code-reviewer"
                    />
                  </div>

                  {/* description */}
                  <div>
                    <label className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5 block">
                      description · 干啥的（Claude 靠这个判断啥时候派它）
                    </label>
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-cream border-2 border-ink rounded-xl font-mono text-[12px] text-ink focus:outline-none focus:shadow-stamp"
                      placeholder="Use after code changes to review."
                    />
                  </div>

                  {/* model */}
                  <div>
                    <label className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5 block">
                      model · 简单活用便宜的
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["haiku", "sonnet", "opus"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setModel(m)}
                          className={`px-3 py-1.5 border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-200 ${
                            model === m
                              ? "bg-ink text-cream"
                              : "bg-cream text-ink hover:bg-butter-tint"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* tools */}
                  <div>
                    <label className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                      <Wrench className="w-3 h-3" strokeWidth={2.4} />
                      tools · 它能用的工具（不勾就用不了）
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {TOOL_OPTIONS.map((t) => {
                        const on = tools.includes(t);
                        const isWriteTool = t === "Write" || t === "Edit";
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleTool(t)}
                            className={`px-3 py-1.5 border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.16em] uppercase transition-all duration-200 ${
                              on
                                ? isWriteTool
                                  ? "bg-coral text-white shadow-stamp"
                                  : "bg-butter text-ink shadow-stamp"
                                : "bg-cream text-ink/70 hover:text-ink"
                            }`}
                          >
                            {on && <Check className="inline-block w-3 h-3 mr-1 -mt-px" strokeWidth={3} />}
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {hasWrite && (
                      <p className="mt-3 font-mono text-[11px] text-coral leading-relaxed inline-flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        <span>
                          勾了 Write / Edit = 给了它改你代码的权限。
                          审查类 / 调研类子 Agent 通常不该开。
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 右：YAML 预览 */}
            <div className="lg:col-span-5">
              <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
                <div className="px-5 py-3 border-b-2 border-cream/15 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-cream/65">
                    .claude/agents/{name || "<name>"}.md
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase bg-butter text-ink px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
                <pre className="px-5 py-4 font-mono text-[12px] leading-[1.7] whitespace-pre-wrap break-words">
                  {yaml}
                </pre>
              </div>
              <p className="font-mono text-[11px] text-ink/55 mt-3 leading-relaxed">
                项目级丢 `.claude/agents/`，用户级丢 `~/.claude/agents/`。
                敲 `/agents` 命令能调出管理面板看 / 改 / 删。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionInClaudeCode;
