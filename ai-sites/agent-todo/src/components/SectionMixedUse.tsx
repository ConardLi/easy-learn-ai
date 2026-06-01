/**
 * SectionMixedUse · 混用最佳实践 + 收尾硬规则
 *
 * 主交互（L3 勾选组合 + L2 hover 联动）：
 *   - 用户勾选「项目层 / Task 层 / Subtask 层 / 动作层」想用哪个工具
 *   - 4 层的工具推荐 + 后果联动显示
 *
 * 收尾硬规则 callout：不是鸡汤，是「大的靠 Task 管，小的靠 TodoWrite 盯」+「Step 0 强制列清单」。
 *
 * 跟相邻 SectionCompare（pill + 决策树）拉开。
 */
import React, { useMemo, useState } from "react";
import { FolderTree, BookText, AlertOctagon } from "lucide-react";

type Tool = "task" | "todo";

type Layer = {
  id: string;
  num: string;
  name: string;
  scope: string;
  example: string;
  rec: Tool;
  recHint: string;
  wrong: string;
};

const LAYERS: Layer[] = [
  {
    id: "project",
    num: "L1",
    name: "项目层",
    scope: "整个 epic / 大功能",
    example: "认证系统全部 · 计费重构 · 数据迁移",
    rec: "task",
    recHint: "跨好几天 / 跨会话 → Task",
    wrong: "用 TodoWrite → 第二次进会话清单没了，得重新规划。",
  },
  {
    id: "task",
    num: "L2",
    name: "Task 层",
    scope: "epic 拆出来的可交付单元",
    example: "设计 Schema · 写 API · 写前端 · 集成测试",
    rec: "task",
    recHint: "有先后依赖 → Task",
    wrong: "用 TodoWrite → 依赖靠人脑维护，一漏就空转。",
  },
  {
    id: "subtask",
    num: "L3",
    name: "Subtask 层",
    scope: "Task 内的子任务",
    example: "API 拆成：POST /login + POST /logout + 测试",
    rec: "task",
    recHint: "想跨会话追进度 → Task",
    wrong: "用 TodoWrite → 当下能看，第二天打开不见了。",
  },
  {
    id: "action",
    num: "L4",
    name: "动作层",
    scope: "执行某个 task 时的具体步骤",
    example: "写一个文件 · 跑一次测试 · 拉一次 PR",
    rec: "todo",
    recHint: "一次会话内的 checklist → TodoWrite",
    wrong: "用 Task → 杀鸡用牛刀，每条都写 ~/.claude/tasks/ 太重。",
  },
];

