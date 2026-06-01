/**
 * SectionTodoWrite · TodoWrite 详解
 *
 * 主交互（L2 单步 trace）：
 *   - 6 步走完一个清单的生命周期：创建 → 进入第 1 项 → 完成 → 进入第 2 项 → 全量更新 → 收尾
 *   - 每步左侧画清单状态，右侧解释「这一步发生了什么」+ 当前在演示哪个特征
 *
 * 4 个特征都通过 trace 步骤体现：
 *   会话级别（开场即说，关闭就没）/ 扁平结构（清单平铺）/ 全量更新（每次发完整清单）/ 单 Agent 使用
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Circle, Clock, Check } from "lucide-react";

type Status = "pending" | "in_progress" | "completed";

type StepFrame = {
  caption: string;
  feature: string;
  featureTone: string;
  explain: string;
  items: { text: string; status: Status }[];
  payload?: string;
};

const FRAMES: StepFrame[] = [
  {
    caption: "Step 0 · 进入会话，Agent 决定先列清单",
    feature: "会话级别",
    featureTone: "bg-butter text-ink",
    explain:
      "用户喊出 /daily-brief。Agent 知道任务长、容易跳步，第一件事就是调 TodoWrite 把整套步骤先写下来。这份清单只活在当前会话里，关掉终端就没。",
    items: [
      { text: "查日历未来 3 天", status: "pending" },
      { text: "汇总未读邮件", status: "pending" },
      { text: "扫 Git 昨日活动", status: "pending" },
      { text: "生成趋势分析", status: "pending" },
      { text: "起草日报", status: "pending" },
    ],
    payload: 'TodoWrite({ todos: [...5 items, all pending] })',
  },
  {
    caption: "Step 1 · 标第 1 项 in_progress，开干",
    feature: "扁平结构",
    featureTone: "bg-coral text-white",
    explain:
      "清单里全是平级的条目 —— 可以标 high / medium / low 优先级，但表达不了「第 2 项依赖第 1 项」。这种关系，TodoWrite 写不下。",
    items: [
      { text: "查日历未来 3 天", status: "in_progress" },
      { text: "汇总未读邮件", status: "pending" },
      { text: "扫 Git 昨日活动", status: "pending" },
      { text: "生成趋势分析", status: "pending" },
      { text: "起草日报", status: "pending" },
    ],
    payload: 'TodoWrite({ todos: [item0:in_progress, ...4 pending] })',
  },
  {
    caption: "Step 2 · 第 1 项干完，更新清单",
    feature: "全量更新",
    featureTone: "bg-teal text-white",
    explain:
      "想把第 1 项标成 completed？得把整份清单重发一次。没有「只改第 N 条」的增量操作 —— 清单越长，每次更新越贵。",
    items: [
      { text: "查日历未来 3 天", status: "completed" },
      { text: "汇总未读邮件", status: "in_progress" },
      { text: "扫 Git 昨日活动", status: "pending" },
      { text: "生成趋势分析", status: "pending" },
      { text: "起草日报", status: "pending" },
    ],
    payload: 'TodoWrite({ todos: [item0:DONE, item1:in_progress, ...] })',
  },
  {
    caption: "Step 3 · 系统回包附带提醒",
    feature: "防遗忘机制",
    featureTone: "bg-ink text-cream",
    explain:
      "TodoWrite 的返回里，系统自动塞一句「继续处理清单上的下一个任务」。这就是 Claude Code 给 Agent 的「肩膀拍一下」—— 让它在长流程里别溜号。",
    items: [
      { text: "查日历未来 3 天", status: "completed" },
      { text: "汇总未读邮件", status: "in_progress" },
      { text: "扫 Git 昨日活动", status: "pending" },
      { text: "生成趋势分析", status: "pending" },
      { text: "起草日报", status: "pending" },
    ],
    payload: '← "Reminder: continue with the next task in your list."',
  },
  {
    caption: "Step 4 · Agent 派子 Agent 并行干活",
    feature: "单 Agent 使用",
    featureTone: "bg-pop text-white",
    explain:
      "如果主 AI 又派了一个「分身」去干活（SubAgent，另有一篇讲），主清单和分身各自的便利贴互不相通 —— 各记各的，谁也看不到谁。",
    items: [
      { text: "查日历未来 3 天", status: "completed" },
      { text: "汇总未读邮件", status: "in_progress" },
      { text: "扫 Git 昨日活动", status: "pending" },
      { text: "生成趋势分析", status: "pending" },
      { text: "起草日报", status: "pending" },
    ],
    payload: 'subagent: TodoWrite({ todos: [...own list...] })  ← 互不可见',
  },
  {
    caption: "Step 5 · 全部完成 ✓",
    feature: "全量发完即终结",
    featureTone: "bg-butter text-ink",
    explain:
      "5 项全标 completed，任务收尾。下次新会话再喊 /daily-brief，又得从 Step 0 重列一遍 —— 因为 TodoWrite 不写文件、不存数据库，纯粹靠上下文活。",
    items: [
      { text: "查日历未来 3 天", status: "completed" },
      { text: "汇总未读邮件", status: "completed" },
      { text: "扫 Git 昨日活动", status: "completed" },
      { text: "生成趋势分析", status: "completed" },
      { text: "起草日报", status: "completed" },
    ],
    payload: 'TodoWrite({ todos: [all DONE] }) · session ends → list gone',
  },
];

const SectionTodoWrite: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const frame = FRAMES[cursor];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Tool A · TodoWrite</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          TodoWrite：
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">贴在显示器旁的便利贴</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[780px]">
          TodoWrite 是 Claude Code 最早的 TODO 工具。机制直接：Agent 创建一份清单，
          每条三种状态 —— <span className="font-mono text-[14px]">pending → in_progress → completed</span>。
          下面 6 步走一遍它的生命周期，每一步也会带出它的一个关键特征。
        </p>

        {/* ─── 步数 + 控制 ─── */}
        <div className="mt-12 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {FRAMES.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setCursor(i)}
                className={`w-8 h-8 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring ${
                  i === cursor
                    ? "bg-ink text-cream shadow-stamp"
                    : i < cursor
                    ? "bg-butter text-ink shadow-stamp"
                    : "bg-cream text-ink/55"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCursor(Math.max(0, cursor - 1))}
              disabled={cursor === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
              上一步
            </button>
            <button
              type="button"
              onClick={() => setCursor(0)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              aria-label="重置"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => setCursor(Math.min(FRAMES.length - 1, cursor + 1))}
              disabled={cursor === FRAMES.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-30 disabled:cursor-not-allowed"
            >
              下一步
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ─── 主体 ─── */}
        <div key={cursor} className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-up">
          {/* 左：清单可视化 */}
          <div className="lg:col-span-6">
            <div className="card-stamp p-6 lg:p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                  /daily-brief · checklist
                </div>
                <div className="font-mono text-[10.5px] text-ink/55">
                  Step {cursor} / {FRAMES.length - 1}
                </div>
              </div>

              <ul className="space-y-2.5">
                {frame.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 px-3.5 py-2.5 border-2 border-ink rounded-xl transition-all duration-300 ease-spring ${
                      item.status === "completed"
                        ? "bg-butter/40 text-ink/55"
                        : item.status === "in_progress"
                        ? "bg-coral text-white shadow-stamp"
                        : "bg-cream text-ink/80"
                    }`}
                  >
                    <StatusIcon status={item.status} />
                    <span className="font-mono text-[11px] opacity-65 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-sans text-[14px] flex-1 ${
                        item.status === "completed" ? "line-through decoration-2" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                    <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase opacity-65">
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>

              {/* payload */}
              {frame.payload && (
                <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20">
                  <div className="font-mono text-[10px] text-ink/55 tracking-[0.18em] uppercase mb-2">
                    底层调用
                  </div>
                  <div className="bg-ink text-cream rounded-lg border-2 border-ink p-3 font-mono text-[11.5px] leading-[1.55] overflow-x-auto">
                    {frame.payload}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右：解释 + 特征标签 */}
          <div className="lg:col-span-6">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-7 h-full flex flex-col">
              <div
                className={`inline-flex items-center self-start gap-2 px-3 py-1.5 ${frame.featureTone} border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.18em] uppercase mb-4`}
              >
                <span className="opacity-70">特征</span>
                <span className="font-bold">{frame.feature}</span>
              </div>
              <div className="font-display font-extrabold text-[24px] text-ink leading-[1.2] mb-4">
                {frame.caption}
              </div>
              <p className="font-sans text-[15px] leading-[1.75] text-ink/85 flex-1">
                {frame.explain}
              </p>

              {/* 进度条 */}
              <div className="mt-6 pt-5 border-t-2 border-dashed border-ink/20">
                <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ink transition-all duration-400 ease-spring"
                    style={{ width: `${((cursor + 1) / FRAMES.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-ink/55 mt-1.5 tracking-[0.18em] uppercase">
                  <span>开会话</span>
                  <span>清单消亡</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 个特征汇总 */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatTile color="bg-butter text-ink" tag="01" label="会话级别" hint="关掉就没" />
          <FeatTile color="bg-coral text-white" tag="02" label="扁平结构" hint="表达不了依赖" />
          <FeatTile color="bg-teal text-white" tag="03" label="全量更新" hint="清单越长越贵" />
          <FeatTile color="bg-pop text-white" tag="04" label="单 Agent" hint="跨实例不可见" />
        </div>
      </div>
    </section>
  );
};

const StatusIcon: React.FC<{ status: Status }> = ({ status }) => {
  if (status === "completed") {
    return (
      <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-ink bg-ink flex items-center justify-center">
        <Check className="w-3 h-3 text-cream" strokeWidth={3.5} />
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-ink bg-white flex items-center justify-center">
        <Clock className="w-3 h-3 text-ink" strokeWidth={2.8} />
      </span>
    );
  }
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-ink bg-white flex items-center justify-center">
      <Circle className="w-2 h-2 text-ink/40 fill-ink/15" strokeWidth={0} />
    </span>
  );
};

const FeatTile: React.FC<{ color: string; tag: string; label: string; hint: string }> = ({
  color,
  tag,
  label,
  hint,
}) => (
  <div className={`${color} border-2 border-ink rounded-2xl shadow-stamp p-4`}>
    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase opacity-75 mb-1">
      F{tag}
    </div>
    <div className="font-display font-extrabold text-[18px] leading-tight">
      {label}
    </div>
    <div className="font-sans text-[12px] opacity-85 mt-1">{hint}</div>
  </div>
);

export default SectionTodoWrite;
