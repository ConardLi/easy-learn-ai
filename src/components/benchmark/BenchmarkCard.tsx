/**
 * 基准测试卡片 · Mailchimp-Freddie 风
 *
 * 改造说明：
 * - 删除原 25+ 种类型彩虹渐变映射，缩成 5 色主题循环（按类型哈希取色）
 * - 删除所有 backdrop-blur / glass effect
 * - stamp 风：白底 + ink 2px 边 + offset 阴影
 * - 信息层级：顶 strip → 名称 → 元数据行 → 类型 chips → 描述 → 底部链接
 */

import React from "react";
import {
  Github,
  Database,
  FileText,
  Hash,
  Scale,
  Calendar,
} from "lucide-react";
import { Benchmark } from "../../types/benchmark";

interface BenchmarkCardProps {
  benchmark: Benchmark;
}

/** 按类型哈希分配品牌色 strip */
const typeAccent = (type: string): string => {
  const palette = [
    "bg-butter",
    "bg-coral",
    "bg-teal",
    "bg-pop",
    "bg-butter-deep",
  ];
  let hash = 0;
  for (let i = 0; i < type.length; i++) {
    hash = (hash * 31 + type.charCodeAt(i)) % 1000;
  }
  return palette[hash % palette.length];
};

const formatNumber = (num: number | string): string => {
  if (num === "n/a") return "—";
  if (typeof num === "string") return num;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const isValidUrl = (url: string): boolean => {
  return (
    !!url &&
    url !== "n/a" &&
    url !== "see repo" &&
    url !== "see dataset page" &&
    url.startsWith("http")
  );
};

export const BenchmarkCard: React.FC<BenchmarkCardProps> = ({ benchmark }) => {
  const primaryType = benchmark.type[0] || "other";
  const accent = typeAccent(primaryType);

  const hasPaper = isValidUrl(benchmark.benchmarkPaper);
  const hasCode = isValidUrl(benchmark.codeRepository);
  const hasDataset = isValidUrl(benchmark.dataset);
  const hasAnyLink = hasPaper || hasCode || hasDataset;

  return (
    <article className="group flex flex-col bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden">
      {/* 顶 strip —— 主类型色 */}
      <div className={`h-2 ${accent} border-b-2 border-ink`} aria-hidden />

      <div className="p-5 flex flex-col flex-1">
        {/* 名称 */}
        <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight mb-3 line-clamp-1 group-hover:text-ink/85 transition-colors">
          {benchmark.name}
        </h3>

        {/* 元数据行：样本 / 协议 / 年份 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 font-sans text-[12px] text-ink-secondary">
          <span className="inline-flex items-center gap-1.5" title="样本数量">
            <Hash className="w-3.5 h-3.5 text-ink/55" strokeWidth={2.5} />
            <span className="font-bold text-ink">
              {benchmark.numberOfExamples &&
              benchmark.numberOfExamples !== "n/a"
                ? formatNumber(benchmark.numberOfExamples)
                : "—"}
            </span>
            <span className="text-ink-tertiary">样本</span>
          </span>

          <span className="inline-flex items-center gap-1.5" title="许可证">
            <Scale className="w-3.5 h-3.5 text-ink/55" strokeWidth={2.5} />
            <span className="font-semibold text-ink max-w-[120px] truncate">
              {benchmark.license && benchmark.license !== "see dataset page"
                ? benchmark.license
                : "Unknown"}
            </span>
          </span>

          {benchmark.year && benchmark.year !== "n/a" && (
            <span
              className="inline-flex items-center gap-1.5"
              title="发布年份"
            >
              <Calendar
                className="w-3.5 h-3.5 text-ink/55"
                strokeWidth={2.5}
              />
              <span className="font-semibold text-ink">{benchmark.year}</span>
            </span>
          )}
        </div>

        {/* 类型 chips —— cream + ink 边 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {benchmark.type.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
            >
              #{tag}
            </span>
          ))}
          {benchmark.type.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 bg-white border border-ink/10 rounded-md font-mono text-[11px] text-ink-tertiary">
              +{benchmark.type.length - 4}
            </span>
          )}
        </div>

        {/* 描述 */}
        <p className="font-sans text-[13px] text-ink-secondary leading-[1.7] line-clamp-3 flex-1 mb-4">
          {benchmark.description}
        </p>

        {/* 底部链接行 —— 仅在有链接时显示，cream 浅底 ink 顶边 */}
        {hasAnyLink && (
          <div className="flex items-center gap-1 -mx-5 -mb-5 px-5 py-3 bg-cream border-t-2 border-ink/15">
            {hasPaper && (
              <LinkBtn
                href={benchmark.benchmarkPaper}
                icon={<FileText className="w-3.5 h-3.5" strokeWidth={2.5} />}
                label="论文"
              />
            )}
            {hasCode && (
              <LinkBtn
                href={benchmark.codeRepository}
                icon={<Github className="w-3.5 h-3.5" strokeWidth={2.5} />}
                label="代码"
              />
            )}
            {hasDataset && (
              <LinkBtn
                href={benchmark.dataset}
                icon={<Database className="w-3.5 h-3.5" strokeWidth={2.5} />}
                label="数据集"
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
};

/** 底部链接小按钮 */
const LinkBtn: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans font-semibold text-[12px] text-ink-secondary hover:text-ink hover:bg-white transition-colors"
  >
    {icon}
    {label}
  </a>
);