const SectionMixedUse: React.FC = () => {
  const [picks, setPicks] = useState<Record<string, Tool>>({
    project: "task",
    task: "task",
    subtask: "todo",
    action: "todo",
  });

  const wrongCount = useMemo(
    () => LAYERS.filter((l) => picks[l.id] !== l.rec).length,
    [picks],
  );

  function pick(layerId: string, tool: Tool) {
    setPicks((prev) => ({ ...prev, [layerId]: tool }));
  }

  function reset() {
    setPicks({ project: "task", task: "task", subtask: "todo", action: "todo" });
  }

  function bestPractice() {
    setPicks({ project: "task", task: "task", subtask: "task", action: "todo" });
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">08</span>
          <span className="section-anchor-label">Mix · 怎么混用</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[860px]">
          大的靠 Task 管，
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">小的靠 TodoWrite 盯</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          实际项目里两者经常混用。把任务按粒度分 4 层 ——
          每层各自有更合适的工具。下面这张表你可以自己点试试看，
          <span className="font-bold text-ink"> 选错了会标红</span>。
        </p>

        {/* ─── 选型矩阵 ─── */}
        <div className="mt-10 card-stamp p-6 lg:p-7">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
              四层 · 每层选一个工具
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={bestPractice}
                className="px-3 py-1.5 bg-butter text-ink border-2 border-ink rounded-full font-mono text-[10.5px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-200 ease-spring"
              >
                看推荐组合
              </button>
              <button
                type="button"
                onClick={reset}
                className="px-3 py-1.5 bg-cream text-ink border-2 border-ink rounded-full font-mono text-[10.5px] tracking-[0.18em] uppercase shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-200 ease-spring"
              >
                复位
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {LAYERS.map((l) => {
              const picked = picks[l.id];
              const isWrong = picked !== l.rec;
              return (
                <div
                  key={l.id}
                  className={`grid grid-cols-12 gap-4 items-stretch border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300 ease-spring ${
                    isWrong ? "bg-coral/10 shadow-stamp" : "bg-white shadow-stamp"
                  }`}
                >
                  {/* 层标 */}
                  <div className="col-span-12 md:col-span-3 p-4 bg-cream border-r-2 border-ink/15">
                    <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1">
                      {l.num}
                    </div>
                    <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                      {l.name}
                    </div>
                    <div className="font-sans text-[12.5px] text-ink/70 mt-1 leading-snug">
                      {l.scope}
                    </div>
                  </div>

                  {/* 举例 */}
                  <div className="col-span-12 md:col-span-4 p-4 md:border-r-2 border-ink/15">
                    <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/55 mb-1">
                      举例
                    </div>
                    <div className="font-sans text-[13.5px] text-ink/85 leading-snug">
                      {l.example}
                    </div>
                  </div>

                  {/* 工具选择 */}
                  <div className="col-span-8 md:col-span-3 p-4 md:border-r-2 border-ink/15 flex items-center gap-2">
                    <ToolPill
                      tool="task"
                      label="Task"
                      picked={picked === "task"}
                      onPick={() => pick(l.id, "task")}
                    />
                    <ToolPill
                      tool="todo"
                      label="TodoWrite"
                      picked={picked === "todo"}
                      onPick={() => pick(l.id, "todo")}
                    />
                  </div>

                  {/* 反馈 */}
                  <div className="col-span-4 md:col-span-2 p-4 flex items-center">
                    {isWrong ? (
                      <div className="text-coral font-mono text-[11px] tracking-[0.16em] uppercase font-bold">
                        ⚠ 选错了
                      </div>
                    ) : (
                      <div className="text-teal font-mono text-[11px] tracking-[0.16em] uppercase font-bold">
                        ✓ 合理
                      </div>
                    )}
                  </div>

                  {/* 错的时候铺一行解释 */}
                  {isWrong && (
                    <div className="col-span-12 px-4 py-3 bg-coral/15 border-t-2 border-dashed border-coral/40 font-sans text-[13px] text-ink/85 leading-snug">
                      <span className="font-bold">{l.recHint} · </span>
                      {l.wrong}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20 flex items-center justify-between flex-wrap gap-2">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55">
              当前选错：
              <span
                className={`font-bold ml-1 ${
                  wrongCount === 0 ? "text-teal" : "text-coral"
                }`}
              >
                {wrongCount} / 4
              </span>
            </div>
            <div className="font-serif italic text-[13px] text-ink/70">
              推荐组合：L1 / L2 / L3 = Task，L4 = TodoWrite。
            </div>
          </div>
        </div>

        {/* ─── 收尾硬规则 ─── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-7 lg:p-8">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-butter mb-3 flex items-center gap-2">
              <AlertOctagon className="w-3.5 h-3.5" strokeWidth={2.5} />
              一条硬规则 · 收尾
            </div>
            <p className="font-display font-extrabold text-[28px] lg:text-[32px] leading-[1.2] mb-4">
              超过 5 步 + 之后还得接着干 ——
              <br className="hidden md:block" />
              <span className="text-butter">
                把第 0 步留给 TodoWrite 或 Task，先把清单列出来再开干
              </span>
              。
            </p>
            <p className="font-sans text-[14.5px] leading-[1.7] text-cream/80">
              Mario 的 /daily-brief 加了 Step 0 就再没跳过。
              不是可有可无。步骤一多，不先列清单就很容易漏。
            </p>
          </div>

          <div className="md:col-span-5 bg-butter text-ink border-2 border-ink rounded-3xl shadow-stamp p-6">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/65 mb-3">
              一句话记住
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <FolderTree className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                <div>
                  <div className="font-display font-extrabold text-[16px] leading-tight">
                    Task 管「事」
                  </div>
                  <div className="font-sans text-[13px] text-ink/75 leading-snug mt-0.5">
                    事的全貌、事的依赖、事跨会话的状态
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <BookText className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                <div>
                  <div className="font-display font-extrabold text-[16px] leading-tight">
                    TodoWrite 管「步」
                  </div>
                  <div className="font-sans text-[13px] text-ink/75 leading-snug mt-0.5">
                    单次会话内的步、防当下溜号、给用户实时进度
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 页脚锚 */}
        <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/20 flex items-center justify-between flex-wrap gap-2">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
            END · agent todolist handbook
          </div>
          <a
            href="#top"
            className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink hover:text-coral underline underline-offset-4 decoration-2"
          >
            回到顶部 ↑
          </a>
        </div>
      </div>
    </section>
  );
};

const ToolPill: React.FC<{
  tool: Tool;
  label: string;
  picked: boolean;
  onPick: () => void;
}> = ({ tool, label, picked, onPick }) => {
  const tone =
    tool === "task"
      ? picked
        ? "bg-coral text-white"
        : "bg-white text-ink"
      : picked
      ? "bg-teal text-white"
      : "bg-white text-ink";
  return (
    <button
      type="button"
      onClick={onPick}
      className={`flex-1 px-3 py-1.5 border-2 border-ink rounded-full font-mono text-[11px] tracking-[0.16em] uppercase transition-all duration-200 ease-spring ${tone} ${
        picked
          ? "shadow-stamp translate-x-[-1px] translate-y-[-1px]"
          : "hover:bg-cream"
      }`}
    >
      {label}
    </button>
  );
};

export default SectionMixedUse;
