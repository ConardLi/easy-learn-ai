/**
 * 基准测试卡片组件
 *
 * 重构说明：
 * 1. 移除重视觉的数据块，改为行内布局
 * 2. 弱化/移除图标，强化标题
 * 3. 标签样式轻量化
 * 4. 增加留白，优化视觉呼吸感
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

const typeColorMap: Record<string, string> = {
  language: "from-blue-500 to-cyan-500",
  reasoning: "from-purple-500 to-pink-500",
  math: "from-green-500 to-emerald-500",
  coding: "from-yellow-500 to-orange-500",
  safety: "from-red-500 to-rose-500",
  multimodal: "from-pink-500 to-purple-500",
  knowledge: "from-indigo-500 to-blue-500",
  agents: "from-orange-500 to-red-500",
  "tools use": "from-amber-500 to-yellow-500",
  "information retrieval": "from-cyan-500 to-teal-500",
  RAG: "from-teal-500 to-green-500",
  "domain-specific": "from-emerald-500 to-teal-500",
  multilingual: "from-violet-500 to-purple-500",
  conversation: "from-rose-500 to-pink-500",
  chatbots: "from-fuchsia-500 to-purple-500",
  "instruction-following": "from-lime-500 to-green-500",
  summarization: "from-sky-500 to-blue-500",
  bias: "from-red-500 to-orange-500",
  ethics: "from-slate-500 to-gray-500",
  empathy: "from-pink-500 to-rose-500",
  "decision-making": "from-indigo-500 to-violet-500",
};

const getTypeGradient = (type: string): string => {
  return typeColorMap[type] || "from-gray-500 to-slate-500";
};

const formatNumber = (num: number | string): string => {
  if (num === "n/a") return "-";
  if (typeof num === "string") return num;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const BenchmarkCard: React.FC<BenchmarkCardProps> = ({ benchmark }) => {
  const isValidUrl = (url: string) => {
    return (
      url &&
      url !== "n/a" &&
      url !== "see repo" &&
      url !== "see dataset page" &&
      url.startsWith("http")
    );
  };

  const primaryType = benchmark.type[0] || "other";

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* 左侧彩色竖条 */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getTypeGradient(
          primaryType
        )}`}
      />

      <div className="p-6 pl-7 flex flex-col flex-grow">
        {/* 头部：标题 */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 tracking-tight">
            {benchmark.name}
          </h3>
        </div>

        {/* 数据统计行：样本 | 协议 | 年份 */}
        <div className="flex items-center flex-wrap gap-y-2 gap-x-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5" title="样本数量">
            <Hash className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-700">
              {benchmark.numberOfExamples &&
              benchmark.numberOfExamples !== "n/a"
                ? formatNumber(benchmark.numberOfExamples)
                : "-"}
            </span>
            <span className="text-xs text-gray-400 font-normal">样本</span>
          </div>

          <span className="text-gray-300">|</span>

          <div className="flex items-center gap-1.5" title="许可证">
            <Scale className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-gray-700 max-w-[120px] truncate">
              {benchmark.license && benchmark.license !== "see dataset page"
                ? benchmark.license
                : "Unknown"}
            </span>
          </div>

          {benchmark.year && benchmark.year !== "n/a" && (
            <>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1.5" title="发布年份">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-medium text-gray-600">
                  {benchmark.year}
                </span>
              </div>
            </>
          )}
        </div>

        {/* 标签行 - 样式轻量化 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {benchmark.type.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {benchmark.type.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200">
              +{benchmark.type.length - 4}
            </span>
          )}
        </div>

        {/* 描述 - 增加行高，颜色变浅 */}
        <p className="text-gray-500 text-sm leading-7 line-clamp-3 mb-4 flex-grow font-normal">
          {benchmark.description}
        </p>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-center gap-6 py-3 mt-auto border-t border-gray-100 bg-gray-50/30 -ml-7 -mr-6 -mb-6">
          {isValidUrl(benchmark.benchmarkPaper) && (
            <a
              href={benchmark.benchmarkPaper}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white"
              title="查看论文"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">论文</span>
            </a>
          )}
          {isValidUrl(benchmark.codeRepository) && (
            <a
              href={benchmark.codeRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-white"
              title="查看代码"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">代码</span>
            </a>
          )}
          {isValidUrl(benchmark.dataset) && (
            <a
              href={benchmark.dataset}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-purple-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white"
              title="查看数据集"
            >
              <Database className="w-4 h-4" />
              <span className="text-sm font-medium">数据集</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
