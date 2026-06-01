/**
 * SectionThreeRoles · TODO 的三大作用
 *
 * 主交互（L2 pill 切换）：防遗忘 / 给用户看进度 / 支撑复杂编排
 *   - 每个角色一张配色卡，左侧定义 + 右侧 mini demo
 *   - 防遗忘那一张专门把「Claude Code 在 TodoWrite 返回结果里附带『继续处理下一个任务』提醒」这条细节点出
 *
 * 跟相邻 SectionForgetCase（slider）拉开。
 */
import React, { useState } from "react";
import { Bell, Eye, GitBranch } from "lucide-react";

type RoleKey = "remind" | "progress" | "orchestrate";

const ROLES: Record<
  RoleKey,
  {
    num: string;
    label: string;
    en: string;
    icon: React.ReactNode;
    tone: string;
    headline: string;
    body: string;
    detailTitle: string;
    detail: React.ReactNode;
  }
> = {
  remind: {
    num: "01",
    label: "防遗忘",
    en: "Anti-amnesia",
    icon: <Bell className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-butter text-ink",
    headline: "让 Agent 在每一步前回顾「我到哪了」",
    body: "Agent 在长任务中容易丢步骤。一份可见的任务清单，让它每次行动前先看一眼自己「现在该干什么」。",
    detailTitle: "Claude Code 的小心思",
    detail: (
      <p>
        每次 <span className="font-mono text-pop font-bold">TodoWrite</span> 工具执行完，
        系统会在返回结果里附带一条提醒 ——
        <span className="bg-butter text-ink font-bold mx-1 px-1.5 rounded">
          「继续处理清单上的下一个任务」
        </span>
        。相当于每一步都拍一下 Agent 的肩膀，免得它溜号。
      </p>
    ),
  },
  progress: {
    num: "02",
    label: "给用户看进度",
    en: "Visibility",
    icon: <Eye className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-coral text-white",
    headline: "让你知道什么时候该介入、什么时候可以放心等",
    body: "把大任务交给 Agent 闷头干，你只能盯着滚动的输出干等。有了清单，每一步的状态实时可见。",
    detailTitle: "你能看到它干到哪了",
    detail: (
      <p>
        看到 <span className="font-mono">[6/18]</span> 就知道还要 12 步，
        看到 <span className="font-mono">in_progress: 「跑测试」</span> 就知道当下在哪儿。
        <span className="font-bold"> 该端杯咖啡的端咖啡，该介入的及时介入</span> ——
        进度可见，焦虑消失。
      </p>
    ),
  },
  orchestrate: {
    num: "03",
    label: "步骤多、还要讲清谁先谁后",
    en: "Orchestration",
    icon: <GitBranch className="w-4 h-4" strokeWidth={2.4} />,
    tone: "bg-teal text-white",
    headline: "多步骤 + 先后依赖 + 多 Agent 协作，得有结构",
    body: "「想到哪做到哪」对付不了真实项目。TODO 提供了一种结构化的方式来拆解任务、排顺序、追状态。",
    detailTitle: "为什么不能拍脑袋",
    detail: (
      <p>
        当任务涉及 <span className="font-bold">多步骤 + 有依赖 + 跨 Agent</span> 协作时，
        Agent 必须知道「谁阻塞谁」「哪些可以并行」。
        没有 TODO 结构 → 任务图变一堆碎纸条 → Agent 凭直觉做选择 → 翻车。
      </p>
    ),
  },
};

const ORDER: RoleKey[] = ["remind", "progress", "orchestrate"];

