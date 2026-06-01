/**
 * SectionDepGraph · 依赖图实战
 *
 * 主交互（L3 勾选完成态 + 看下游解锁）：
 *   - 认证系统 4 个 task：
 *       T1 设计 DB Schema
 *       T2 创建 API 端点（依赖 T1）
 *       T3 写前端组件（依赖 T2）
 *       T4 集成测试（依赖 T1 + T2 + T3）
 *   - 用户点「完成 T1」→ T2 从 blocked 变 ready → 看到状态变迁
 *   - 右侧画一张 SVG 拓扑图，箭头随状态变色
 *
 * 跟相邻 SectionTask（accordion）拉开。
 */
import React, { useMemo, useState } from "react";
import { Check, Lock, Play, RefreshCw } from "lucide-react";

type TaskId = "T1" | "T2" | "T3" | "T4";
type TaskState = "ready" | "in_progress" | "completed" | "blocked";

type TaskDef = {
  id: TaskId;
  title: string;
  desc: string;
  deps: TaskId[];
  color: string;
  textOnFill: string;
  pos: { x: number; y: number };
};

const TASKS: TaskDef[] = [
  {
    id: "T1",
    title: "设计 DB Schema",
    desc: "users 表 / sessions 表 / index",
    deps: [],
    color: "#F4D35E",
    textOnFill: "#241C15",
    pos: { x: 80, y: 80 },
  },
  {
    id: "T2",
    title: "创建 API 端点",
    desc: "POST /login · POST /logout",
    deps: ["T1"],
    color: "#E07A5F",
    textOnFill: "#FBEFE3",
    pos: { x: 230, y: 80 },
  },
  {
    id: "T3",
    title: "写前端组件",
    desc: "LoginForm · 登录持久化",
    deps: ["T2"],
    color: "#1B4B5A",
    textOnFill: "#FBEFE3",
    pos: { x: 380, y: 80 },
  },
  {
    id: "T4",
    title: "集成测试",
    desc: "端到端 · 登录 → 受保护页",
    deps: ["T1", "T2", "T3"],
    color: "#FF4D74",
    textOnFill: "#FBEFE3",
    pos: { x: 230, y: 220 },
  },
];

function computeState(
  done: Set<TaskId>,
  inProgress: TaskId | null,
  taskId: TaskId,
): TaskState {
  if (done.has(taskId)) return "completed";
  if (inProgress === taskId) return "in_progress";
  const task = TASKS.find((t) => t.id === taskId)!;
  const allDepsDone = task.deps.every((d) => done.has(d));
  return allDepsDone ? "ready" : "blocked";
}

