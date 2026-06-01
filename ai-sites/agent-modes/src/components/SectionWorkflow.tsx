/**
 * Section 08 · 工作流组合
 *
 * 主交互（L3 拼装编辑器）：
 *   - 5 个任务阶段，每个阶段可选 Plan / Default / Auto
 *   - 上方实时显示「换挡时间线」
 *   - 下方两个预设：「保守流」「激进流」一键塞入
 *
 * 视觉锚：横向时间线 + 三色档位块（butter/coral/teal）+ 推荐流按钮
 * 跟前面所有 section 拉开 —— 这里是「拼出来」。
 */
import React, { useState } from "react";
import { Eye, ClipboardCheck, Zap, Sparkle } from "lucide-react";

type Mode = "plan" | "default" | "auto";

const MODE_META: Record<
  Mode,
  { label: string; color: string; textOn: string; icon: React.ReactNode }
> = {
  plan: {
    label: "Plan",
    color: "#F4D35E",
    textOn: "#241C15",
    icon: <Eye className="w-3.5 h-3.5" strokeWidth={2.4} />,
  },
  default: {
    label: "Default",
    color: "#E07A5F",
    textOn: "#FBEFE3",
    icon: <ClipboardCheck className="w-3.5 h-3.5" strokeWidth={2.4} />,
  },
  auto: {
    label: "Auto",
    color: "#1B4B5A",
    textOn: "#FBEFE3",
    icon: <Zap className="w-3.5 h-3.5" strokeWidth={2.4} />,
  },
};

type Phase = {
  key: string;
  label: string;
  hint: string;
  recommend: Mode;
  why: Record<Mode, string>;
};

const PHASES: Phase[] = [
  {
    key: "explore",
    label: "1 · 摸底代码库",
    hint: "Agent 第一次进项目，对结构没把握",
    recommend: "plan",
    why: {
      plan: "Plan 最合适 —— 让它先读、画 plan.md，你看完再决定下一步。",
      default: "可以，但读到一半弹审批很扰，效率不如 Plan。",
      auto: "太冒进 —— Agent 可能瞎改了你还没看的角落。",
    },
  },
  {
    key: "design",
    label: "2 · 出重构方案",
    hint: "决定怎么拆、改哪些文件、分几步",
    recommend: "plan",
    why: {
      plan: "Plan 出 Markdown 计划 → 方便你审 / 团队 review，错了改一份文档而非回滚 diff。",
      default: "Default 也行，但 Agent 边改边出方案，容易跑偏。",
      auto: "禁用 —— 方案没定就动手，回滚成本巨大。",
    },
  },
  {
    key: "bulk",
    label: "3 · 批量改 · 把握大的部分",
    hint: "重复性高、风险低、按方案推进",
    recommend: "auto",
    why: {
      plan: "Plan 不能写，过不了这一步。",
      default: "Default 可以但慢 —— 30 个相似文件每个都点一次，累。",
      auto: "Auto 不用你步步点确认；改 .env、rm、force push 这类仍会弹窗。",
    },
  },
  {
    key: "sensitive",
    label: "4 · 改敏感模块",
    hint: "鉴权 / 支付 / 数据迁移类",
    recommend: "default",
    why: {
      plan: "Plan 不能写。",
      default: "Default 安全可控 —— 每一步看 diff 点确认，符合敏感模块节奏。",
      auto: "出事代价大 —— 哪怕分类器拦着也不值得冒险。",
    },
  },
  {
    key: "review",
    label: "5 · 收尾 · git diff 整体 review",
    hint: "看一遍所有改动，跑测试，准备提 PR",
    recommend: "default",
    why: {
      plan: "Plan 不能跑测试。",
      default: "Default 是默认体感 —— 跑 test / lint 都要你点放行，正合适。",
      auto: "Auto 可以但容易跳过你想看的中间结果。",
    },
  },
];

const PRESETS: Record<string, Mode[]> = {
  classic: ["plan", "plan", "auto", "default", "default"],
  conservative: ["plan", "plan", "default", "default", "default"],
  yolo: ["plan", "default", "auto", "auto", "default"],
};