const SectionThreeRoles: React.FC = () => {
  const [active, setActive] = useState<RoleKey>("remind");
  const r = ROLES[active];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">What for · 三大作用</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          TODO 在 Agent 里
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">到底干嘛用</span>
          </span>
          ？
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          三件事：让 Agent 别忘、让你能看、让复杂任务转得起来。
          点下面任一标签，看每一种作用的具体形态。
        </p>

        {/* pill 切换 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {ORDER.map((key) => {
            const item = ROLES[key];
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
                <span>{item.num}.{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 主体（key 强制重渲染） */}
        <div key={active} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-up">
          {/* 左：作用主卡 */}
          <div className="lg:col-span-7">
            <div className={`${r.tone} border-2 border-ink rounded-3xl shadow-stamp-lg p-8`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-75">
                  作用 {r.num}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-65">
                  · {r.en}
                </span>
              </div>
              <div className="font-display font-extrabold text-[42px] leading-[1.05] mb-4">
                {r.label}
              </div>
              <p className="font-display font-bold text-[20px] leading-[1.4] opacity-95 mb-4">
                {r.headline}
              </p>
              <p className="font-sans text-[15px] leading-[1.7] opacity-90">{r.body}</p>
            </div>
          </div>

          {/* 右：细节卡 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-7 h-full flex flex-col">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
                细节 · {r.detailTitle}
              </div>
              <div className="font-sans text-[14.5px] leading-[1.75] text-ink/85 flex-1">
                {r.detail}
              </div>

              {/* 角色专属 mini demo */}
              {active === "remind" && (
                <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/20">
                  <div className="font-mono text-[10px] text-ink/55 tracking-[0.18em] uppercase mb-2">
                    返回结果片段
                  </div>
                  <div className="bg-ink text-cream rounded-xl border-2 border-ink p-3 font-mono text-[11.5px] leading-[1.6]">
                    <div className="text-butter">{"// TodoWrite returned"}</div>
                    <div className="opacity-90">✓ Step 5 → completed</div>
                    <div className="opacity-90">→ Step 6 → in_progress</div>
                    <div className="mt-2 text-pop">
                      → Reminder: continue with the next task in your list.
                    </div>
                  </div>
                </div>
              )}

              {active === "progress" && (
                <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/20">
                  <div className="font-mono text-[10px] text-ink/55 tracking-[0.18em] uppercase mb-2">
                    用户看到的清单
                  </div>
                  <div className="space-y-1.5 font-mono text-[12px]">
                    {[
                      { s: "✓", t: "查日历未来 3 天", c: "text-ink/45" },
                      { s: "✓", t: "汇总未读邮件", c: "text-ink/45" },
                      { s: "▸", t: "扫 Git 昨日活动", c: "text-coral font-bold" },
                      { s: "○", t: "生成趋势分析", c: "text-ink/65" },
                      { s: "○", t: "起草日报", c: "text-ink/65" },
                    ].map((row, i) => (
                      <div key={i} className={`flex gap-2.5 ${row.c}`}>
                        <span className="w-3">{row.s}</span>
                        <span>{row.t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-2 bg-ink/10 rounded-full overflow-hidden">
                    <div className="h-full bg-coral" style={{ width: "40%" }} />
                  </div>
                </div>
              )}

              {active === "orchestrate" && (
                <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/20">
                  <div className="font-mono text-[10px] text-ink/55 tracking-[0.18em] uppercase mb-2">
                    任务依赖图（简版）
                  </div>
                  <svg viewBox="0 0 220 110" className="w-full">
                    {[
                      { id: "A", x: 30, y: 30, color: "#F4D35E" },
                      { id: "B", x: 110, y: 30, color: "#E07A5F" },
                      { id: "C", x: 110, y: 80, color: "#1B4B5A" },
                      { id: "D", x: 190, y: 55, color: "#FF4D74" },
                    ].map((n) => (
                      <g key={n.id}>
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r="14"
                          fill={n.color}
                          stroke="#241C15"
                          strokeWidth="2"
                        />
                        <text
                          x={n.x}
                          y={n.y + 4}
                          textAnchor="middle"
                          fontFamily="Geist Mono, monospace"
                          fontSize="11"
                          fontWeight="700"
                          fill={n.id === "A" ? "#241C15" : "#FBEFE3"}
                        >
                          {n.id}
                        </text>
                      </g>
                    ))}
                    {/* arrows */}
                    {[
                      { x1: 44, y1: 30, x2: 96, y2: 30 },
                      { x1: 44, y1: 38, x2: 96, y2: 75 },
                      { x1: 124, y1: 30, x2: 176, y2: 50 },
                      { x1: 124, y1: 80, x2: 176, y2: 60 },
                    ].map((l, i) => (
                      <g key={i}>
                        <line
                          x1={l.x1}
                          y1={l.y1}
                          x2={l.x2}
                          y2={l.y2}
                          stroke="#241C15"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      </g>
                    ))}
                  </svg>
                  <p className="font-sans text-[12.5px] text-ink/70 leading-snug mt-2">
                    A → B, A → C，B 和 C 都完了才解锁 D。靠 TODO 结构表达，靠 Agent 自己脑子记不住。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 三角色全览 */}
        <div className="mt-12">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-3">
            一图全览
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-ink rounded-3xl overflow-hidden shadow-stamp-lg bg-cream">
            {ORDER.map((key, idx) => {
              const item = ROLES[key];
              return (
                <div
                  key={key}
                  className={`p-5 ${idx > 0 ? "md:border-l-2 border-ink" : ""} ${idx > 0 ? "border-t-2 md:border-t-0 border-ink" : ""}`}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${item.tone} border-2 border-ink rounded-full font-mono text-[10.5px] tracking-[0.18em] uppercase mb-3`}
                  >
                    {item.icon} {item.label}
                  </div>
                  <div className="font-display font-bold text-[16px] text-ink mb-1.5 leading-tight">
                    {item.headline}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThreeRoles;