const SectionDepGraph: React.FC = () => {
  const [done, setDone] = useState<Set<TaskId>>(new Set());
  const [inProgress, setInProgress] = useState<TaskId | null>(null);

  const states = useMemo(() => {
    const m: Record<TaskId, TaskState> = {} as Record<TaskId, TaskState>;
    for (const t of TASKS) m[t.id] = computeState(done, inProgress, t.id);
    return m;
  }, [done, inProgress]);

  const completedCount = done.size;

  function toggleStart(id: TaskId) {
    if (states[id] !== "ready") return;
    setInProgress(id === inProgress ? null : id);
  }

  function completeTask(id: TaskId) {
    if (states[id] !== "in_progress" && states[id] !== "ready") return;
    setDone((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (inProgress === id) setInProgress(null);
  }

  function reset() {
    setDone(new Set());
    setInProgress(null);
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Hands-on · 依赖图实战</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          标完一个，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">下游自动解锁</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          拿一个常见的认证系统拆解：4 个 task，有先后依赖。
          点下面任务卡上的「开始 / 完成」试试 ——
          <span className="font-bold text-ink"> 完成上游后，被阻塞的下游会自动变 ready</span>。
          这是 Task 比 TodoWrite 多出来的核心能力。
        </p>

        {/* ─── 主体两栏 ─── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左：任务卡列表 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                  task list · auth-system
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-mono text-[11px] text-ink/65">
                    {completedCount} / {TASKS.length} 完成
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[10px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                  >
                    <RefreshCw className="w-3 h-3" strokeWidth={2.5} />
                    重置
                  </button>
                </div>
              </div>

              <ul className="space-y-3">
                {TASKS.map((t) => {
                  const st = states[t.id];
                  return (
                    <li
                      key={t.id}
                      className={`border-2 border-ink rounded-2xl px-4 py-3.5 transition-all duration-300 ease-spring ${
                        st === "completed"
                          ? "bg-butter/30 opacity-75"
                          : st === "in_progress"
                          ? "bg-coral text-white shadow-stamp-lg"
                          : st === "ready"
                          ? "bg-cream shadow-stamp"
                          : "bg-ink/[0.04] border-dashed opacity-65"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* 编号圆 */}
                        <span
                          className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[11px] font-bold"
                          style={{
                            background: st === "completed" ? "#241C15" : t.color,
                            color:
                              st === "completed" ? "#FBEFE3" : t.textOnFill,
                          }}
                        >
                          {st === "completed" ? (
                            <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                          ) : (
                            t.id
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-display font-extrabold text-[15.5px] leading-tight ${
                              st === "in_progress" ? "text-white" : "text-ink"
                            } ${st === "completed" ? "line-through decoration-2" : ""}`}
                          >
                            {t.title}
                          </div>
                          <div
                            className={`font-sans text-[12.5px] mt-0.5 ${
                              st === "in_progress" ? "text-white/85" : "text-ink/65"
                            }`}
                          >
                            {t.desc}
                            {t.deps.length > 0 && (
                              <span className="ml-2 font-mono text-[11px] opacity-70">
                                · deps: {t.deps.join(",")}
                              </span>
                            )}
                          </div>
                        </div>
                        <StateChip state={st} />
                        {st === "ready" && (
                          <button
                            type="button"
                            onClick={() => toggleStart(t.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-ink text-cream rounded-full font-mono text-[10px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-200 ease-spring"
                          >
                            <Play className="w-3 h-3" strokeWidth={3} />
                            开始
                          </button>
                        )}
                        {st === "in_progress" && (
                          <button
                            type="button"
                            onClick={() => completeTask(t.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-ink rounded-full font-mono text-[10px] tracking-[0.18em] uppercase border-2 border-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-200 ease-spring"
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                            完成
                          </button>
                        )}
                        {st === "blocked" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-cream text-ink/45 rounded-full font-mono text-[10px] tracking-[0.18em] uppercase border-2 border-dashed border-ink/35">
                            <Lock className="w-3 h-3" strokeWidth={2.5} />
                            阻塞
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* 右：拓扑图 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
                依赖拓扑
              </div>
              <svg viewBox="0 0 460 320" className="w-full">
                {/* 箭头：根据上下游状态变样式 */}
                {TASKS.flatMap((t) =>
                  t.deps.map((depId) => {
                    const fromTask = TASKS.find((x) => x.id === depId)!;
                    const fromState = states[depId];
                    const isActive = fromState === "completed";
                    const x1 = fromTask.pos.x;
                    const y1 = fromTask.pos.y;
                    const x2 = t.pos.x;
                    const y2 = t.pos.y;
                    // 用直线（短路径）
                    return (
                      <g key={`${depId}-${t.id}`}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#241C15"
                          strokeWidth={isActive ? 2.5 : 1.8}
                          strokeDasharray={isActive ? undefined : "5 4"}
                          opacity={isActive ? 1 : 0.4}
                        />
                        {/* 箭头头：在 75% 位置 */}
                        <ArrowHead
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          color={isActive ? "#241C15" : "#241C15"}
                          opacity={isActive ? 1 : 0.4}
                        />
                      </g>
                    );
                  }),
                )}

                {/* 节点 */}
                {TASKS.map((t) => {
                  const st = states[t.id];
                  return (
                    <g key={t.id} transform={`translate(${t.pos.x},${t.pos.y})`}>
                      {/* 阴影底 */}
                      <circle cx="3" cy="3" r="32" fill="#241C15" opacity="0.85" />
                      {/* 节点圆 */}
                      <circle
                        cx="0"
                        cy="0"
                        r="32"
                        fill={st === "completed" ? "#241C15" : t.color}
                        stroke="#241C15"
                        strokeWidth="2.5"
                        opacity={st === "blocked" ? 0.45 : 1}
                      />
                      {/* 编号 */}
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="13"
                        fontWeight="800"
                        fill={st === "completed" ? "#F4D35E" : t.textOnFill}
                      >
                        {st === "completed" ? "✓" : t.id}
                      </text>
                      {/* 状态小标 */}
                      <g transform="translate(0,52)">
                        <rect
                          x="-32"
                          y="-9"
                          width="64"
                          height="18"
                          rx="9"
                          fill="#FBEFE3"
                          stroke="#241C15"
                          strokeWidth="1.5"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontFamily="Geist Mono, monospace"
                          fontSize="8.5"
                          fontWeight="700"
                          letterSpacing="1.3"
                          fill="#241C15"
                        >
                          {st.toUpperCase()}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              <div className="mt-3 pt-3 border-t-2 border-dashed border-ink/20 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <LegendDot color="#F4D35E" label="ready" />
                <LegendDot color="#E07A5F" label="in_progress" />
                <LegendDot color="#241C15" label="completed" textOn="#FBEFE3" />
                <LegendDot
                  color="#FBEFE3"
                  label="blocked"
                  borderDashed
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── 收尾对照 ─── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp p-5">
            <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-2">
              换成 TodoWrite 写
            </div>
            <p className="font-sans text-[14px] leading-[1.7] text-ink/80">
              得手动维护「T2 是否能开始」—— 看着 T1 标 completed，
              手动把 T2 从 pending 拖到 in_progress。
              <span className="text-coral font-bold"> 一旦遗漏一次，下游就空转</span>。
            </p>
          </div>
          <div className="bg-butter border-2 border-ink rounded-2xl shadow-stamp p-5">
            <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/65 mb-2">
              换成 Task 写
            </div>
            <p className="font-sans text-[14px] leading-[1.7] text-ink/85">
              <span className="font-mono">addBlockedBy</span> 写一次，
              系统帮你算「谁现在可以做、谁在等」。
              <span className="font-bold"> Agent 只挑 ready 的做，不会瞎跑</span>。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StateChip: React.FC<{ state: TaskState }> = ({ state }) => {
  if (state !== "completed") return null;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-ink text-cream rounded-full font-mono text-[10px] tracking-[0.18em] uppercase">
      <Check className="w-3 h-3" strokeWidth={3.5} />
      done
    </span>
  );
};

const ArrowHead: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  opacity: number;
}> = ({ x1, y1, x2, y2, color, opacity }) => {
  // 在到达节点前 38px 处画一个三角
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const r = 38; // 跟 circle r=32 + 缓冲对齐
  const px = x2 - (dx / len) * r;
  const py = y2 - (dy / len) * r;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <g transform={`translate(${px},${py}) rotate(${angle})`} opacity={opacity}>
      <path d="M -6 -4 L 0 0 L -6 4 Z" fill={color} />
    </g>
  );
};

const LegendDot: React.FC<{
  color: string;
  label: string;
  textOn?: string;
  borderDashed?: boolean;
}> = ({ color, label, borderDashed }) => (
  <div className="flex items-center gap-1.5 text-ink/70">
    <span
      className="w-3 h-3 rounded-full border-2 border-ink"
      style={{
        background: color,
        borderStyle: borderDashed ? "dashed" : "solid",
      }}
    />
    <span>{label}</span>
  </div>
);

export default SectionDepGraph;
