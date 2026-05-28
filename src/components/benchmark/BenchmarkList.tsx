/**
 * 基准测试列表 · Mailchimp-Freddie 风
 *
 * 支持两种渲染模式：
 *   - 不分组：直接平铺卡片网格
 *   - 分组：分组标题 + 计数 chip + ink 横线 + 卡片网格（参考 ModelList）
 *
 * Loading / Error / Empty 全部 stamp 风
 */

import React from "react";
import { Benchmark } from "../../types/benchmark";
import { BenchmarkCard } from "./BenchmarkCard";
import { Database, AlertCircle } from "lucide-react";

interface BenchmarkListProps {
  /**
   * 当 groups 提供时，使用分组渲染；否则使用 benchmarks 平铺。
   * 必须是 Map（不能是 plain object），否则数字字符串 key
   * 会被 V8 自动按数字升序，导致 year 分组顺序失效。
   */
  benchmarks: Benchmark[];
  groups?: Map<string, Benchmark[]>;
  loading: boolean;
  error: string | null;
}

export const BenchmarkList: React.FC<BenchmarkListProps> = ({
  benchmarks,
  groups,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
        </div>
        <p className="font-display font-extrabold text-[20px] text-ink mb-1">
          正在加载基准测试
        </p>
        <p className="font-sans text-[13px] text-ink-secondary">稍候片刻…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border-2 border-ink rounded-3xl shadow-stamp">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-coral border-2 border-ink rounded-full">
          <AlertCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-extrabold text-display-lg text-ink mb-2">
          加载失败
        </h3>
        <p className="font-sans text-ink-secondary max-w-md text-center mb-6">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-cream font-sans font-bold text-[14px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:6px_6px_0_0_#241C15]"
        >
          重新加载
        </button>
      </div>
    );
  }

  const isGrouped = !!groups;
  /* Map.entries() 按插入顺序遍历，正是我们排好的顺序（数字 key 不会被自动升序） */
  const groupEntries = groups ? Array.from(groups.entries()) : [];
  const isEmpty = isGrouped
    ? groupEntries.length === 0
    : benchmarks.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border-2 border-dashed border-ink/25 rounded-3xl">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-cream border-2 border-ink rounded-full">
          <Database className="w-7 h-7 text-ink/65" strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-extrabold text-display-lg text-ink mb-2">
          未找到相关基准测试
        </h3>
        <p className="font-sans text-ink-secondary text-center max-w-sm">
          尝试调整筛选条件或更换关键词
        </p>
      </div>
    );
  }

  if (isGrouped) {
    return (
      <div className="space-y-12">
        {groupEntries.map(([groupName, groupItems]) => (
          <div key={groupName}>
            {/* 分组 heading —— 与 ModelList 风格一致 */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="font-display font-extrabold text-[26px] lg:text-[30px] text-ink leading-none">
                  {groupName}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 bg-butter border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink">
                  {groupItems.length}
                </span>
              </div>
              <div className="h-[3px] w-16 bg-ink rounded-full" />
            </div>

            {/* 该组卡片网格 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {groupItems.map((benchmark, index) => (
                <BenchmarkCard
                  key={`${benchmark.name}-${index}`}
                  benchmark={benchmark}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* 不分组：平铺 */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {benchmarks.map((benchmark, index) => (
        <BenchmarkCard
          key={`${benchmark.name}-${index}`}
          benchmark={benchmark}
        />
      ))}
    </div>
  );
};

export default BenchmarkList;