const SectionWorkflow: React.FC = () => {
  const [picks, setPicks] = useState<Mode[]>([
    "plan",
    "plan",
    "auto",
    "default",
    "default",
  ]);

  const setAt = (i: number, m: Mode) =>
    setPicks((p) => p.map((v, idx) => (idx === i ? m : v)));

  const goodCount = picks.filter(
    (m, i) => m === PHASES[i].recommend,
  ).length;

  return (
    <section className="relative bg-butter/15 border-t-2 border-ink px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-24 lg:pb-32">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">08</span>
          <span className="section-anchor-label">Workflow · 三档组合</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          像开车换挡 ——
          <br />
          一段路换{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">一次档</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          一个成熟工作流不是「一直挂 Auto」，也不是「全程 Default」。
          先 Plan 出方案，把握大的部分用 Auto 推，敏感模块换回 Default 逐步审，
          最后用 git diff 整体 review。
          <strong className="text-ink"> 别一直挂同一档 —— 摸底用 Plan，批量改用 Auto，敏感处换回 Default。</strong>
        </p>

        {/* 预设按钮 */}
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPicks(PRESETS.classic)}
            className="btn-stamp bg-butter text-ink"
          >
            <Sparkle className="w-4 h-4" strokeWidth={2.4} />
            经典流（推荐）
          </button>
          <button
            type="button"
            onClick={() => setPicks(PRESETS.conservative)}
            className="btn-stamp bg-white text-ink"
          >
            保守流
          </button>
          <button
            type="button"
            onClick={() => setPicks(PRESETS.yolo)}
            className="btn-stamp bg-white text-ink"
          >
            激进流
          </button>
        </div>

        {/* 时间线总览 */}
        <div className="mt-7 card-stamp p-5 lg:p-6 bg-white overflow-x-auto">
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
            换挡时间线
          </div>
          <div className="flex items-stretch gap-2 min-w-[640px]">
            {picks.map((m, i) => {
              const meta = MODE_META[m];
              return (
                <React.Fragment key={i}>
                  <div className="flex-1 min-w-[100px]">
                    <div
                      className="rounded-xl border-2 border-ink p-3 text-center shadow-stamp transition-all duration-300 ease-spring"
                      style={{
                        backgroundColor: meta.color,
                        color: meta.textOn,
                      }}
                    >
                      <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase opacity-75">
                        阶段 0{i + 1}
                      </div>
                      <div className="font-display font-extrabold text-[16px] mt-0.5 leading-tight">
                        {meta.label}
                      </div>
                    </div>
                  </div>
                  {i < picks.length - 1 && (
                    <div className="flex items-center text-ink/45 font-mono text-[14px] pt-3">
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* 命中率提示 */}
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10.5px] tracking-[0.18em] uppercase">
            <span className="text-ink/55">和推荐档对齐</span>
            <span className="px-2 py-0.5 rounded-full border-2 border-ink bg-ink text-cream">
              {goodCount} / {PHASES.length}
            </span>
            {goodCount === PHASES.length && (
              <span className="px-2 py-0.5 rounded-full border-2 border-ink bg-butter text-ink">
                · 完美换挡
              </span>
            )}
          </div>
        </div>

        {/* 阶段卡：每个阶段选档 */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PHASES.map((p, i) => {
            const picked = picks[i];
            const rec = p.recommend;
            return (
              <div key={p.key} className="card-stamp p-5 bg-cream">
                <div className="font-display font-extrabold text-[16.5px] text-ink leading-tight">
                  {p.label}
                </div>
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mt-1">
                  {p.hint}
                </div>

                {/* 档位选择 */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {(["plan", "default", "auto"] as Mode[]).map((m) => {
                    const on = picked === m;
                    const isRec = m === rec;
                    const meta = MODE_META[m];
                    return (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setAt(i, m)}
                        className={`relative px-2 py-2 rounded-lg border-2 border-ink font-mono text-[10.5px] tracking-[0.14em] uppercase font-bold transition-all duration-200 ease-spring ${
                          on
                            ? "shadow-stamp translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white text-ink hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp"
                        }`}
                        style={
                          on
                            ? {
                                backgroundColor: meta.color,
                                color: meta.textOn,
                              }
                            : undefined
                        }
                        aria-label={m}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {meta.icon}
                          <span>{meta.label}</span>
                        </div>
                        {isRec && (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-ink text-cream font-mono text-[8.5px] tracking-[0.12em] border-2 border-cream">
                            荐
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 说明 */}
                <p
                  key={`note-${picked}`}
                  className={`mt-4 font-sans text-[13px] leading-[1.6] animate-enter-fade ${
                    picked === rec ? "text-ink/80" : "text-coral"
                  }`}
                >
                  {p.why[picked]}
                </p>
              </div>
            );
          })}
        </div>

        {/* 实用建议 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card-stamp p-6 bg-white">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-3">
              五条实用建议
            </div>
            <ol className="space-y-2.5 font-sans text-[14.5px] leading-[1.6] text-ink/85 list-decimal pl-5">
              <li>新手起步先 Default，感受 Agent 的行为习惯再放权。</li>
              <li>对生产代码做大改前，让 Agent 先出 Plan。</li>
              <li>长任务用 Auto，但放在沙箱 / Docker / 实验分支里跑。</li>
              <li>会话中途遇到不确定操作，立刻退回保守档。</li>
              <li>花十分钟配权限规则：安全命令 allow，危险命令 deny。</li>
            </ol>
          </div>
          <div className="rounded-3xl border-2 border-ink bg-ink text-cream p-6 shadow-stamp-lg">
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-cream/65 mb-3">
              硬规则 · 不能妥协
            </div>
            <p className="font-display font-extrabold text-[20px] leading-[1.3]">
              主分支 / .env / 没看过 diff 的目录 ——
              <span className="text-butter"> 永远不要交给 Auto</span>
              。哪怕你赶时间。
            </p>
            <p className="font-sans text-[13.5px] leading-[1.65] text-cream/70 mt-3">
              分类器只是兜底，不是保险。你的 git 历史和密钥才是最后一道防线。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWorkflow;
