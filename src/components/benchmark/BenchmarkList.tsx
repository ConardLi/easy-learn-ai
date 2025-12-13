/**
 * 基准测试列表组件
 * 展示基准测试卡片网格
 */

import React from "react";
import { Benchmark } from "../../types/benchmark";
import { BenchmarkCard } from "./BenchmarkCard";
import { Database, AlertCircle, Loader2 } from "lucide-react";

interface BenchmarkListProps {
  benchmarks: Benchmark[];
  loading: boolean;
  error: string | null;
}

export const BenchmarkList: React.FC<BenchmarkListProps> = ({
  benchmarks,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-purple-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-600 animate-pulse">
          正在加载基准测试数据...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="bg-red-50 p-6 rounded-full mb-6 ring-8 ring-red-50/50">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">加载失败</h3>
        <p className="text-gray-500 max-w-md text-center mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          重新加载
        </button>
      </div>
    );
  }

  if (benchmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-2xl border border-dashed border-gray-200">
        <div className="bg-gray-50 p-6 rounded-full mb-4 ring-8 ring-gray-50/50">
          <Database className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          未找到相关基准测试
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          尝试调整筛选条件或使用不同的关键词搜索
        </p>
      </div>
    );
  }

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
