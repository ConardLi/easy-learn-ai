/**
 * Section 03 · ThreeModes
 *
 * 主交互（L2 pill）：三档定位 + 权限矩阵高亮
 *   - 点 Plan/Default/Auto 任一 → 左侧大卡换底色 + 一句话定位
 *   - 右侧矩阵：四行（读文件 / 写文件 / 跑命令 / 网络请求），当前选中列高亮
 *
 * 视觉跟前一节 slider 区分：这里是三档块，矩阵用厚边框表格。
 */
import React, { useState } from "react";
import { Eye, ClipboardCheck, Zap } from "lucide-react";

type ModeKey = "plan" | "default" | "auto";

type ModeDef = {
  key: ModeKey;
  label: string;
  en: string;
  icon: React.ReactNode;
  color: string;
  textOn: string;
  oneLine: string;
  goodFor: string;
};

const MODES: ModeDef[] = [
  {
    key: "plan",
    label: "Plan",
    en: "READ-ONLY",
    icon: <Eye className="w-4 h-4" strokeWidth={2.4} />,
    color: "#F4D35E",
    textOn: "#241C15",
    oneLine: "只读分析，出方案。Agent 不动文件，只给一份 Markdown 计划。",
    goodFor: "复杂重构 · 不熟的代码库 · 多人协作",
  },
  {
    key: "default",
    label: "Default",
    en: "STEP REVIEW",
    icon: <ClipboardCheck className="w-4 h-4" strokeWidth={2.4} />,
    color: "#E07A5F",
    textOn: "#FBEFE3",
    oneLine: "Agent 边干边问。每个写操作弹审批，你看 diff 点确认。",
    goodFor: "日常开发 · bug 修复 · 主分支干活",
  },
  {
    key: "auto",
    label: "Auto",
    en: "AUTO + GUARD",
    icon: <Zap className="w-4 h-4" strokeWidth={2.4} />,
    color: "#1B4B5A",
    textOn: "#FBEFE3",
    oneLine: "Agent 自己一路改文件、跑命令；危险操作会被拦下来问你；干完你看结果。",
    goodFor: "长任务 · 批量改 · 隔离环境 / 实验分支",
  },
];

type Row = {
  label: string;
  plan: "✓" | "?" | "✕";
  def: "✓" | "?" | "✕";
  auto: "✓" | "?" | "✕";
  note: string;
};

const ROWS: Row[] = [
  {
    label: "读文件 · 列目录",
    plan: "✓",
    def: "✓",
    auto: "✓",
    note: "读操作三档都放行 —— Agent 总得能看到代码。",
  },
  {
    label: "写 · 改文件 · patch",
    plan: "✕",
    def: "?",
    auto: "✓",
    note: "Plan 直接拒；Default 弹 diff 给你点；Auto 自动写。",
  },
  {
    label: "执行 shell 命令",
    plan: "✕",
    def: "?",
    auto: "✓",
    note: "rm / git push 这类危险命令，Auto 也会被分类器抓出来弹审批。",
  },
  {
    label: "发网络请求",
    plan: "✕",
    def: "?",
    auto: "?",
    note: "Codex CLI 的 Auto 模式默认网络请求仍需审批，怕外泄。",
  },
];

const cellStyle = (sym: "✓" | "?" | "✕") =>
  sym === "✓"
    ? "bg-butter text-ink"
    : sym === "?"
    ? "bg-coral text-white"
    : "bg-ink text-cream";

const cellText = (sym: "✓" | "?" | "✕") =>
  sym === "✓" ? "自由" : sym === "?" ? "需批准" : "禁止";

