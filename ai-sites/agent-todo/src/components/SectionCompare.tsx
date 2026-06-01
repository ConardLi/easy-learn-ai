/**
 * SectionCompare · TodoWrite vs Task 八维对比 + 决策树
 *
 * 主交互（L2 before/after 切换 + L2 决策树点击）：
 *   - 顶部 pill：「全维度」/「我只关心 3 件事」 两种视图
 *   - 主体：左右两栏 TodoWrite vs Task 八维对比
 *   - 底部决策树：3 个问题点击 → 给推荐
 *
 * 跟相邻 SectionDepGraph（拖拽/勾选）拉开。
 */
import React, { useMemo, useState } from "react";
import { BookText, FolderTree, ArrowRight, CheckCircle2 } from "lucide-react";

type Dim = {
  label: string;
  todo: string;
  task: string;
  critical: boolean; // 是否「3 件事」之一
};

const DIMS: Dim[] = [
  { label: "数据存储", todo: "内存（上下文里）", task: "磁盘 ~/.claude/tasks/", critical: true },
  { label: "生命周期", todo: "当前会话", task: "跨会话持久化", critical: true },
  { label: "依赖管理", todo: "不支持", task: "支持 addBlockedBy", critical: true },
  { label: "多会话协作", todo: "不支持", task: "共享 Task List ID", critical: false },
  { label: "任务结构", todo: "扁平列表", task: "树状层级", critical: false },
  { label: "状态管理", todo: "全量覆盖", task: "增量更新（单任务）", critical: false },
  { label: "适合场景", todo: "单会话 / 短流程", task: "跨会话 / 复杂项目", critical: false },
  { label: "上手门槛", todo: "低", task: "稍高", critical: false },
];

type ViewMode = "all" | "critical";

type Branch = "task" | "todo" | "mixed" | null;

