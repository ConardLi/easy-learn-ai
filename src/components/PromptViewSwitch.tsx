/**
 * PromptViewSwitch —— 提示词模块的视图切换器
 *
 * 放在两个页面的 Hero 明显区域：
 *   - /ai-prompts            提示词目录（拆原文 / 翻译 / 分析）
 *   - /ai-prompts/methodology 设计方法论（12 条法则）
 *
 * 设计目标：让“这是一个可切换的两档开关”一眼可见——
 *   外层带“切换视图”标签 + 双段同时可见、各有底色，
 *   当前段填充 ink 并标注「当前」，另一段呈 cream 可点击态。
 */

import React from "react";
import { Link } from "react-router-dom";
import { Layers, Compass } from "lucide-react";

export type PromptView = "catalog" | "methodology";

const options: {
  key: PromptView;
  to: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "catalog",
    to: "/ai-prompts",
    label: "顶级 Agent 提示词学习",
    hint: "拆解真实样本",
    icon: <Layers className="w-[18px] h-[18px]" strokeWidth={2.5} />,
  },
  {
    key: "methodology",
    to: "/ai-prompts/methodology",
    label: "提示词设计最佳实践",
    hint: "12 条核心法则",
    icon: <Compass className="w-[18px] h-[18px]" strokeWidth={2.5} />,
  },
];

const PromptViewSwitch: React.FC<{ active: PromptView; className?: string }> = ({
  active,
  className = "",
}) => {
  return (
    <div className={`inline-block ${className}`}>
      <div className="flex items-center gap-2 mb-2 pl-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55">
          切换视图
        </span>
        <span className="font-sans text-[11px] text-ink/40">
          Catalog ⇆ Methodology
        </span>
      </div>

      <div
        className="inline-flex items-stretch gap-1.5 p-1.5 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg"
        role="tablist"
        aria-label="提示词视图切换"
      >
        {options.map((option) => {
          const isActive = option.key === active;
          return (
            <Link
              key={option.key}
              to={option.to}
              role="tab"
              aria-selected={isActive}
              className={`group relative inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl font-sans transition-all duration-250 ease-spring ${
                isActive
                  ? "bg-ink text-white shadow-stamp"
                  : "bg-cream text-ink border border-ink/12 hover:bg-butter hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15]"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${
                  isActive
                    ? "bg-white/15 border-white/25 text-white"
                    : "bg-white border-ink/15 text-ink"
                }`}
              >
                {option.icon}
              </span>
              <span className="text-left leading-tight">
                <span className="flex items-center gap-1.5 font-extrabold text-[14px]">
                  {option.label}
                  {isActive && (
                    <span className="inline-flex items-center px-1.5 py-px rounded-full bg-butter text-ink font-sans font-bold text-[9px] uppercase tracking-wide">
                      当前
                    </span>
                  )}
                </span>
                <span
                  className={`block text-[11px] font-medium ${
                    isActive ? "text-white/60" : "text-ink/50"
                  }`}
                >
                  {option.hint}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PromptViewSwitch;