const SectionThreeModes: React.FC = () => {
  const [active, setActive] = useState<ModeKey>("default");
  const cur = MODES.find((m) => m.key === active)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Overview · 三档速览</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          三档的差别，
          <br />
          全在「能不能动」这件事上。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          点切换看每一档具体放开了什么、卡住了什么。读永远不卡，真正会卡你的是写文件和跑命令。
        </p>

        {/* 命名提醒：Auto 在不同 Agent 里指的不是同一档 */}
        <div className="mt-6 inline-flex items-start gap-3 px-4 py-3 bg-coral/15 border-2 border-dashed border-coral rounded-2xl max-w-[760px]">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold bg-coral text-white px-2 py-1 rounded-full flex-shrink-0">
            注意
          </span>
          <p className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            下面说的 <strong>Auto</strong> 默认指 Claude Code；Codex CLI 里叫 Auto 的那档，其实是「每步问你」。
            各家命名见 §07 对照表。
          </p>
        </div>

        {/* pill 切换 */}
        <div className="mt-9 flex flex-wrap gap-3">
          {MODES.map((m) => {
            const on = active === m.key;
            return (
              <button
                type="button"
                key={m.key}
                onClick={() => setActive(m.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] tracking-[0.16em] uppercase transition-all duration-250 ease-spring ${
                  on
                    ? "shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
                style={
                  on
                    ? { backgroundColor: m.color, color: m.textOn }
                    : undefined
                }
              >
                {m.icon}
                <span>{m.label}</span>
                <span className={on ? "opacity-65" : "opacity-50"}>
                  · {m.en}
                </span>
              </button>
            );
          })}
        </div>

        <div
          key={active}
          className="mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-enter-up"
        >
          {/* 左：当前档大卡 */}
          <div className="lg:col-span-5">
            <div
              className="border-2 border-ink rounded-3xl shadow-stamp-lg p-7"
              style={{ backgroundColor: cur.color, color: cur.textOn }}
            >
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase mb-2 opacity-75">
                这一档怎么定义
              </div>
              <div className="font-display font-extrabold text-[32px] leading-[1.1] mb-3">
                {cur.label} 模式
              </div>
              <p className="font-sans text-[15.5px] leading-[1.65] opacity-95 mb-5">
                {cur.oneLine}
              </p>
              <div className="border-t-2 pt-4" style={{ borderColor: `${cur.textOn}33` }}>
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase opacity-80 mb-2">
                  适合谁
                </div>
                <p className="font-sans text-[14.5px] leading-[1.65] opacity-95">
                  {cur.goodFor}
                </p>
              </div>
            </div>
          </div>

          {/* 右：权限矩阵 · 当前列高亮 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 lg:p-6 bg-white overflow-x-auto">
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-4">
                权限矩阵 · 当前档亮起
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-mono text-[11px] tracking-[0.18em] uppercase text-ink/55 pb-3 pr-3 align-bottom">
                      操作类别
                    </th>
                    {MODES.map((m) => {
                      const on = m.key === active;
                      return (
                        <th
                          key={m.key}
                          className={`text-center pb-3 px-2 align-bottom transition-all duration-200 ${
                            on ? "" : "opacity-40"
                          }`}
                        >
                          <div
                            className={`inline-block font-mono text-[10.5px] tracking-[0.18em] uppercase font-bold ${
                              on ? "text-ink" : "text-ink/55"
                            }`}
                          >
                            {m.label}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.label} className="border-t-2 border-ink/15">
                      <td className="py-3 pr-3 font-sans text-[14px] font-semibold text-ink w-[44%]">
                        {r.label}
                      </td>
                      {(["plan", "def", "auto"] as const).map((col, i) => {
                        const sym = r[col];
                        const modeKey =
                          col === "plan" ? "plan" : col === "def" ? "default" : "auto";
                        const on = modeKey === active;
                        return (
                          <td
                            key={i}
                            className={`py-3 px-2 transition-all duration-200 ${
                              on ? "" : "opacity-35"
                            }`}
                          >
                            <div
                              className={`mx-auto inline-flex flex-col items-center gap-1 px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold ${cellStyle(
                                sym
                              )} ${on ? "shadow-stamp" : ""}`}
                            >
                              <span>{cellText(sym)}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 当前档解释 */}
              <div
                key={`note-${active}`}
                className="mt-5 p-4 rounded-2xl border-2 border-dashed border-ink/35 bg-cream animate-enter-fade"
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 mb-1">
                  从这一列读出来
                </div>
                <p className="font-sans text-[13.5px] leading-[1.65] text-ink/85">
                  {/* 简单四行 mini-summary，按当前 active 拼一段 */}
                  {ROWS.filter((r) =>
                    active === "plan"
                      ? r.plan !== "✓"
                      : active === "default"
                      ? r.def !== "✓"
                      : r.auto !== "✓",
                  )
                    .map((r) => {
                      const sym =
                        active === "plan"
                          ? r.plan
                          : active === "default"
                          ? r.def
                          : r.auto;
                      return `${r.label} ${cellText(sym)}`;
                    })
                    .join(" · ") || "全部放行 —— 读写跑命令都自由。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThreeModes;
