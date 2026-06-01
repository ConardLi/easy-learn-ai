/**
 * SectionTask · Task 持久化系统
 *
 * 主交互（L2 accordion）：4 大特征展开
 *   - 持久化存储（~/.claude/tasks/）
 *   - 依赖关系（addBlockedBy）
 *   - 多会话协作（CLAUDE_CODE_TASK_LIST_ID）
 *   - 层级结构（父子任务）
 *
 * 顶部：4 个 Task 工具的卡片（TaskCreate / TaskGet / TaskUpdate / TaskList）
 * 跟相邻 SectionTodoWrite（trace）拉开。
 */
import React, { useState } from "react";
import { Database, Plus, Search, RefreshCw, List, FolderTree, Users } from "lucide-react";

const TOOLS = [
  {
    name: "TaskCreate",
    icon: <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />,
    desc: "建任务：标题 / 描述 / 状态",
  },
  {
    name: "TaskGet",
    icon: <Search className="w-3.5 h-3.5" strokeWidth={2.5} />,
    desc: "拿单个任务的完整信息",
  },
  {
    name: "TaskUpdate",
    icon: <RefreshCw className="w-3.5 h-3.5" strokeWidth={2.5} />,
    desc: "改状态 / 加依赖",
  },
  {
    name: "TaskList",
    icon: <List className="w-3.5 h-3.5" strokeWidth={2.5} />,
    desc: "列所有任务 + 当前状态",
  },
];

type FeatKey = "persist" | "deps" | "multi" | "tree";

type Feature = {
  id: FeatKey;
  num: string;
  label: string;
  en: string;
  icon: React.ReactNode;
  tone: string;
  headline: string;
  body: string;
  example: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "persist",
    num: "01",
    label: "持久化存储",
    en: "Persistence",
    icon: <Database className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    headline: "任务写到磁盘 ~/.claude/tasks/，关机也还在。",
    body:
      "关掉终端 / 重启电脑 / 上下文被压缩（context compaction），任务都还在。哪怕隔三天再打开项目，进度也不会丢 —— 不用每次重新跟 Agent 解释「我们做到哪了」。",
    example: (
      <div className="font-mono text-[12px] text-ink/80 leading-[1.7]">
        <div className="text-ink/55">~/.claude/tasks/</div>
        <div>├── auth-system.json</div>
        <div>├── billing-refactor.json</div>
        <div className="text-ink/55">└── ... 上周开的所有任务</div>
        <div className="mt-2 pt-2 border-t-2 border-dashed border-ink/15 text-coral">
          关机 → 重启 → 任务全在
        </div>
      </div>
    ),
  },
  {
    id: "deps",
    num: "02",
    label: "依赖关系",
    en: "Dependencies",
    icon: <FolderTree className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    headline: "任务 C 被任务 A 和 B 阻塞 —— 自动追踪。",
    body:
      "下面那行 addBlockedBy 翻译成人话：告诉系统「前端任务得等数据库设计做完」。设计一标完成，前端就自动从 blocked 变 ready。这种依赖关系，TodoWrite 只能你自己盯着，做不到自动追（见下一节实战）。",
    example: (
      <div className="font-mono text-[12px] text-ink/80 leading-[1.7]">
        <div>TaskUpdate(<span className="text-pop">{`"build-frontend"`}</span>, {`{`}</div>
        <div className="pl-4">addBlockedBy: [<span className="text-pop">{`"design-schema"`}</span>],</div>
        <div>{`}`})</div>
        <div className="mt-2 pt-2 border-t-2 border-dashed border-ink/25 text-cream/70">
          design-schema 完成 → build-frontend 自动 unblock
        </div>
      </div>
    ),
  },
  {
    id: "multi",
    num: "03",
    label: "多会话协作",
    en: "Multi-Session",
    icon: <Users className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    headline: "两个 Claude Code 会话共享同一份任务列表。",
    body:
      "翻译成人话：两个终端要共用一份清单时，给它们设同一个 TASK_LIST_ID（环境变量 CLAUDE_CODE_TASK_LIST_ID）—— 就当是给清单起个名字。终端 A 标完任务 1，终端 B 立刻看到。两个 Agent 各干一片，互不冲突。",
    example: (
      <div className="font-mono text-[12px] text-cream/85 leading-[1.7]">
        <div>$ <span className="text-butter">export CLAUDE_CODE_TASK_LIST_ID=auth-2026q1</span></div>
        <div className="mt-1.5 text-cream/55">$ # 终端 A · 写后端</div>
        <div>$ claude → TaskUpdate api-endpoint completed</div>
        <div className="mt-1.5 text-cream/55">$ # 终端 B · 写前端，看到 unblock</div>
        <div>$ claude → TaskList ⇒ frontend 可执行 ✓</div>
      </div>
    ),
  },
  {
    id: "tree",
    num: "04",
    label: "层级结构",
    en: "Hierarchy",
    icon: <FolderTree className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-pop text-white",
    headline: "父子任务嵌套，大任务拆小任务，小任务还能再拆。",
    body:
      "一个 epic 拆成多个 task，task 再拆成多个 subtask。比 TodoWrite 的扁平列表表达力强得多，特别适合大型项目的分阶段管理。",
    example: (
      <div className="font-mono text-[12px] text-cream leading-[1.7]">
        <div>auth-system <span className="text-cream/55">(epic)</span></div>
        <div className="pl-4">├── design-schema</div>
        <div className="pl-4">├── api-endpoint</div>
        <div className="pl-8 text-cream/65">│   ├── POST /login</div>
        <div className="pl-8 text-cream/65">│   └── POST /logout</div>
        <div className="pl-4">└── frontend</div>
        <div className="pl-8 text-cream/65">    └── LoginForm</div>
      </div>
    ),
  },
];