const SectionCompare: React.FC = () => {
  const [view, setView] = useState<ViewMode>("all");
  const visible = useMemo(
    () => (view === "all" ? DIMS : DIMS.filter((d) => d.critical)),
    [view],
  );

  // 决策树
  const [q1, setQ1] = useState<boolean | null>(null); // 跨会话？
  const [q2, setQ2] = useState<boolean | null>(null); // 有依赖？
  const [q3, setQ3] = useState<boolean | null>(null); // 多 Agent 并行？

  const branch: Branch = useMemo(() => {
    if (q1 === null) return null;
    if (q1 === false && q2 === false && q3 === false) return "todo";
    if (q1 === true && q2 === false && q3 === false) return "task";
    if (q1 === true || q2 === true || q3 === true) {
      // 任何一个 yes → 至少要 task；如果都 yes → 推荐混用
      if (q1 && q2 && q3) return "mixed";
      return "task";
    }
    return "todo";
  }, [q1, q2, q3]);

  function resetTree() {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">vs · 该用哪个</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          TodoWrite vs Task：
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">八个维度 · 一个判断</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          其实选择不复杂。
          <span className="font-bold text-ink"> 判断标准就一个：你的任务会不会跨会话？</span>
          不会 → TodoWrite。会 → Task。但具体维度差异还是值得看一眼。
        </p>

        {/* ─── 视图切换 ─── */}
        <div className="mt-10 flex flex-wrap gap-3 items-center">
          {[
            { id: "all" as const, label: "全维度（8）" },
            { id: "critical" as const, label: "我只关心 3 件事" },
          ].map((v) => {
            const isActive = view === v.id;
            return (
              <button
                type="button"
                key={v.id}
                onClick={() => setView(v.id)}
                className={`px-4 py-2 rounded-full border-2 border-ink font-mono text-[12px] tracking-[0.16em] uppercase transition-all duration-250 ease-spring ${
                  isActive
                    ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {/* ─── 对照表 ─── */}
        <div className="mt-7 border-2 border-ink rounded-3xl overflow-hidden shadow-stamp-lg bg-cream">
          {/* header */}
          <div className="grid grid-cols-12 bg-ink text-cream font-mono text-[11px] tracking-[0.18em] uppercase">
            <div className="col-span-3 px-5 py-3.5 border-r-2 border-cream/15">
              维度
            </div>
            <div className="col-span-4 px-5 py-3.5 border-r-2 border-cream/15 flex items-center gap-2">
              <BookText className="w-3.5 h-3.5" strokeWidth={2.5} />
              TodoWrite
            </div>
            <div className="col-span-5 px-5 py-3.5 flex items-center gap-2 text-butter">
              <FolderTree className="w-3.5 h-3.5" strokeWidth={2.5} />
              Task
            </div>
          </div>

          {/* rows */}
          {visible.map((d, i) => (
            <div
              key={d.label}
              className={`grid grid-cols-12 ${i % 2 === 0 ? "bg-cream" : "bg-white"} ${
                i < visible.length - 1 ? "border-b-2 border-ink/10" : ""
              }`}
            >
              <div className="col-span-3 px-5 py-3.5 border-r-2 border-ink/10 font-display font-bold text-[14px] text-ink flex items-center gap-2">
                {d.critical && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-pop"
                    title="关键维度"
                  />
                )}
                {d.label}
              </div>
              <div className="col-span-4 px-5 py-3.5 border-r-2 border-ink/10 font-sans text-[13.5px] text-ink/80 leading-snug">
                {d.todo}
              </div>
              <div className="col-span-5 px-5 py-3.5 font-sans text-[13.5px] text-ink leading-snug">
                {d.task}
              </div>
            </div>
          ))}
        </div>

        {/* ─── 决策树 ─── */}
        <div className="mt-12 card-stamp p-7 lg:p-9">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-2">
            决策树 · 3 个问题
          </div>
          <div className="font-display font-extrabold text-[26px] text-ink leading-tight mb-6">
            回答 3 个 Yes / No，告诉你选哪个。
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Question
              num="Q1"
              text="任务会跨会话吗？（关掉终端明天接着干）"
              answer={q1}
              onAnswer={setQ1}
            />
            <Question
              num="Q2"
              text="任务之间有先后依赖吗？（A 完了 B 才能开始）"
              answer={q2}
              onAnswer={setQ2}
            />
            <Question
              num="Q3"
              text="多个 Agent 实例并行干吗？（一个写后端、一个写前端）"
              answer={q3}
              onAnswer={setQ3}
            />
          </div>

          {/* 结论 */}
          <div className="mt-6">
            {branch === null && (
              <div className="bg-ink/[0.04] border-2 border-dashed border-ink/30 rounded-2xl p-5 font-mono text-[12.5px] text-ink/55 tracking-[0.05em]">
                选完 3 个问题后，这里告诉你推荐用哪个。
              </div>
            )}
            {branch === "todo" && (
              <Verdict
                tone="bg-butter text-ink"
                title="TodoWrite 就够了"
                detail="单次会话内的多步骤任务追踪，TodoWrite 干净利落。别把简单事搞复杂。"
              />
            )}
            {branch === "task" && (
              <Verdict
                tone="bg-coral text-white"
                title="用 Task"
                detail="跨会话 / 有依赖 / 多实例任何一个为真，TodoWrite 就撑不住了。换 Task。"
              />
            )}
            {branch === "mixed" && (
              <Verdict
                tone="bg-teal text-white"
                title="两者混用 · 见下一节"
                detail="项目级用 Task 管 task 和依赖；每个 Task 执行过程中，用 TodoWrite 追具体动作。大的靠 Task 管，小的靠 TodoWrite 盯。"
              />
            )}
            {branch !== null && (
              <button
                type="button"
                onClick={resetTree}
                className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55 hover:text-ink underline underline-offset-4 decoration-2"
              >
                重新选
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Question: React.FC<{
  num: string;
  text: string;
  answer: boolean | null;
  onAnswer: (v: boolean) => void;
}> = ({ num, text, answer, onAnswer }) => (
  <div
    className={`border-2 border-ink rounded-2xl p-4 transition-all duration-300 ease-spring ${
      answer !== null ? "bg-cream shadow-stamp" : "bg-white shadow-stamp"
    }`}
  >
    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1.5">
      {num}
    </div>
    <p className="font-sans text-[14px] leading-snug text-ink mb-3 min-h-[42px]">
      {text}
    </p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onAnswer(true)}
        className={`flex-1 px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-200 ease-spring ${
          answer === true
            ? "bg-ink text-cream shadow-stamp"
            : "bg-white text-ink hover:bg-butter/30"
        }`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onAnswer(false)}
        className={`flex-1 px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-200 ease-spring ${
          answer === false
            ? "bg-ink text-cream shadow-stamp"
            : "bg-white text-ink hover:bg-butter/30"
        }`}
      >
        No
      </button>
    </div>
  </div>
);

const Verdict: React.FC<{ tone: string; title: string; detail: string }> = ({
  tone,
  title,
  detail,
}) => (
  <div className={`${tone} border-2 border-ink rounded-2xl shadow-stamp-lg p-5 animate-enter-up`}>
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" strokeWidth={2.4} />
      <div>
        <div className="font-display font-extrabold text-[22px] leading-tight mb-1.5 flex items-center gap-2">
          推荐：{title}
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </div>
        <p className="font-sans text-[14.5px] leading-[1.65] opacity-95">{detail}</p>
      </div>
    </div>
  </div>
);

export default SectionCompare;
