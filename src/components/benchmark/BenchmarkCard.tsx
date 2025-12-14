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

const typeColorMap: Record<string, { gradient: string; light: string }> = {
  语言: {
    gradient: "from-blue-500 to-cyan-500",
    light: "from-blue-50 to-cyan-50",
  },
  推理: {
    gradient: "from-purple-500 to-pink-500",
    light: "from-purple-50 to-pink-50",
  },
  数学: {
    gradient: "from-green-500 to-emerald-500",
    light: "from-green-50 to-emerald-50",
  },
  代码: {
    gradient: "from-yellow-500 to-orange-500",
    light: "from-yellow-50 to-orange-50",
  },
  安全性: {
    gradient: "from-red-500 to-rose-500",
    light: "from-red-50 to-rose-50",
  },
  多模态: {
    gradient: "from-pink-500 to-purple-500",
    light: "from-pink-50 to-purple-50",
  },
  知识: {
    gradient: "from-indigo-500 to-blue-500",
    light: "from-indigo-50 to-blue-50",
  },
  智能体: {
    gradient: "from-orange-500 to-red-500",
    light: "from-orange-50 to-red-50",
  },
  工具调用: {
    gradient: "from-amber-500 to-yellow-500",
    light: "from-amber-50 to-yellow-50",
  },
  信息检索: {
    gradient: "from-cyan-500 to-teal-500",
    light: "from-cyan-50 to-teal-50",
  },
  RAG: {
    gradient: "from-teal-500 to-green-500",
    light: "from-teal-50 to-green-50",
  },
  专业领域: {
    gradient: "from-emerald-500 to-teal-500",
    light: "from-emerald-50 to-teal-50",
  },
  多语言: {
    gradient: "from-violet-500 to-purple-500",
    light: "from-violet-50 to-purple-50",
  },
  对话: {
    gradient: "from-rose-500 to-pink-500",
    light: "from-rose-50 to-pink-50",
  },
  聊天机器人: {
    gradient: "from-fuchsia-500 to-purple-500",
    light: "from-fuchsia-50 to-purple-50",
  },
  指令遵循: {
    gradient: "from-lime-500 to-green-500",
    light: "from-lime-50 to-green-50",
  },
  摘要: {
    gradient: "from-sky-500 to-blue-500",
    light: "from-sky-50 to-blue-50",
  },
  偏见: {
    gradient: "from-red-500 to-orange-500",
    light: "from-red-50 to-orange-50",
  },
  道德准测: {
    gradient: "from-slate-500 to-gray-500",
    light: "from-slate-50 to-gray-50",
  },
  情绪: {
    gradient: "from-pink-500 to-rose-500",
    light: "from-pink-50 to-rose-50",
  },
  决策过程: {
    gradient: "from-indigo-500 to-violet-500",
    light: "from-indigo-50 to-violet-50",
  },
  视频生成: {
    gradient: "from-rose-500 to-red-500",
    light: "from-rose-50 to-red-50",
  },
  图像生成: {
    gradient: "from-fuchsia-500 to-pink-500",
    light: "from-fuchsia-50 to-pink-50",
  },
  LLM评估: {
    gradient: "from-sky-500 to-indigo-500",
    light: "from-sky-50 to-indigo-50",
  },
  "LLM 生成文本检测": {
    gradient: "from-amber-500 to-orange-500",
    light: "from-amber-50 to-orange-50",
  },
};

const defaultColors = {
  gradient: "from-gray-500 to-slate-500",
  light: "from-gray-50 to-slate-50",
};

const getTypeColors = (type: string) => {
  return typeColorMap[type] || defaultColors;
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

  const colors = getTypeColors(primaryType);

  return (
    <div
      className={`group relative rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full bg-gradient-to-br ${colors.light}`}
    >
      {/* 顶部渐变装饰条 */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${colors.gradient}`} />

      <div className="p-6 flex flex-col flex-grow backdrop-blur-sm">
        {/* 头部：标题 */}
        <div className="mb-3">
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent group-hover:opacity-80 transition-opacity line-clamp-1 tracking-tight`}
          >
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

        {/* 标签行 - 玻璃态样式 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {benchmark.type.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-gray-600 bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm hover:bg-white/80 transition-all"
            >
              #{tag}
            </span>
          ))}
          {benchmark.type.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-gray-400 bg-white/40 backdrop-blur-sm border border-white/30">
              +{benchmark.type.length - 4}
            </span>
          )}
        </div>

        {/* 描述 - 最多两行，悬浮显示全部 */}
        <div className="relative group/desc mb-4 flex-grow">
          <p className="text-gray-500 text-sm leading-7 line-clamp-2 font-normal cursor-help">
            {benchmark.description}
          </p>
          {/* 悬浮提示框 - 向上显示避免被遮挡 */}
          <div className="absolute left-0 right-0 bottom-full mb-2 p-4 bg-gray-900 text-white text-sm leading-relaxed rounded-xl shadow-2xl opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-300 z-50 max-h-48 overflow-y-auto">
            {benchmark.description}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-gray-900 rotate-45"></div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-center gap-6 py-3 mt-auto border-t border-white/40 bg-white/30 backdrop-blur-sm -mx-6 -mb-6 rounded-b-2xl">
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