const SectionTask: React.FC = () => {
  const [open, setOpen] = useState<FeatKey>("persist");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Tool B · Task</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          Task：
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">轻量级项目管理工具</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          Task 是 Claude Code 在
          <span className="font-mono text-[14px]"> v2.1.16 </span>
          引入的新系统。如果说 TodoWrite 是便利贴，
          <span className="font-bold text-ink"> Task = 写在硬盘上的任务单，关机还在，还能记谁等谁 </span>
          —— 4 个工具 + 4 大特征。
        </p>

        {/* ─── 4 个工具卡 ─── */}
        <div className="mt-10">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
            4 个工具
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="bg-cream border-2 border-ink rounded-2xl shadow-stamp p-4 transition-all duration-300 ease-spring hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-stamp-lg"
              >
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-ink text-cream rounded-md mb-2">
                  {t.icon}
                  <span className="font-mono text-[10px] font-bold tracking-[0.12em]">
                    {t.name}
                  </span>
                </div>
                <div className="font-sans text-[12.5px] text-ink/80 leading-snug">
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 4 大特征 accordion ─── */}
        <div className="mt-12">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
            4 大特征 · 点击展开
          </div>
          <div className="space-y-3">
            {FEATURES.map((f) => {
              const isOpen = open === f.id;
              return (
                <div
                  key={f.id}
                  className={`border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300 ease-spring ${
                    isOpen ? "shadow-stamp-lg" : "shadow-stamp"
                  } bg-cream`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? open : f.id)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 ${
                      isOpen ? `${f.tone}` : "bg-cream hover:bg-butter/15"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="font-mono text-[11px] tracking-[0.18em] opacity-70 w-6">
                        {f.num}
                      </span>
                      <span className="opacity-90">{f.icon}</span>
                      <span className="font-display font-extrabold text-[18px] leading-tight truncate">
                        {f.label}
                      </span>
                      <span className="hidden md:inline font-mono text-[10.5px] tracking-[0.18em] uppercase opacity-65">
                        · {f.en}
                      </span>
                    </div>
                    <span className="font-mono text-[14px] font-bold opacity-75">
                      {isOpen ? "—" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 py-5 bg-cream animate-enter-fade">
                      <div>
                        <div className="font-display font-bold text-[17px] text-ink mb-2 leading-snug">
                          {f.headline}
                        </div>
                        <p className="font-sans text-[14px] leading-[1.7] text-ink/80">
                          {f.body}
                        </p>
                      </div>
                      <div
                        className={`rounded-xl border-2 border-ink p-4 ${
                          f.id === "multi" || f.id === "tree" || f.id === "deps"
                            ? "bg-ink"
                            : "bg-white"
                        }`}
                      >
                        <div
                          className={`font-mono text-[10px] tracking-[0.18em] uppercase mb-2 ${
                            f.id === "multi" || f.id === "tree" || f.id === "deps"
                              ? "text-cream/55"
                              : "text-ink/55"
                          }`}
                        >
                          看个真实形态
                        </div>
                        {f.example}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 收尾对照 */}
        <div className="mt-10 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-7">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-3">
            一句话总结
          </div>
          <p className="font-display font-bold text-[22px] leading-[1.4]">
            TodoWrite 解决「这次别忘」，
            <br className="hidden md:block" />
            Task 解决「这件事跨好几天 + 好几个会话还能接着干」。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionTask;
