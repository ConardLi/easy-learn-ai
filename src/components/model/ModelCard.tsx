/**
 * 模型卡片组件
 * 简化展示模型信息，点击查看详情
 */

import React, { useState } from "react";
import {
  Calendar,
  Lock,
  Unlock,
  Tag,
  Layers,
  ChevronRight,
} from "lucide-react";
import { AIModel } from "../../types/model";
import { ModelDetailModal } from "./ModelDetailModal";

interface ModelCardProps {
  model: AIModel;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getCompanyColor = (company: string) => {
    const colors: Record<string, string> = {
      Anthropic: "from-orange-500 to-red-500",
      OpenAI: "from-green-500 to-emerald-500",
      DeepSeek: "from-blue-500 to-cyan-500",
      "Moonshot AI": "from-purple-500 to-pink-500",
    };
    return colors[company] || "from-gray-500 to-slate-500";
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* 顶部公司标签栏 */}
        <div
          className={`h-1.5 bg-gradient-to-r ${getCompanyColor(model.company)}`}
        />

        <div className="p-5">
          {/* 头部：公司图标 + 模型名称 */}
          <div className="flex items-start gap-4 mb-4">
            {/* 公司图标 */}
            <div className="flex-shrink-0">
              <img
                src={`/imgs/${model.company}.png`}
                alt={model.company}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* 模型名称和基本信息 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors truncate">
                {model.modelName}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(model.releaseDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {model.openSourceStatus === "开源" ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600 font-medium">开源</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">闭源</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 父模型标识 */}
          {/* {model.parent && (
            <div className="mb-3 flex items-center gap-1.5 text-xs bg-purple-50 border border-purple-100 rounded-lg px-2.5 py-1.5 w-fit">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-gray-600">
                基于{" "}
                <span className="font-medium text-purple-600">
                  {model.parent}
                </span>
              </span>
            </div>
          )} */}

          {/* 核心参数 */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2.5 border border-blue-100">
              <div className="text-xs text-blue-600 font-medium mb-0.5">
                上下文
              </div>
              <div className="text-base font-bold text-blue-700">
                {model.contextWindow > 0 ? `${model.contextWindow}K` : "N/A"}
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2.5 border border-purple-100">
              <div className="text-xs text-purple-600 font-medium mb-0.5">
                输出
              </div>
              <div className="text-base font-bold text-purple-700">
                {model.maxGenerationTokenLength > 0
                  ? `${model.maxGenerationTokenLength}K`
                  : "N/A"}
              </div>
            </div>
          </div>

          {/* 模型标签（最多显示3个） */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {model.modelTags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded text-xs font-medium border border-blue-100"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {model.modelTags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                +{model.modelTags.length - 3}
              </span>
            )}
          </div>

          {/* 描述（简化显示） */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
            {model.description}
          </p>

          {/* 查看详情按钮 */}
          {/* <div className="flex items-center justify-end text-blue-600 text-sm font-medium group-hover:text-blue-700">
            <span>查看详情</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div> */}
        </div>
      </div>

      {/* 详情弹框 */}
      <ModelDetailModal
        model={model}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
