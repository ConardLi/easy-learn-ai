/**
 * Section 07 · 三家对照
 *
 * 主交互（L2 chip 切换 + 行高亮）：
 *   - 点 Claude Code / Codex CLI / OpenCode 任一
 *   - 表格对应行高亮 + 下方展开一行「实际命令 / 快捷键」
 *
 * 视觉：横向 5 列表格（Agent · Plan · Default · Auto · 特色），跟之前矩阵拉开 ——
 *      这里强调「映射」，三家不同叫法对到同一三档。
 */
import React, { useState } from "react";

type Row = {
  key: "claude" | "codex" | "opencode";
  agent: string;
  plan: string;
  def: string;
  auto: string;
  feat: string;
  cli: string;
};

const ROWS: Row[] = [
  {
    key: "claude",
    agent: "Claude Code",
    plan: "Plan（Shift+Tab）",
    def: "Default",
    auto: "Auto（AI 分类器）",
    feat: "分类器兜底 · 受保护路径 · 对话边界约束",
    cli: "Shift+Tab 切档 / Auto 连拦 3 次自动降级回 Default",
  },
  {
    key: "codex",
    agent: "Codex CLI",
    plan: "Read Only",
    def: "Auto（默认）",
    auto: "Full Access",
    feat: "沙箱隔离 · 配置文件管理",
    cli: "codex --mode read-only / auto / full-access",
  },
  {
    key: "opencode",
    agent: "OpenCode",
    plan: "Plan（禁用写工具）",
    def: "Build（默认）",
    auto: "全局 allow",
    feat: "按工具粒度配权限 · Markdown 自定义模式",
    cli: '配置示例：「git *」: allow, 「rm *」: deny / Tab 键切档',
  },
];

const SectionAgentMatrix: React.FC = () => {
  const [active, setActive] = useState<Row["key"]>("claude");
  const cur = ROWS.find((r) => r.key === active)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Mapping · 三家对照</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          叫法不同，
          <br />
          但映到的是{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">同一三档</span>
          </span>
          。
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[760px]">
          看清这张表，换 Agent 就不会再被命名搞迷糊。
          Claude Code 的「Auto」是「自动 + 分类器」，Codex CLI 的「Auto」其实是
          Default 的位置 —— 别被名字骗了。
        </p>

        {/* chip */}
        <div className="mt-9 flex flex-wrap gap-3">
          {ROWS.map((r) => {
            const on = active === r.key;
            return (
              <button
                type="button"
                key={r.key}
                onClick={() => setActive(r.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[12px] tracking-[0.14em] uppercase transition-all duration-250 ease-spring ${
                  on
                    ? "bg-ink text-cream shadow-stamp-lg translate-x-[-1px] translate-y-[-1px]"
                    : "bg-cream text-ink shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg"
                }`}
              >
                {r.agent}
              </button>
            );
          })}
        </div>

        {/* 表 */}
        <div className="mt-8 card-stamp bg-white overflow-x-auto">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-cream border-b-2 border-ink">
                {["Agent", "Plan 档", "Default 档", "Auto 档", "特色"].map(
                  (h, i) => (
                    <th
                      key={i}
                      className="text-left px-5 py-3 font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/70 font-bold"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => {
                const on = r.key === active;
                return (
                  <tr
                    key={r.key}
                    onClick={() => setActive(r.key)}
                    className={`cursor-pointer transition-all duration-200 border-b-2 border-ink/15 ${
                      on
                        ? "bg-butter"
                        : "bg-white hover:bg-butter/30"
                    }`}
                  >
                    <td className="px-5 py-4 font-display font-extrabold text-[16.5px] text-ink whitespace-nowrap">
                      {r.agent}
                    </td>
                    <td
                      className={`px-5 py-4 font-sans text-[14px] leading-[1.5] ${
                        on ? "text-ink" : "text-ink/75"
                      }`}
                    >
                      {r.plan}
                    </td>
                    <td
                      className={`px-5 py-4 font-sans text-[14px] leading-[1.5] ${
                        on ? "text-ink" : "text-ink/75"
                      }`}
                    >
                      {r.def}
                    </td>
                    <td
                      className={`px-5 py-4 font-sans text-[14px] leading-[1.5] ${
                        on ? "text-ink" : "text-ink/75"
                      }`}
                    >
                      {r.auto}
                    </td>
                    <td
                      className={`px-5 py-4 font-sans text-[13.5px] leading-[1.5] ${
                        on ? "text-ink" : "text-ink/65"
                      }`}
                    >
                      {r.feat}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 当前选中行的实际命令 */}
        <div
          key={active}
          className="mt-5 p-5 rounded-2xl border-2 border-dashed border-ink/35 bg-cream flex flex-col md:flex-row md:items-center md:gap-5 animate-enter-fade"
        >
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55 mb-1.5 md:mb-0 flex-shrink-0">
            {cur.agent} · 实操
          </div>
          <code className="font-mono text-[13.5px] leading-[1.55] text-ink/85 break-all">
            {cur.cli}
          </code>
        </div>
      </div>
    </section>
  );
};

export default SectionAgentMatrix;
